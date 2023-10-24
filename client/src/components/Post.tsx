import React from 'react'
import { Link } from 'react-router-dom'
import { PostType } from '../types'



const Post = ({data}:{data:PostType}) => {
  const match = location.pathname.match(/^\/profile\/(\d+)$/);
  const isProfilePage = match !== null;
  const capitalizeFirstLetter =(text:string)=> {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return (
    <Link className=' rounded-xl '
                key={data.post_id} to={'/post/'+data.post_id}>
                <div  className=''>
                    {/* <img className=' h-[160px] w-full' src={`http://localhost:3000/uploads/${data.imagepath_post}`} alt="" /> */}
                    <img className=' h-[130px] w-[156px] rounded-[20px] drop-shadow-sm border' src={`http://localhost:3000/uploads/${data.imagepath_post}`} alt="" />
                    <h3 className=' mt-4 font-bold text-[16px] overflow-hidden whitespace-nowrap text-ellipsis'>{capitalizeFirstLetter(data.title_post)}</h3>
                    <p className='text-mainColor text-[14px] overflow-hidden whitespace-nowrap text-ellipsis'>
                        {isProfilePage ? `${data.brand_post}` : `@${data.title_post}`}
                    </p>
                </div>
    </Link>
  )
}

export default Post