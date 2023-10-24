import  React, { useEffect } from 'react'
import { getUsers } from '../apis/getUsers'
// import { UsersType } from '../types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../store/features/users.slice'
import { RootState } from '../store/store'

const Users = ():React.ReactElement => {
    const dispatch = useDispatch()
    const users = useSelector((state: RootState) => state.users);
    // const [users, setUsers] = useState< UsersType|null>(null)
    useEffect(()=>{
        const getUsersFromApi = async ()=>{
            try{
                const response = await getUsers()
                dispatch(setUsers(response))
            }catch(err){
                console.log(err)
                throw err
            }
        }
        getUsersFromApi()
    },[dispatch])
    

 
  return (
    <div className='w-[90%] m-auto'>
        <h2 className='mt-8 text-[18px] font-medium'>Some Influencers</h2>
        <div className='mt-[30px]  grid grid-cols-2 gap-4 '>
            {users?.map(user=>(
                <Link key={user.user_id} to={'/profile/'+user.user_id}>
                    <div  className=''>
                        <img className='rounded-[30px]' src={`http://localhost:3000/uploads/${user.imagepath_profile}`} alt="" />
                        <h3 className='font-medium'>{user.name} {user.lastname}</h3>
                        <p className='text-mainColor'>{user.user_id}</p>
                    </div>
                </Link>
        
            ))}
        </div>
    </div>
  )
}

export default Users