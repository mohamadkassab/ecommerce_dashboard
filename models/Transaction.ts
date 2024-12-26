interface TransactionAttributeModel{
    attribute: string;
    attributeOption: string;
}
export interface TransactionModel {
    productId?: number;
    quantity: number;
    transactionType: string;
    note: string;
    transactionAttributes: TransactionAttributeModel[];
    updatedAt?: Date;
    updatedBy?: string;
  }