import { AttributeWithOptionsModel } from "./AttributeWithOptionsModel";
import { TransactionAttributeModel } from "./TransactionAttributeModet";
import { TransactionTypeEnum } from "./TransactionTypeEnum";

export interface TransactionModel {
    productId?: number;
    quantity?: number;
    transactionType?: TransactionTypeEnum;
    note?: string;
    transactionAttributes?: TransactionAttributeModel[];
    updatedAt?: Date;
    updatedBy?: string;
  }