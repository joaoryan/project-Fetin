/* eslint-disable no-undef */
import express from 'express'
import request from 'supertest'
import { app, connection } from '../config/app'
import env from '../config/env'
import setUpMiddlewares from '../config/middlewares'
import setUpRoutes from '../config/routes'
import mysql from 'mysql'

describe('SignUp Routes', () => {
  afterAll(() => {
    testConnection.end()
    connection.end()
  })
  
  const testConnection = mysql.createPool(env.dbTest)
  const app1 = express()
  setUpMiddlewares(app1)
  setUpRoutes(app1, testConnection)

  test('Should return an account on success ', async () => {
    await request(app1)
      .post('/api/signup')
      .send({
        name: 'test',
        email: 'any_email@email.com',
        emailVerification: true,
        password: 'any_password',
        token: 'any_token',
        img: 'img'
      })
      .expect(200)
  })
})
