import { UserModel } from '../../../domain/models/user'
import { AddUser, AddUserModel } from '../../../domain/usecases/add-user'
import { AddUserRepository } from '../../protocol/db/user/add-user-repository'
import { Encrypter } from '../../protocol/encrypter'

export class DbAddAccount implements AddUser{
  private readonly encrypter: Encrypter
  private readonly addUserRepository: AddUserRepository
  
  constructor (encrypter: Encrypter, addUserRepository: AddUserRepository) {
    this.encrypter = encrypter
    this.addUserRepository = addUserRepository
  }

  async add (accountData: AddUserModel): Promise<UserModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = this.addUserRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
