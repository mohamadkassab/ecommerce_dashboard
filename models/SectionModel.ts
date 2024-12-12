import { CategoryModel } from "./CategoryModel";

export interface SectionModel {
    id: number;
    name: string;
    updatedAt: Date;
    UpdatedBy?: string;
    categories?: CategoryModel[];
  }