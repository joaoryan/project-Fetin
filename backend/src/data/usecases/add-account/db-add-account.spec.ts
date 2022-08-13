/* eslint-disable no-undef */
import { AddUserModel,Encrypter , UserModel, AddUserRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'

const makeFakeGroup = (): UserModel => (
  {
    id: 1,
    name: 'test',
    email: 'any_email@email.com',
    emailVerification: true,
    password: 'any_password',
    token: 'any_token',
    img: 'img'
  }
)

const makeFakeAddUser = (): AddUserModel => (
  {
    name: 'test',
    email: 'any_email@email.com',
    emailVerification: true,
    password: 'any_password',
    token: 'any_token',
    img: 'img'
  }
)

const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add(userData: AddUserModel): Promise<UserModel> {
      return new Promise(resolve => resolve(makeFakeGroup()))
    }
  }

  return new AddUserRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('any_password'))
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: DbAddAccount
  addUserRepositoryStub: AddUserRepository
  encrypterStup: Encrypter
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository()
  const encrypterStup = makeEncrypter()
  const sut = new DbAddAccount(encrypterStup, addUserRepositoryStub)
  return {
    sut,
    addUserRepositoryStub,
    encrypterStup
  }
}

describe('DbAddUser Usecase', () => {
  test('Should call AddUserRepository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addUserRepositoryStub, 'add')
    await sut.add(makeFakeAddUser())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'test',
      email: 'any_email@email.com',
      emailVerification: true,
      password: 'any_password',
      token: 'any_token',
      img: 'img'
    })
  })

  test('Should throw if AddGroupRepository thows', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeAddUser())
    await expect(promise).rejects.toThrow()
  })
})
