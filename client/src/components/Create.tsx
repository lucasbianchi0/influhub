import React, { ChangeEvent, FormEvent, useState } from 'react';
import { createUser } from '../apis/postUser';
import { UserModel } from '../types';
import axios from 'axios';
import Navbar from './Navbar';

const Create = (): React.ReactElement => {
    const [user, setUser] = useState<UserModel>({ name: '', lastname: '', description_profile:'', imagepath_profile:null, username:'',password:'' });
    const [foto, setFoto] = useState< UserModel | null>(null);

    
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('lastname', user.lastname);
        formData.append('description_profile', user.description_profile);
        if (user.imagepath_profile) {
            formData.append('image', user.imagepath_profile);
        }
        
        try {
            const response = await createUser(formData);
            console.log(response);
            setUser({ name: '', lastname: '', description_profile:'', imagepath_profile:null, username:'',password:'' });
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setUser({
          ...user,
          imagepath_profile: file,
        });
      };
    
    const getfoto = async()=>{
        try{ 
            const response =await axios.get('http://localhost:3000/profile/28')
            if (response.data.length > 0) {
                const imagepath_profile = response.data[0].imagepath_profile;
                const name = response.data[0].name;
                const lastname = response.data[0].lastname;
                const description_profile = response.data[0].description_profile;
                console.log(imagepath_profile);
                setFoto({ imagepath_profile,name,lastname,description_profile });
              } else {
                console.log('No se encontraron datos de imagen');
              }
        }catch(err){
            console.log(err)
            throw err
        }
    }

    return (
        <div>
            <Navbar title='Influhub'/>
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
                {/* <button type="button" onClick={clearForm}>Limpiar</button> */}
                {/* <button
                    className='bg-mainColor text-white'
                    onClick={()=>console.log(user)}>
                    ver usuario
                </button> */}
            </form>
            <div>
                <button
                    className='bg-mainColor text-white'
                    onClick={getfoto}>
                    pedir foto
                </button>
                {foto && 
                <div>
                    <img src={`http://localhost:3000/uploads/${foto.imagepath_profile}`} alt="" />
                    <p>{foto.name}</p>
                    <p>{foto.description_profile}</p>
                </div>
                }
            </div>
        </div>
    );
};

export default Create;
