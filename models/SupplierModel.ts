interface SupplierModel {
    id?: number;
    name: string;
    phone?: string;
    address?: string;
    city?: string;
    email?: string;
    website?: string;
    country: string | null;
    updatedAt?: Date;
    updatedBy?: string;
  }