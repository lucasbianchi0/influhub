import axios from "axios"
import { CouponsType } from "../types"


export const getCoupons = async():Promise<CouponsType>=>{
    try {
        const response = await axios.get<CouponsType>('http://localhost:3000/coupons')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getCouponById = async(id:string):Promise<CouponsType>=>{
    try {
        const response = await axios.get<CouponsType>('http://localhost:3000/coupons/'+id)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const createCoupon = async(formData:FormData):Promise<CouponsType>=>{
    console.log([...formData.entries()]);
    
    try {
        const response = await axios.post('http://localhost:3000/create-coupon',formData)
        console.log('2')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteCoupons = async(id:string)=>{
    try {
        const response = await axios.delete('http://localhost:3000/delete-coupon/'+id)
        return response
    } catch (error) {
        console.log(error)
        throw error
    }
}