import React from 'react'
import { IoChevronBackSharp } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

const Create = () => {
    const navigate = useNavigate()
  return (
    <div className='min-h-screen mt-20'>
        <div className='pt-7 pl-3'>
                <IoChevronBackSharp  size={30} onClick={()=>navigate(-1)}/>
            </div>
        <h2 className='text-[22px] font-semibold text-center'>Que quieres crear?</h2>
        <div className='flex gap-6 w-[90%] m-auto mt-6'>
            <div className='shadow-lg shadow-purple-300 p-4  flex justify-center rounded-lg '>
                <Link to={'/create-post'} className='text-center text-zinc-800 '>Quiero crear un Post</Link>
            
            </div>
            <div className='shadow-lg shadow-purple-300 p-4 flex justify-center '>
                <Link to={'/create-coupon'} className=' text-center text-zinc-800 '>Quiero crear un Coupon</Link>
            </div>
        </div>
    </div>
  )
}

export default Create