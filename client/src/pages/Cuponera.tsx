import React, { useEffect, useState } from 'react'
import { getCouponById, getCoupons } from '../apis/coupons'
import { CouponsType } from '../types'

const Cuponera = () => {
    const [coupons, setCoupons] = useState<CouponsType>([])
    useEffect(()=>{
        const getCouponsFromApi =async ()=>{
            try {
                const response = await getCoupons()
                setCoupons(response)
            } catch (error) {
                console.log(error)
            }
        }
        getCouponsFromApi()
    },[])

    const handleClick = async ()=>{
        try {
            const response = await getCouponById('2')
            console.log(response)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
  return (
    <div>
        <div className='w-[90%] m-auto flex flex-col gap-3 '>
            {coupons.map(coupon=>(
                <div key={coupon.coupon_id} className='flex bg-zinc-200 shadow-xl p-3 rounded-xl gap-6'>
                    <img className='h-auto w-[80px] rounded-lg' src={`http://localhost:3000/uploads/${coupon.imagepath_coupon}`} alt="" />
                    <div className='flex flex-col' >
                        <h3 className='font-semibold text-[16px]  '>{coupon.title_coupon}</h3>
                        <p className='text-zinc-800 text-[14px]'>{coupon.description_coupon}</p>
                        <div className='flex gap-1 mt-3'>
                            {/* <p className='text-zinc-700'>Codigo: </p>
                            <p className='font-medium text-mainColor'>{coupon.code_coupon}</p> */}
                            <p className='py-[1px] px-2 bg-mainColor rounded-md text-white text-[14px]'>30% de descuento</p>
                        </div>   
                    </div>
                </div>
            ))}

        </div>
        <button onClick={handleClick}>traer cupon id</button>
    </div>
  )
}

export default Cuponera