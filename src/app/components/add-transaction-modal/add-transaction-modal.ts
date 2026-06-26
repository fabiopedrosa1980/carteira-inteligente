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
import { StockApiService, StockQuote, TickerSuggestion } from '../../services/stock-api.service';
import { AssetType, Transaction } from '../../models/transaction.model';
import { detectAssetType, resolveAssetType, assetTypeLabel } from '../../models/asset-type.util';

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

  // Fecha a lista de sugestões ao clicar fora do campo/lista de ticker. Cliques
  // dentro de .ticker-wrapper (input ou sugestões) não fecham por aqui — a
  // seleção segue por selectSuggestion(). Não fecha o modal nem limpa o ticker.
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.suggestions().length === 0) return;
    const target = event.target as HTMLElement | null;
    if (!target || !target.closest('.ticker-wrapper')) {
      this.suggestions.set([]);
    }
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
  // selecionado. Usa a resolução em tiers (catálogo da API → nome → sufixo):
  // tolera o indeterminado (null, ex.: sufixo 11 sem catálogo nem nome) e só
  // alerta quando o tipo resolvido com confiança diverge do escolhido.
  get tickerTypeMismatch(): string {
    if (this.isEdit || !this.form.assetType) return '';
    const resolved = this.resolvedType();
    if (resolved && resolved !== this.form.assetType) {
      return `Ticker é de ${assetTypeLabel(resolved)}, não condiz com ${assetTypeLabel(
        this.form.assetType as AssetType,
      )}`;
    }
    return '';
  }

  // Tipo resolvido para o ticker atual em tiers (catálogo da última cotação →
  // nome → sufixo). Só considera a cotação quando ela é do ticker em edição.
  private resolvedType(): AssetType | null {
    const t = (this.form.ticker || '').toUpperCase().trim();
    const q = this.lastQuote && this.lastQuote.ticker === t ? this.lastQuote : null;
    return resolveAssetType(t, q?.assetType, q?.name);
  }

  private readonly svc = inject(TransactionService);
  private readonly stockApi = inject(StockApiService);
  private readonly tickerInput$ = new Subject<{ ticker: string; date: string }>();
  private tickerSub?: Subscription;
  private readonly searchInput$ = new Subject<string>();
  private searchSub?: Subscription;

  // True quando o usuário editou o preço à mão — impede sobrescrever pela cotação.
  private priceManuallyEdited = false;

  // Última cotação resolvida (traz assetType do catálogo e name) usada pela
  // validação de tipo. Reiniciada a cada novo ticker para não usar dado velho.
  private lastQuote: StockQuote | null = null;

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
        // Guarda a cotação (assetType do catálogo + name) para a validação de
        // tipo, mesmo quando o preço não veio — o tipo independe do preço.
        this.lastQuote = quote;
        if (quote.found && quote.price > 0) {
          // Não sobrescreve um preço editado à mão.
          if (!this.priceManuallyEdited) {
            this.form.price = quote.price;
            this.priceDisplay = this.formatPrice(quote.price);
            this.quoteAsOf.set(date < this.todayStr() ? date : '');
          }
          // Catálogo B3 da API é a fonte de verdade do tipo: quando a cotação
          // traz assetType e o tipo não está travado, ele corrige/confirma a
          // sugestão imediata feita pela heurística por sufixo (fallback offline).
          if (!this.isAssetTypeLocked && quote.assetType) {
            this.form.assetType = quote.assetType;
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
    // Novo ticker invalida a cotação anterior (tipo/nome) até resolver de novo.
    this.lastQuote = null;
    // Novo ticker reabre o auto-preenchimento do preço.
    this.priceManuallyEdited = false;
    // Sugestão imediata por heurística de sufixo (fallback offline). É só um
    // palpite enquanto a cotação não resolve: quando ela chega, o assetType do
    // catálogo B3 da API tem prioridade e corrige esta sugestão (ver subscribe).
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

    // Valida se o ticker condiz com o tipo escolhido pela resolução em tiers
    // (catálogo da API → nome → sufixo). Só bloqueia quando o tipo resolvido com
    // confiança diverge; indeterminado (null, ex.: 11 sem catálogo) não bloqueia.
    if (!this.errors.ticker && this.form.assetType) {
      const resolved = this.resolvedType();
      if (resolved && resolved !== this.form.assetType) {
        this.errors.ticker = `Ticker é de ${assetTypeLabel(resolved)}, não condiz com ${assetTypeLabel(
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
    // Erro da API (ex.: 422 de tipo incompatível com o catálogo): para o
    // spinner, mostra a mensagem no campo de ticker e mantém o modal aberto.
    const onError = (msg: string) => {
      this.saving.set(false);
      this.errors = { ...this.errors, ticker: msg };
    };

    if (this.transaction) {
      this.svc.update(this.transaction.id, payload, onDone, onError);
    } else {
      this.svc.add(payload, onDone, onError);
    }
  }
}
