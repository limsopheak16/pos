import DataModel from "./model";

export interface UserModel extends DataModel {
  id: string;
  username: string;
  email: string;
  imageUrl?: string;
  isActive: boolean;
  role: string;
  roleId: string;
}

export interface UserApiResModel extends UserModel {
  // Inherits all properties from UserModel including roleId
}
