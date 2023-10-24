import Navbar from '../components/Navbar'
import CategorySlider from '../components/CategorySlider'
// import Users from './Users'
import Posts from './Posts'
import TabBar from '../components/TabBar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useEffect } from 'react'
import Carousel from '../components/UsersSlider'


const Home = ():React.ReactElement => { 
  const user =useSelector((state:RootState)=>state.user)
  useEffect(()=>{
    // console.log(user)

  },[user])

    return (
        <>
        <div className=' bg-zinc-50  '>
        <TabBar/>
          {/* <Navbar visible={false} title='influhub'/> */}
          {/* <div className='bg-mainColor '> */}
          <div className='bg-gradient-to-b  from-customPurpleStart to-customPurpleEnd h-[160px]  flex justify-center '>
            <p className=' text-[24px] text-white font-bold pt-8'>Influhub</p>
        </div>
            <div className='bg-zinc-50 translate-y-[-70px]  rounded-t-[50px] pt-[15px]'>
              <div className='mt-4  w-[85%] m-auto'>
                <CategorySlider/>
              </div>
              
              {/* //------------------------------------ f -----------------------------------  */}
              <Posts/>
              <div className=''>
              
                <div className='w-[95%] py-3 mb-12  m-auto'>  
                  <h2 className='mt-8 text-[18px] font-medium'>Some Influencers</h2>
                  <Carousel />
                </div>
              </div>
              
              {/* <Users/> */}
            {/* </div> */}
          </div>
          
          
        </div>
    
        </>
      )
    }

export default Home