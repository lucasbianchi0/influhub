import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {getCategories} from '../apis/getCategories.ts';
// import { CategoriesType } from '../types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { setCategories } from '../store/features/categories.slice.ts';

const CategorySlider = ():React.ReactElement => {
  const dispatch = useDispatch()
  const categories = useSelector((state:RootState)=>state.categories)
  // const [categories, setCategories] = useState<CategoriesType>([])
  useEffect(() => {
    const getCategoriesFromApi =async()=>{
      const response = await getCategories()
      dispatch(setCategories(response))
    }
    getCategoriesFromApi()
    
  }, [dispatch])
  

  const settings: SliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <div >
      <Slider {...settings}>
        {categories.map((category) => (
          <Link className='overflow-hidden' key={category.category_id} to={'/category/'+category.category_id}>
            <div className='flex flex-col items-center'>
              <div className='bg-zinc-300 rounded-[50%] w-16 h-16 flex justify-center items-center '>
                {/* <p>{category.title}</p> */}
                <img className='rounded-[50%] w-16 h-16' src={`http://localhost:3000/uploads/${category.imagepath_category}`} alt="" />
              </div> 
              <p className='mt-2 text-[14px] text-center'>{category.title}</p>
              </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;

interface SliderSettings {
  slidesToShow: number;
  slidesToScroll: number;
  infinite: boolean;
  responsive: {
    breakpoint: number;
    settings: {
      slidesToShow: number;
    };
  }[];
}
