import React, { ReactElement, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getUsers } from '../apis/getUsers';
import { setUsers } from '../store/features/users.slice';


const Carousel = ():ReactElement => {
    const users = useSelector((state:RootState)=>state.users)
    const dispatch = useDispatch()
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


  const settings = {
    infinite: false,
    speed: 500,
    arrows: false, 
    slidesToShow: 2.5,
    slidesToScroll: 2,
  };

  return (
    <Slider {...settings}>
      {users.map(user => (
        <div className='mt-5  overflow-hidden ' key={user.user_id}>
            <div className=' m-1'>
                <Link key={user.user_id} to={'/profile/'+user.user_id}>
                    <div  className='flex flex-col items-center'>
                        <img className='border w-full h-[150px] rounded-[30px]' src={`http://localhost:3000/uploads/${user.imagepath_profile}`} alt="" />
                        <h3 className='font-medium mt-3'>{user.name} {user.lastname}</h3>
                    </div>
                </Link>
            </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
