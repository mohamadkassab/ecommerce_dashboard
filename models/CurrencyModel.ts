interface CurrencyModel {
    id?: number;
    name: string;
    symbol: string;
    exchangeRateUsd: Number;
    country: string | null;
    updatedAt?: Date;
    updatedBy?: string;
  }