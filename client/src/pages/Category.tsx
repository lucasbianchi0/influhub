import React, { useEffect, useState } from 'react'
import { CategoriesType } from '../types';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../apis/getCategories';
import Navbar from '../components/Navbar';
import TabBar from '../components/TabBar';
import Post from '../components/Post';
import Carousel from '../components/UsersSlider';


const Category = ():React.ReactElement => {
    const {id}= useParams()
    const [category, setCategory] = useState<CategoriesType | null>(null)
    useEffect(() => {
        const getPostsFromApi = async () => {
            try {
                if(id){
                    const response = await getCategoryById(id );
                    setCategory(response);
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
        
        {category?.map(info=>(
            <div key={info.category_id}>
                <div >
                    <Navbar visible={true} title={info.title}/>
                </div>
                <Carousel/>
                <div className='w-[85%] m-auto  '> 
                    {/* {info>} */}
                    <h3 className='font-medium text-[18px] mt-[20px]'>Productos destacados en {category[0].title}</h3>
                    {info?.categories_posts[0]===null?<p>no hay posts</p>:
                        <div className='mt-[30px] grid grid-cols-2 gap-x-6  gap-y-1  '>
                            {info.categories_posts?.map(post=>(
                                <Post key={post.post_id} data={post}/>
                            ))}
                        </div>
                    }
                </div>
            </div>
        ))}
    </div>
    )
}

export default Category