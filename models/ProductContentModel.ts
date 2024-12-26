export interface ProductContentModel {
    productId?: number;
    shortDescription: string;
    longDescription: string;
    weight?: number;
    shippingWeight?: number;
    minOrder?: number;
    maxOrder?: number;
    categories: string[];
    tags: string[];
    media: (File | null)[];
    updatedAt?: Date;
    updatedBy?: string;
  }