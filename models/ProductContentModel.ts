export interface ProductContentModel {
    productId?: number;
    shortDescription: string;
    longDescription: string;
    weight?: number;
    shippingWeight?: number;
    minOrder?: number;
    maxOrder?: number;
    categories: string[];
    media: (File | null)[];
    updatedAt?: Date;
    updatedBy?: string;
  }