import { UserModel } from '../models/user'

export interface AddUserModel {
  name: string,
  email: string,
  emailVerification: boolean,
  password: string,
  token: string,
  img: string,
}
export interface AddUser {
  add (user : AddUserModel): Promise<UserModel>
}