import { AddUserRepository } from '../../../../data/protocol/db/user/add-user-repository'
import { AddUserModel } from '../../../../domain/usecases/add-user'
import { UserModel } from '../../../../domain/models/user'
import { insertOne } from '../mysql-helper'
import { mapAccount } from './user-helper'
import  {  Pool } from 'mysql'

export class AccountMySqlRepository implements AddUserRepository { 
  public readonly connectionPool: Pool

  constructor (pool: Pool) {
    this.connectionPool = pool
  }
  async add(userData: AddUserModel): Promise<UserModel> {
    const result = await insertOne(this.connectionPool, 'user', userData)
    return mapAccount(userData, result.insertId)
  }
}
