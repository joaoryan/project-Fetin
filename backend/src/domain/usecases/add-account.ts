import { AccountModel } from '../models/account'
export interface AddAccountModel {
  realm: string
  username: string 
  email: string 
  emailVerified: string
  verificationToken: string 
  nome_usuario: string
  idioma_usuario: string
  modelo: string 
  temperatura_usuario: string 
  data_cadastro: string
  tipo_usuario: string 
  status_usuario: string 
  password: string
}
export interface AddAccount {
  add (account : AddAccountModel): Promise<AccountModel>
}