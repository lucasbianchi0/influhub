import React, { ChangeEvent, FormEvent, useState } from 'react';
import { createUser } from '../apis/postUser';
import { UserModel } from '../types';
import Navbar from '../components/Navbar';
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom';

const Create = (): React.ReactElement => {
    const [user, setUser] = useState<UserModel>({ name: '', lastname: '', description_profile:'', imagepath_profile:null, username:'', password:''});

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('lastname', user.lastname);
        formData.append('description_profile', user.description_profile);
        formData.append('username', user.username);
        formData.append('password', user.password);
        if (user.imagepath_profile) {
            formData.append('image', user.imagepath_profile);
        }
        console.log('formdata')
        console.log(formData)
        try {
            const response = await createUser(formData);
            toast.success('Usuario creado')
            console.log(response);
            setUser({ name: '', lastname: '', description_profile:'', imagepath_profile:null, username:'', password:''});
        } catch (error) {
            toast.error('No se pudo crear el usuario')
            console.error(error);
        }
    };
    

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        console.log(file)
        setUser({
          ...user,
          imagepath_profile: file,
        });
      };

    return (
        <div>
            <Navbar visible={false} title='Influhub'/>
            <Toaster richColors/>
            {/* <h2 className='mt-[100px] text-center text-[26px] font-bold'>Signup</h2> */}
            <form className='mt-12 py-8 rounded-xl w-[70%] m-auto bg-slate-100 flex flex-col justify-center items-center gap-3' onSubmit={onSubmit}>
            <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder='Nombre'
                />
                <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.lastname}
                    onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                    placeholder='Apellido'
                />
                <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.description_profile}
                    onChange={(e) => setUser({ ...user, description_profile: e.target.value })}
                    placeholder='Descripcion'
                />
                <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder='Username'
                />
                <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='Password'
                />


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
                    <p className="text-neutral-500">Selecciona una foto de perfil</p>
                </div>
                
                <button
                    className='bg-mainColor text-white'
                    type="submit">enviar
                </button>
            </form>
            <div className='flex gap-2 mt-5 w-[70%] m-auto items-center justify-center'>
                <p className='text-zinc-500'>¿Tienes una cuenta? </p>
                <Link to='/login' className='text-mainColor'>Iniciar sesion</Link>
            </div>
            
        
        </div>
    );
};

export default Create;
