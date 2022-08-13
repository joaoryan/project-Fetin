import { Pool } from 'mysql'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BCryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMySqlRepository } from '../../infra/db/mysql/user-repository/user'
import { SignUpController } from '../../presentation/controller/signup/singUp'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = (pool: Pool): SignUpController => {
  const salt = 12
  const bCryptAdapter = new BCryptAdapter(salt)
  const accountMySqlRepository = new AccountMySqlRepository(pool)
  const dbAddAccount = new DbAddAccount(bCryptAdapter, accountMySqlRepository)
  const emailValidator = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidator, dbAddAccount)

  return signUpController
}
