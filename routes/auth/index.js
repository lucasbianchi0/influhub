import { Router } from "express";
import pool from '../../configDB.js';
import upload from "../../utils/imagesUploader.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
const router = Router()

router.post('/signup', upload.single('image'), async (req, res) => {
    const { name, lastname, description_profile, username, password } = req.body;
    // const imagepath_profile = req.file ? req.file.path : null;
    console.log(req.file)
    const imagepath_profile = req.file ? req.file.filename : null;
    const passwordHash = await bcrypt.hash(password, 10);
    try {
        const usernameExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (usernameExists.rows.length > 0) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        const response = await pool.query(
            'INSERT INTO users (name, lastname, description_profile, imagepath_profile, username, password) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, lastname, description_profile, imagepath_profile, username, passwordHash]
        );

        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
    }
});

router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    // console.log(username,password)
    
    const response = await pool.query('SELECT * FROM users WHERE username = $1 ',[username])
    
    if (response.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const user = response.rows[0]
    const isMatch =await bcrypt.compare(password,user.password)
    if (!isMatch){
        return res.json('la contrasena no coincide')
    }
    const payload={userId:user.userId}
    const token= jwt.sign(payload,'token')
    res.cookie('token',token,{
        sameSite:"none",
        secure:true,
        httpOnly:false
    })
 
    console.log(user)
    
    res.json([user])
})






export default router