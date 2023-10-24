import { ReactElement } from 'react';
import { BiSearch, BiSolidUserCircle, BiSolidHome } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoAddSharp } from "react-icons/io5";

const TabBar= ():ReactElement => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className=' bg-transparent  fixed  bottom-0 w-full z-20'>
            <div className='flex  shadow-black-10px-50-0 border rounded-t-[40px] justify-around  py-5 bg-white mt-4'>
                <div onClick={() => navigate('/')}>
                    <BiSolidHome size={30} color={isActive('/') ? 'purple' : 'black'} />
                </div>
                <div onClick={() => navigate('/search')}>
                    {/* <i className="ci-Play_Circle"></i> */}


                    <BiSearch size={30} color={isActive('/search') ? 'purple' : 'black'} />
                </div>
                <div onClick={() => navigate('/create')}>
                    <IoAddSharp color={isActive('/create') ? 'purple' : 'black'} size={30} />
                </div>
                <div>
                    <IoIosNotificationsOutline size={30} color={isActive('/notifications') ? 'purple' : 'black'} />
                </div>
                <div onClick={() => navigate('/profile')}>
                    <BiSolidUserCircle color={isActive('/profile') ? 'purple' : 'black'} size={30} />
                </div>
            </div>
        </div>
    );
};

export default TabBar;
