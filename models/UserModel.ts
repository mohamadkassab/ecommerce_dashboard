import { RoleWithoutPermissionsModel } from "./RoleWithoutPermissionsModel";

export interface UserModel {
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    dob: Date;
    phone: string;
    address?: string;
    roles?: RoleWithoutPermissionsModel[];
    updatedAt?: Date;
    updatedBy?: Date;
    failedLoginAttempts: number;
    isActive: boolean;
  }