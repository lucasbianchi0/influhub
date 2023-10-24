import axios from 'axios'
import {PostModel, PostsType} from '../types'


export const getPosts = async (): Promise<PostsType> => {
    try {
        const response = await axios.get<PostsType>('http://localhost:3000/posts');
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};

export const getPostById = async (id: string|null): Promise<PostsType> => {
    try {
        const response = await axios.get<PostsType>('http://localhost:3000/posts/'+id);
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};

export const createPost = async (formData:PostModel): Promise<string> => {
    try{
        const response = await axios.post('http://localhost:3000/create-post', formData);
        return response.data;
    }catch(err){
        console.log(err)
        throw err
    }
};

export const deletePost = async(id:number)=>{
    try{
        const response =axios.delete('http://localhost:3000/delete-post/'+id)
        console.log(response)

    }catch(err){
        console.log(err)
        throw err
    }
}
