export interface ProductModel {
    id?: number;
    code: string;
    name: string;
    cost?: number;
    price?: number;
    discount?: number;
    year?: number;
    supplier: string;
    brand: string;
    season: string;
    note: string;
    updatedAt?: Date;
    updatedBy?: string;
    isActive: boolean;
  }