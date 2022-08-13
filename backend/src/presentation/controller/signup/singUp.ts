import { HttpResponse, HttpRequest } from '../../protocols/http'
import { serverError, ok } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { EmailValidator } from '../../protocols/email-validator'
import { AddUser } from '../../../domain/usecases/add-user'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddUser

  constructor (emailValidator: EmailValidator, addAccount: AddUser) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {name, email, emailVerification, password, token, img} = httpRequest.body
  
      const account = await this.addAccount.add({
        name,
        email,
        emailVerification,
        password,
        token,
        img
      })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
