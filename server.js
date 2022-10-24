//import cors from 'cors'

import express from 'express'

const app = express()
import dotenv from 'dotenv'
// db and authenticateUser
import connectDB from './db/connect.js'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
//  routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
const port = process.env.PORT || 5000

// middlware
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'
import authenticateUser from './middleware/auth.js'

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}
//app.use(cors())
app.use(express.json())

// app.get('/',(req,res)=>{
//     res.json({msg:'Welcome'})
// })

app.get('/api/v1',(req,res)=>{
    res.json({msg:'Welcome'})
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)





const start  = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log("server is running from port:",port)
        })
    } catch (error) {
        console.log(error)
    }
}

start()