import { Router } from "express";
import pool from '../../configDB.js';
import upload from "../../utils/imagesUploader.js";
const router = Router()

router.get('/posts',async(req,res)=>{
    const response =await pool.query('SELECT * FROM posts ORDER BY post_id ASC')
    res.json(response.rows)
})

router.get('/posts/:id', async (req, res) => {
    const { id } = req.params; 
    const query = `
        SELECT posts.*, users.*
        FROM posts
        JOIN users ON posts.user_id = users.user_id
        WHERE posts.post_id = $1;
    `;
    const response = await pool.query(query, [id]);
    res.json(response.rows);
});



router.post('/create-post',upload.single('image'),async(req,res)=>{
    const {description_post,title_post, brand_post, category_id, user_id}= req.body
    const imagepath_post=req.file?req.file.filename:null
    const response = await pool.query(
        'INSERT INTO posts (description_post, title_post, imagepath_post, brand_post, category_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [description_post,title_post, imagepath_post, brand_post, category_id, user_id])
    res.json(response.rows)
})

router.delete('/delete-post/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const deletePostQuery = 'DELETE FROM posts WHERE post_id = $1';
        await pool.query(deletePostQuery, [postId]);
        res.send('Post eliminado exitosamente');
    } catch (err) {
        console.error('Error al eliminar el post:', err);
        res.status(500).send('Error al eliminar el post');
    }
});
export default router