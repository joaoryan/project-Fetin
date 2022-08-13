import express from 'express'
import setUpMiddlewares from './middlewares'
import setUpRoutes from './routes'
import mysql from 'mysql'
import env from './env'

const app = express()
const connection = mysql.createPool(env.db)
setUpMiddlewares(app)
setUpRoutes(app, connection)
export { app, connection }
