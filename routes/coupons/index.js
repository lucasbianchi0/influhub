import { Router } from "express";
import pool from "../../configDB.js";
import upload from "../../utils/imagesUploader.js";

const router = Router()

// getCoupons
router.get('/coupons', async (req,res)=>{
    const response =await pool.query('SELECT * FROM coupons ORDER BY user_id ASC ')
    res.json(response.rows)
 })

// getCoupon

router.get('/coupons/:id', async (req,res)=>{
    const {id}=req.params
    const response =await pool.query('SELECT * FROM coupons WHERE coupon_id = $1',[id])
    res.json(response.rows)
 })
// postCoupon
router.post('/create-coupon',upload.single('image'),async(req,res)=>{
    const {user_id, title_coupon, description_coupon,code_coupon }= req.body
    const imagepath_coupon=req.file?req.file.filename:null
    console.log('3')
    console.log(user_id, title_coupon, description_coupon, code_coupon)
    try {
        const response = await pool.query('INSERT INTO coupons ( title_coupon , description_coupon , code_coupon, user_id, imagepath_coupon ) VALUES ($1 , $2 , $3 , $4 , $5) RETURNING * ', [ title_coupon, description_coupon,code_coupon, user_id, imagepath_coupon])
        res.json(response.rows)
    } catch (error) {
        console.log(error)
        throw error
    }
 })

// deleteCoupon

router.delete('/delete-coupon/:id', async (req,res)=>{
    const {id}= req.params
    try {
        const response =await pool.query('DELETE FROM coupons WHERE coupon_id = $1', [id] )
        res.send('el coupon fue eliminado correctamente')
    } catch (error) {
        console.log(error)
        throw error
    }
    
})


export default router