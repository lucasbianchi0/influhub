import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { CouponModel } from '../types';
import { createCoupon } from '../apis/coupons';
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Toaster, toast } from 'sonner'
import { CouponModel } from '../types';

const CreateCoupon = (): React.ReactElement => {
    const userLogged = useSelector((state:RootState)=>state.user)
    const [create, setCreate] = useState<boolean>(false)
    const navigate = useNavigate()
    const [coupon, setCoupon] = useState<CouponModel>
        ({  
            title_coupon:'',
            description_coupon: '',
            user_id: '',
            code_coupon:'',
            imagepath_coupon:null,

        });

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title_coupon', coupon.title_coupon);
        formData.append('description_coupon', coupon.description_coupon);
        formData.append('code_coupon', coupon.code_coupon);
        formData.append('user_id', userLogged[0].user_id.toString());
        
        if (coupon.imagepath_coupon) {
            formData.append('image', coupon.imagepath_coupon);
        }
        
        try {
            console.log('1')
            console.log(coupon)
            console.log([...formData.entries()]);

            const response = await createCoupon(formData);
            console.log(response);
            setCoupon({  
                title_coupon:'',
                description_coupon: '',
                user_id: userLogged[0].user_id,
                imagepath_coupon:null,
                code_coupon:''
            });    
            toast.success('uploaded coupon ')
        }catch(error) {
            toast.error('it was not possible to upload the coupon')
            console.error(error);
        }
    };
    
    useEffect(()=>{
        if (userLogged.length> 0){
            console.log(userLogged)
            setCreate(true)
        }
    },[userLogged])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setCoupon({
          ...coupon,
          imagepath_coupon: file,
        });
      };
    return (
        <div className='bg-zinc-100 min-h-screen'>
             <Toaster richColors />
            <div className='pt-7 pl-3'>
                <IoChevronBackSharp  size={30} onClick={()=>navigate(-1)}/>
            </div>
            {/* {!create?
                <div className='flex flex-col justify-center items-center w-[70%] m-auto mt-12'>
                    <p className='font-semibold '>Registrate para subir Coupons</p>
                    <button className='bg-mainColor mt-2 text-white rounded-lg' onClick={()=>navigate('/signup')}>Registrarse</button>
                </div>: */}
                <div className='w-[70%] m-auto'>
                    <h2 className=' pt-5 text-[22px] font-bold'>Agrega un nuevo coupon</h2>
                    <form className='flex flex-col gap-4 mt-7' onSubmit={onSubmit}>

                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={coupon.title_coupon}
                            onChange={(e) => setCoupon({ ...coupon, title_coupon: e.target.value })}
                            placeholder='titulo'
                        />
                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={coupon.description_coupon}
                            onChange={(e) => setCoupon({ ...coupon, description_coupon: e.target.value })}
                            placeholder='descripcion '
                        />
                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={coupon.code_coupon}
                            onChange={(e) => setCoupon({ ...coupon, code_coupon: e.target.value })}
                            placeholder='code '
                        />

                        {/* <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={coupon.user_id}
                            onChange={(e) => setCoupon({ ...coupon, user_id: e.target.value })}
                            placeholder='user id'
                        /> */}
                        <div className="relative w-full bg-white rounded-md border-dashed border-2 border-neutral-500 p-6 text-center cursor-pointer">
                            <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                            />
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-6 w-6 text-neutral-500 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                            </svg>
                            <p className="text-neutral-500">Selecciona una foto para el coupon</p>
                        </div>
                        <button
                            className='bg-mainColor drop-shadow-md text-white'
                            type="submit">enviar
                        </button>
                    </form>
                </div>
                {/* } */}
        </div>
    );
};

export default CreateCoupon;
