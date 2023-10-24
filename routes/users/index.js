import { Router } from "express";
import pool from "../../configDB.js";
const router= Router()
import upload from '../../utils/imagesUploader.js'

router.get('/users',async (req,res)=>{
    const response =await pool.query('SELECT * FROM users ORDER BY user_id ASC ')
    res.json(response.rows)
})

router.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query(`
            SELECT 
                users.*, 
                json_agg(posts.*) as user_posts,
                (SELECT json_agg(coupons.*) 
                 FROM coupons 
                 WHERE coupons.user_id = $1) as user_coupons
            FROM users
            LEFT JOIN posts ON users.user_id = posts.user_id
            WHERE users.user_id = $1
            GROUP BY users.user_id;
        `, [id]);

        const userWithPostsAndCoupons = response.rows;
        console.log(userWithPostsAndCoupons)
        res.json(userWithPostsAndCoupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


router.post('/create-user',async (req,res)=>{
    const {name,lastname, description_profile, imagepath_profile, username, password}=req.body
    console.log(name,lastname)
    const response = await pool.query('INSERT INTO users (name,lastname, description_profile, imagepath_profile, username, password) VALUES ($1, $2, $3, $4, $5, $6)',[name,lastname, description_profile, imagepath_profile, username, password])
    res.json(response.rows)
})

router.delete('/delete-user',async (req,res)=>{
    const {id}= req.params
    const response =await pool.query('DELETE * FROM users WHERE user_id = $1 ',[id])
    res.json(response.rows)
})

router.delete('/users',async (req,res)=>{
    const response =await pool.query('SELECT * FROM users ORDER BY user_id ASC ')
    res.json(response.rows)
})

router.put('/edit-user/:id', upload.single('image'), async (req, res) => {

    console.log('entro la peticion put');

    const { id } = req.params;
    const { name, lastname, description_profile, username, password } = req.body;
    const image = req.file ? req.file.filename : null;
    console.log(req.file)
    try {
        const query = `
            UPDATE users
            SET 
                name = $1,
                lastname = $2,
                description_profile = $3,
                username = $4,
                password = $5,
                imagepath_profile = COALESCE($6, imagepath_profile) 
            WHERE user_id = $7
            RETURNING *;
        `;

        const values = [
            name,
            lastname,
            description_profile,
            username,
            password,
            image,
            id
        ];

        const response = await pool.query(query, values);
        console.log({ usuario_actualizado: response.rows[0] });
        res.json(response.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});




export default router