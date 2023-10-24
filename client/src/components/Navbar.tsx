import React from 'react'
import BtnGoBack from './BtnGoBack'


const Navbar = ({ title, visible }: { title: string,visible:boolean }): React.ReactElement => {
  return (
    <div className='bg-mainColor h-[80px] w-full flex items-center justify-between px-4'>
      <BtnGoBack visible={visible} color='white' navigateTo={-1} />
      <p className='font-bold text-white text-[22px] flex-grow text-center'>{title}</p>
      <div className='w-8'></div>
    </div>
  )
}

export default Navbar;
