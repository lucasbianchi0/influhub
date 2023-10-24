import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostsType } from '../types'
import {getPostById} from '../apis/getPosts'
import TabBar from '../components/TabBar'
import PostSelected from '../components/PostSelected'


const Post = () => {
    const {id}= useParams()
    const [post, setPost] = useState<PostsType | null>(null)
    useEffect(() => {
       
        const getPostsFromApi = async () => {
            try {
                if(id){
                    const response = await getPostById(id);
                    console.log(response)
                    setPost(response);
                }
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        };    
        getPostsFromApi();
    }, [id]);

 

  return (
    <div>
        <TabBar/>     
        {post?.map(info=>(
            <PostSelected info={info} key={info.post_id}/>

        ))}
    </div>
  )
}

export default Post