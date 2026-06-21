import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { StockApiService, TickerSuggestion } from '../../services/stock-api.service';
import { AssetType, Transaction } from '../../models/transaction.model';
import { detectAssetType, assetTypeLabel } from '../../models/asset-type.util';

@Component({
  selector: 'app-add-transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction-modal.html',
  styleUrls: ['./add-transaction-modal.scss'],
})
export class AddTransactionModalComponent implements OnInit, OnDestroy {
  @Input() transaction: Transaction | null = null;
  @Input() defaultAssetType: AssetType | null = null;
  @Output() close = new EventEmitter<void>();

  // Fecha o modal ao pressionar Esc.
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close.emit();
  }

  get isEdit(): boolean {
    return this.transaction !== null;
  }

  // Tipo de ativo travado quando definido pelo contexto: edição (tipo fixo) ou
  // adição a partir de uma seção (tipo pré-definido). Evita cair na área errada.
  get isAssetTypeLocked(): boolean {
    return this.isEdit || this.defaultAssetType !== null;
  }

  // Ticker inválido enquanto incompleto (<3), em busca, ou explicitamente não
  // encontrado pela cotação. Não exige o nome resolvido — assim um ticker válido
  // não fica bloqueado por cotação lenta/sem nome. Em edição o ticker é fixo.
  get isTickerInvalid(): boolean {
    if (this.isEdit) return false;
    if ((this.form.ticker || '').trim().length < 3) return true;
    return this.quoteLoading() || this.quoteNotFound();
  }

  // Mensagem em tempo real quando o ticker digitado não condiz com o tipo
  // selecionado. Usa a mesma heurística por sufixo do salvamento: tolera a
  // ambiguidade FII × ETF e ignora sufixos não reconhecidos (retorna '').
  get tickerTypeMismatch(): string {
    if (this.isEdit || !this.form.assetType) return '';
    const detected = detectAssetType(this.form.ticker);
    if (detected && detected !== this.form.assetType) {
      return `Ticker é de ${assetTypeLabel(detected)}, não condiz com ${assetTypeLabel(
        this.form.assetType as AssetType,
      )}`;
    }
    return '';
  }

  private readonly svc = inject(TransactionService);
  private readonly stockApi = inject(StockApiService);
  private readonly tickerInput$ = new Subject<{ ticker: string; date: string }>();
  private tickerSub?: Subscription;
  private readonly searchInput$ = new Subject<string>();
  private searchSub?: Subscription;

  // True quando o usuário editou o preço à mão — impede sobrescrever pela cotação.
  private priceManuallyEdited = false;

  suggestions = signal<TickerSuggestion[]>([]);

  assetTypes: { id: AssetType; label: string }[] = [
    { id: 'Acoes', label: 'Ações' },
    { id: 'FIIs', label: 'FIIs' },
    { id: 'ETFs', label: 'ETFs' },
  ];

  saving = signal(false);
  quoteLoading = signal(false);
  quoteName = signal('');
  quoteNotFound = signal(false);
  // Data de referência da cotação preenchida (YYYY-MM-DD), quando for passada.
  quoteAsOf = signal('');
  // Limite máximo do seletor de data: hoje (sem datas futuras).
  readonly maxDate = this.todayStr();

  form = {
    assetType: '' as AssetType | '',
    ticker: '',
    date: new Date().toISOString().split('T')[0],
    quantity: null as number | null,
    price: null as number | null,
  };

  // Valor exibido no campo Preço com máscara de moeda (ex.: "1.234,56").
  // `form.price` mantém o número correspondente para cálculo/salvamento.
  priceDisplay = '';

  // Formata um número como moeda BR (sem símbolo): 1234.5 -> "1.234,50".
  private formatPrice(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Aplica a máscara ao digitar: extrai dígitos, interpreta como centavos.
  onPriceInput(raw: string): void {
    const digits = (raw ?? '').replace(/\D/g, '');
    this.priceManuallyEdited = true;
    this.quoteAsOf.set('');
    delete this.errors.price;
    if (!digits) {
      this.form.price = null;
      this.priceDisplay = '';
      return;
    }
    const value = parseInt(digits, 10) / 100;
    this.form.price = value;
    this.priceDisplay = this.formatPrice(value);
  }

  errors: {
    assetType?: string;
    ticker?: string;
    date?: string;
    quantity?: string;
    price?: string;
  } = {};

  ngOnInit(): void {
    if (this.transaction) {
      // Modo edição: pré-carrega os dados; o ticker fica travado.
      this.form.assetType = this.transaction.assetType;
      this.form.ticker = this.transaction.ticker;
      this.form.date = this.transaction.date;
      this.form.quantity = this.transaction.quantity;
      this.form.price = this.transaction.price;
      this.priceDisplay = this.formatPrice(this.transaction.price);
    } else if (this.defaultAssetType) {
      // Modo adição a partir de uma seção: categoria já selecionada.
      this.form.assetType = this.defaultAssetType;
    }

    this.tickerSub = this.tickerInput$
      .pipe(
        debounceTime(600),
        distinctUntilChanged((a, b) => a.ticker === b.ticker && a.date === b.date),
        filter((q) => q.ticker.length >= 3),
        switchMap(({ ticker, date }) => {
          this.quoteLoading.set(true);
          this.quoteName.set('');
          this.quoteNotFound.set(false);
          return this.stockApi.getQuote(ticker, date).pipe(map((quote) => ({ quote, date })));
        }),
      )
      .subscribe(({ quote, date }) => {
        this.quoteLoading.set(false);
        if (quote.found && quote.price > 0) {
          // Não sobrescreve um preço editado à mão.
          if (!this.priceManuallyEdited) {
            this.form.price = quote.price;
            this.priceDisplay = this.formatPrice(quote.price);
            this.quoteAsOf.set(date < this.todayStr() ? date : '');
          }
          this.quoteName.set(quote.name || quote.ticker);
          this.quoteNotFound.set(false);
        } else {
          this.quoteNotFound.set(true);
          this.quoteName.set('');
        }
      });

    // Fluxo de sugestões (autocomplete): busca enquanto digita ≥3 letras.
    this.searchSub = this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((t) => t.length >= 3),
        switchMap((q) => this.stockApi.searchTickers(q)),
      )
      // Descarta ativos do mercado fracionário (ticker terminado em "F").
      .subscribe((list) => this.suggestions.set(list.filter((s) => !/F$/i.test(s.ticker))));
  }

  ngOnDestroy(): void {
    this.tickerSub?.unsubscribe();
    this.searchSub?.unsubscribe();
  }

  get total(): number {
    return (this.form.quantity ?? 0) * (this.form.price ?? 0);
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) this.close.emit();
  }

  onTickerChange(value: string) {
    this.form.ticker = value.toUpperCase();
    delete this.errors.ticker;
    this.quoteName.set('');
    this.quoteNotFound.set(false);
    // Novo ticker reabre o auto-preenchimento do preço.
    this.priceManuallyEdited = false;
    // Sugere o tipo detectado pelo ticker (quando não travado pela seção).
    if (!this.isAssetTypeLocked) {
      const detected = detectAssetType(this.form.ticker);
      if (detected) this.form.assetType = detected;
    }
    if (value.length >= 3) {
      this.tickerInput$.next({ ticker: value.toUpperCase(), date: this.form.date });
      this.searchInput$.next(value.toUpperCase());
    } else {
      this.suggestions.set([]);
    }
  }

  selectSuggestion(s: TickerSuggestion) {
    this.suggestions.set([]);
    this.onTickerChange(s.ticker);
    // Resolve nome/cotação imediatamente para o ticker escolhido.
    this.tickerInput$.next({ ticker: s.ticker.toUpperCase(), date: this.form.date });
  }

  // Ao trocar a data: rebusca o preço para a nova data. Na adição, sempre.
  // Na edição, só para data anterior a hoje (hoje/futuro preserva o registrado).
  onDateChange(value: string) {
    this.form.date = value;
    delete this.errors.date;
    const ticker = (this.form.ticker || '').trim();
    if (ticker.length < 3) return;
    if (this.isEdit && value >= this.todayStr()) return;
    this.tickerInput$.next({ ticker: ticker.toUpperCase(), date: this.form.date });
  }

  // Data de hoje em horário local (YYYY-MM-DD), sem deslocamento de fuso.
  todayStr(): string {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  // Placeholder do campo de ticker, específico do tipo selecionado.
  get tickerPlaceholder(): string {
    switch (this.form.assetType) {
      case 'Acoes':
        return 'Ex: VALE3';
      case 'FIIs':
        return 'Ex: MXRF11';
      case 'ETFs':
        return 'Ex: BOVA11';
      default:
        return 'Ex: VALE3, MXRF11, BOVA11';
    }
  }

  save() {
    this.errors = {};

    if (!this.form.assetType) this.errors.assetType = 'Selecione o tipo de ativo';
    if (!this.form.ticker.trim()) this.errors.ticker = 'Ativo obrigatório';
    if (!this.form.date) this.errors.date = 'Data obrigatória';
    else if (this.form.date > this.maxDate) this.errors.date = 'A data não pode ser futura';
    if (!this.form.quantity || this.form.quantity <= 0)
      this.errors.quantity = 'Quantidade inválida';
    if (!this.form.price || this.form.price <= 0) this.errors.price = 'Preço inválido';

    // Valida se o ticker condiz com o tipo escolhido (detecção por ticker;
    // distingue FII de ETF pela lista de ETFs conhecidos).
    if (!this.errors.ticker && this.form.assetType) {
      const detected = detectAssetType(this.form.ticker);
      if (detected && detected !== this.form.assetType) {
        this.errors.ticker = `Ticker é de ${assetTypeLabel(detected)}, não condiz com ${assetTypeLabel(
          this.form.assetType as AssetType,
        )}`;
      }
    }

    if (Object.keys(this.errors).length > 0) return;

    const payload = {
      assetType: this.form.assetType as AssetType,
      ticker: this.form.ticker.toUpperCase().trim(),
      date: this.form.date,
      quantity: this.form.quantity!,
      price: this.form.price!,
    };

    this.saving.set(true);
    const onDone = () => {
      this.saving.set(false);
      this.close.emit();
    };

    if (this.transaction) {
      this.svc.update(this.transaction.id, payload, onDone);
    } else {
      this.svc.add(payload, onDone);
    }
  }
}
