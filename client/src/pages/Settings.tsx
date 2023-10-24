import React from 'react'
import BtnGoBack from '../components/BtnGoBack'

import { FaCircleUser } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { logout } from '../store/features/user.slice';
import { useNavigate } from 'react-router-dom';
const Settings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick=()=>{
        dispatch(logout())
        navigate('/')
    }
  return (
    <div className='w-[95%] m-auto'>
        <div className='mt-5 flex justify-center items-center w-[40px] h-[40px] bg-zinc-200 rounded-[50%]'>
            <BtnGoBack navigateTo={-1} visible={true} color='black'/>
        </div>
        <div className='mt-5' onClick={handleClick}>
            <FaCircleUser size={30}/>
            <p>Logout</p>
        </div>

    </div>
  )
}

export default Settings