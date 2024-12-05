import apiRountes from './routes/apiRountes'
import { Router } from 'express';
import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'

mongoose.connect('mongodb://mongo:27017/user')
  .then(() => console.log('Connected!'));
const app = express();  
const route = Router()
app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({extended: true, limit: '100mb'}))


route.use('/', apiRountes)


app.use(route)
app.listen(8090, '0.0.0.0', ()=>{
  console.log("up")
})
