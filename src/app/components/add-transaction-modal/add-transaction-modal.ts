import {
  Component,
  EventEmitter,
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
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { StockApiService, TickerSuggestion } from '../../services/stock-api.service';
import { AssetType, Transaction } from '../../models/transaction.model';

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

  get isEdit(): boolean {
    return this.transaction !== null;
  }

  private readonly svc = inject(TransactionService);
  private readonly stockApi = inject(StockApiService);
  private readonly tickerInput$ = new Subject<string>();
  private tickerSub?: Subscription;
  private readonly searchInput$ = new Subject<string>();
  private searchSub?: Subscription;

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

  form = {
    assetType: '' as AssetType | '',
    ticker: '',
    date: new Date().toISOString().split('T')[0],
    quantity: null as number | null,
    price: null as number | null,
  };

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
    } else if (this.defaultAssetType) {
      // Modo adição a partir de uma seção: categoria já selecionada.
      this.form.assetType = this.defaultAssetType;
    }

    this.tickerSub = this.tickerInput$
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        filter((t) => t.length >= 3),
        switchMap((ticker) => {
          this.quoteLoading.set(true);
          this.quoteName.set('');
          this.quoteNotFound.set(false);
          return this.stockApi.getQuote(ticker);
        }),
      )
      .subscribe((quote) => {
        this.quoteLoading.set(false);
        if (quote.found && quote.price > 0) {
          this.form.price = quote.price;
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
      .subscribe((list) => this.suggestions.set(list));
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
    if (value.length >= 3) {
      this.tickerInput$.next(value.toUpperCase());
      this.searchInput$.next(value.toUpperCase());
    } else {
      this.suggestions.set([]);
    }
  }

  selectSuggestion(s: TickerSuggestion) {
    this.suggestions.set([]);
    this.onTickerChange(s.ticker);
    // Resolve nome/cotação imediatamente para o ticker escolhido.
    this.tickerInput$.next(s.ticker.toUpperCase());
  }

  save() {
    this.errors = {};

    if (!this.form.assetType) this.errors.assetType = 'Selecione o tipo de ativo';
    if (!this.form.ticker.trim()) this.errors.ticker = 'Ativo obrigatório';
    if (!this.form.date) this.errors.date = 'Data obrigatória';
    if (!this.form.quantity || this.form.quantity <= 0)
      this.errors.quantity = 'Quantidade inválida';
    if (!this.form.price || this.form.price <= 0) this.errors.price = 'Preço inválido';

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
