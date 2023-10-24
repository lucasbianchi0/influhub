import React, { useEffect } from 'react'
// import { PostsType } from '../types';
import { getPosts } from '../apis/getPosts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../store/features/posts.slice';
import { RootState } from '../store/store';
import Post from '../components/Post';

const Posts = ():React.ReactElement => {
    const dispatch = useDispatch()
    const posts = useSelector((state:RootState)=>state.posts)
    // const [posts, setPosts] = useState<PostsType>([])
    useEffect(() => {
        const getPostsFromApi = async () => {
            try {
                const response = await getPosts();
                dispatch(setPosts(response));
            } catch (err) {
                console.log('Hubo un error: ' + err);
            }
        };
        getPostsFromApi(); 
    }, [dispatch]);

   
    return (
        <>
        <div className='w-[85%] m-auto'>
            <h2 className='font-poppins font-bold mt-8 text-[18px]  '>Productos </h2>
            <div className='mt-[16px]  grid grid-cols-2 gap-x-6  gap-y-7  '>
            {posts?.map(post=>(
                <Post key={post.post_id} data={post}/>
            ))}
            </div>  
        </div>
        </>
      )
    }

export default Posts