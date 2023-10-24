import React, { useEffect, useState } from 'react'
import { getCouponById, getCoupons } from '../apis/coupons'
import { CouponType } from '../types'

const CuponeraProfile = ({data}:{data:CouponType}) => {
    console.log(data)
    // const [coupons, setCoupons] = useState<CouponsType>([])
    // useEffect(()=>{
    //     const getCouponsFromApi =async ()=>{
    //         try {
    //             const response = await getCoupons()
    //             setCoupons(response)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getCouponsFromApi()
    // },[])

    // const handleClick = async ()=>{
    //     try {
    //         const response = await getCouponById('2')
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //         throw error
    //     }
    // }
  return (
        <div key={data.coupon_id} className='flex bg-zinc-100 shadow-sm p-3 rounded-[20px] gap-6'>
            <img className='h-[94px] w-[101px] rounded-lg' src={`http://localhost:3000/uploads/${data.imagepath_coupon}`} alt="" />
            <div className='flex flex-col' >
                <h3 className='font-semibold text-[16px]  '>{data.title_coupon}</h3>
                <p className='text-zinc-700 '>{data.description_coupon}</p>
                <div className='flex gap-1 mt-3'>
                    {/* <p className='text-zinc-700'>Codigo: </p>
                    <p className='font-medium text-mainColor'>{coupon.code_coupon}</p> */}
                    <div className='py-[2px]  w-full flex justify-center bg-purple-700 rounded-xl text-white '>
                        <p >30% de descuento</p>
                    </div> 
                </div>   
            </div>

        </div>
  )
}

export default CuponeraProfile