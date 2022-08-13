import { UserModel } from '../../../../domain/models/user'
import { AddUserModel } from '../../../../domain/usecases/add-user'

export const mapAccount = (addedAccount: AddUserModel, addedAccountId: number): UserModel => {
  return Object.assign({}, addedAccount, { id: addedAccountId })
}