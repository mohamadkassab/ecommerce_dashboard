export interface BrandModel {
    id?: number;
    name: string;
    website?: string;
    logoFile?: File | null;
    country: string | null;
    updatedAt?: Date;
    updatedBy?: string;
  }
  