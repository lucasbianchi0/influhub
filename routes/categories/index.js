import { Router } from "express";
import pool from '../../configDB.js';
import upload from "../../utils/imagesUploader.js";
const router = Router()

router.get('/categories',async(req,res)=>{
    const response =await pool.query('SELECT * FROM categories ORDER BY category_id ASC')
    res.json(response.rows)
})

router.get('/category/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query(`
            SELECT categories.*, json_agg(posts.*) as categories_posts
            FROM categories
            LEFT JOIN posts ON categories.category_id = posts.category_id
            WHERE categories.category_id = $1
            GROUP BY categories.category_id;
        `, [id]);

        const postsInCategories = response.rows;
        console.log(postsInCategories)
        res.json(postsInCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});  


router.post('/create-category',upload.single('image'),async(req,res)=>{
    const {title} = req.body
    const imagepath_category = req.file? req.file.filename: null
    try{
        const response = await pool.query(
            'INSERT INTO categories (title, imagepath_category) VALUES ($1, $2)',
            [title,imagepath_category])
        res.json(response.rows)
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Hubo un error al registrar el usuario' });
    } 
})

router.delete('/delete-category/:id',async(req,res)=>{
    const {id}= req.params
    const response = await pool.query('DELETE FROM categories WHERE category_id = $1',[id])
    res.json(response.rows)
})



router.get('/category/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categoryResponse = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
        const postResponse = await pool.query('SELECT * FROM posts WHERE category_id = $1', [id]);

        const category = categoryResponse.rows[0];
        const posts = postResponse.rows;

        const result = {
            category: category,
            posts: posts
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la categoría y los posts relacionados." });
    }
});

export default router



/* --------------------------------- cambio --------------------------------- */

// router.get('/category/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const categoryResponse = await pool.query('SELECT * FROM categories WHERE category_id = $1', [id]);
//         const postResponse = await pool.query('SELECT * FROM posts WHERE category_id = $1', [id]);

//         const category = categoryResponse.rows[0];
//         const posts = postResponse.rows;

//         const result = {
//             category: category,
//             posts: posts
//         };

//         res.json(result);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error al obtener la categoría y los posts relacionados." });
//     }
// });
