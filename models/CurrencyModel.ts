interface CurrencyModel {
    id?: number;
    name: string;
    symbol: string;
    exchangeRateUsd?: Number;
    country: string | null;
    isActive: boolean;
    updatedAt?: Date;
    updatedBy?: string;
  }