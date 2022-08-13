/* eslint-disable no-undef */
import mysql, { Pool } from 'mysql'
import { AccountMySqlRepository } from './user'
import env from '../../../../main/config/env'
import { insertOne } from '../mysql-helper'
import { connection } from '../../../../main/config/app'

describe('Account MySQL Repository', () => {
  afterAll(async () => {
    connection.end()
    pool.end()
  })
  
  const pool = mysql.createPool(env.dbTest)
  const sut = new AccountMySqlRepository(pool)

  test('Should return an account on success', async () => {
    const account = await sut.add({
      name: 'test',
      email: 'any_email@email.com',
      emailVerification: true,
      password: 'any_password',
      token: 'any_token',
      img: 'img'
    })

    expect(account).toBeTruthy()
  })
})
