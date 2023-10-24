import express from 'express'
import pool from './configDB.js';
import routerCategories from './routes/categories/index.js'
import routerUsers from './routes/users/index.js';
import routerPosts from './routes/posts/index.js';
import routerAuth from './routes/auth/index.js';
import routerCoupons from './routes/coupons/index.js'
import cors from 'cors'
import upload from './utils/imagesUploader.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors(
  {
    origin:true,
    credentials:true
  }
))


app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(routerCategories)
app.use(routerUsers)
app.use(routerPosts)
app.use(routerCoupons)
app.use('/auth',routerAuth)

  
app.listen(3000,()=>{
  
    console.log('escuchando en port 3000')
})
