import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../apis/getUsers'
import { UsersType } from '../types'
import TabBar from '../components/TabBar'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Post from '../components/Post'
import CategoriesInUsers from '../components/CategoriesInUsers'
import {TbSettings} from 'react-icons/tb'
import CuponeraProfile from '../components/CuponeraProfile'

const Profile = ():React.ReactElement => {
    const {id} = useParams()
    const [user, setUser] = useState<UsersType | null>(null)
    const userLogged =useSelector((state:RootState)=>state.user)
    const navigate = useNavigate()
    
    useEffect(()=>{
        
        const getProfile = async()=>{
            try{
                if(id){
                    const response = await getUserById(id)
                    console.log(response) 
                    setUser(response)
                }else if(userLogged.length !== 0  ){   
                    const response = await getUserById((userLogged[0]?.user_id))
                    console.log(response) 
                    setUser(response)
                }else{
                    setUser(null)
                }
            }catch(err){
                console.log(err)
                throw err
            }
        }
        getProfile()
    },[id,userLogged])

    const [selected, setSelected] = useState<null | string>('todo')

    const handleClick = (todo:string)=>{
        setSelected(todo)
    }

  return (
    <div>
        <TabBar/>
        
        <div className='bg-gradient-to-b from-customPurpleStart to-customPurpleEnd h-[160px]'>
        </div>
        <div className='bg-white  rounded-t-[50px] pt-[15px] pb-[140px] translate-y-[-50px]'>
           
            {!user? 
                <div>
                    <div className='  mt-[-60px] h-[100px] w-[100px] rounded-full bg-zinc-200 m-auto'>
                        <img className='m-auto rounded-full h-[100px] w-[100px]' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt="" />
                    </div>
                    <div  className='flex flex-col items-center'>
                        <h2 className='my-3 mt-10 font-semibold text-[26px]'>No existe usuario</h2>   
                    </div>
                </div>
                :null}
            {user?.map(info=>(
                <div key={info.user_id}>

                    {/* <Link to={'/settings'} className='absolute top-4 right-4 bg-zinc-200 w-[40px] p-1 rounded-[50%] flex items-center justify-center'>
                        <TbSettings color='black' size={30}/>
                    </Link> */}
                    <div className='translate-y-[-10px] mt-[-60px] h-[130px] w-[130px]  rounded-[50%] bg-zinc-200 m-auto'>
                        <img className='m-auto  rounded-full h-[130px] w-[130px]' src={`http://localhost:3000/uploads/${info.imagepath_profile}`} alt="" />
                    </div>
                    <div  className='flex flex-col items-center w-[70%] m-auto'>
                        <h2 className='my-3 font-bold text-[26px]'>{info.name} {info.lastname}</h2>
                        <p className='text-zinc-500 text-center'>{info.description_profile}</p>
                        
                        {userLogged.length!== 0  && !id?
                            <button onClick={()=>navigate('/edit-profile')} className='w-[128px] h-[32px] text-[14px] rounded-[100px] mt-4 border bg-zinc-800 text-white py-1 px-3'>Editar perfil</button>
                            : null}
                        
                        <CategoriesInUsers handleClick={handleClick} selected={selected} posts={info.user_posts} coupons={info.user_coupons} />
                       
                    </div>
                    {selected==='todo'?
                    <div className='bg-white'>
                        <div className='pt-[40px] '>
                            {info?.user_posts[0]=== null?<p className='text-center'>no hay posts</p>:
                            <div className='grid grid-cols-2 gap-x-6 gap-y-4  w-[90%] m-auto'>
                                {info?.user_posts?.map(post => (    
                                    <Post key={post.post_id} data={post}/>
                            ))}
                            </div>}
                            
                        </div>
                    </div>:
                    <div>
                    {info && info.user_coupons && info.user_coupons[0] === null ?
                        <p className='text-center'>no hay cupones</p> :
                        <div className='w-[90%] m-auto flex flex-col gap-8 mt-10 '>
                            {info && info.user_coupons && info.user_coupons.map(coupon => (
                                <CuponeraProfile key={coupon.coupon_id} data={coupon} />
                            ))}
                        </div>
                    }
                </div>
                
                    // <CuponeraProfile/>
                }
                </div>
            ))} 
        </div>
        
        
    </div>
  )
}

export default Profile