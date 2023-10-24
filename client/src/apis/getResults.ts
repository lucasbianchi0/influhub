import axios from 'axios'
import {PostsType} from '../types'


export const getFilteredPosts = async (search:string): Promise<PostsType> => {
    try {
        const response = await axios.get<PostsType>('http://localhost:3000/posts');
        const filteredPosts =response.data.filter(post=>post.title_post.includes(search))
        return filteredPosts;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};