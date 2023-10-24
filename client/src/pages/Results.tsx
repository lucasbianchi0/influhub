import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PostsType } from '../types'
import { getFilteredPosts } from '../apis/getResults'
import Navbar from '../components/Navbar'
import TabBar from '../components/TabBar'
import Search from '../components/Search'
import BtnGoBack from '../components/BtnGoBack'

const Results = ():React.ReactElement => {
    const {search} = useParams()
    const [results, setResults] = useState<PostsType>([])

    useEffect(()=>{
        const getResultsFromApi = async ()=>{
            try{
                if(search){
                    const response = await getFilteredPosts(search)
                    setResults(response)    
                }   
            }catch(err){
                console.log(err)
                throw err
            }
        }
        getResultsFromApi()
    },[search])
  return (

    <div className='bg-zinc-100 min-h-screen'>
        <TabBar/>
        {/* <Navbar title='influhub'/> */}
        <div className=' flex justify-center items-center'>
            {/* <BtnGoBack navigateTo='/'/> */}
            <Search/>
        </div>
        
        <div className='w-[90%] m-auto'>
            <h2 className='mt-8 text-[18px] font-medium'>Results for:{search}</h2>
            <div className='mt-[30px] grid grid-cols-2 gap-4  '>
                {results?.map(post=>(
                    <Link key={post.post_id} to={'/post/'+post.post_id}>
                        <div  className=''>
                            <img className='rounded-[30px]' src={`http://localhost:3000/uploads/${post.imagepath_post}`} alt="" />
                            <h3 className='font-medium'>{post.title_post}</h3>
                            <p className='text-mainColor'>{post.user_id}</p>
                        </div>
                    </Link>
                    
                ))}
            </div>  
    
        </div>
    </div>
  )
}

export default Results