import React, { ReactElement,  } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CouponsType, PostsType } from '../types';
interface CategoriesInUsersProps {
    handleClick: (category: string) => void;
    selected: string | null;
    posts: PostsType | null;
    coupons: CouponsType | null;
  }

const CategoriesInUsers = ({ handleClick, selected, posts, coupons }: CategoriesInUsersProps): ReactElement => {
        return (
            <div className='flex justify-center w-[90%] m-auto overflow-hidden gap-4 mt-8 ' >
                
                <div onClick={()=>handleClick('todo')} className={`text-[15px] w-[128px] h-[32px]  rounded-[100px] py-1 px-3 flex justify-center   ${selected === 'todo' ? 'bg-gradient-to-b from-customPurpleStart to-customPurpleEnd text-white' : 'bg-zinc-200 text-zinc-600'} ${!posts || !posts[0] ? 'hidden' : ''}`}>
                    <p className='  '>Todo</p>
                </div>
                <div onClick={()=>handleClick('cuponera')} className={`text-[15px] w-[128px] h-[32px]  rounded-[100px] py-1 px-3 flex justify-center   ${selected === 'cuponera'? 'bg-gradient-to-b from-customPurpleStart to-customPurpleEnd text-white' : 'bg-zinc-200 text-zinc-600'} ${!coupons || !coupons[0] ? 'hidden' : ''}`}>
                    <p className=''>Cuponera</p>
                </div>
            </div>
        );
      };


export default CategoriesInUsers;
