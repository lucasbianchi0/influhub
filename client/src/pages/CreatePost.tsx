import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PostModel } from '../types';
import { createPost } from '../apis/getPosts';
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Toaster, toast } from 'sonner'

const CreatePost = (): React.ReactElement => {
    const userLogged = useSelector((state:RootState)=>state.user)
    const [create, setCreate] = useState<boolean>(false)
    const navigate = useNavigate()
    const [post, setPost] = useState<PostModel>
        ({  
            title_post:'',
            description_post: '',
            category_id: '',
            user_id: '',
            imagepath_post:null,
            brand_post:''
        });

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title_post', post.title_post);
        formData.append('description_post', post.description_post);
        formData.append('category_id', post.category_id.toString());
        formData.append('user_id', userLogged[0].user_id.toString());
        formData.append('brand_post', post.brand_post);
        if (post.imagepath_post) {
            formData.append('image', post.imagepath_post);
        }
        
        try {
            const response = await createPost(formData);
            console.log(response);
            setPost({  
                title_post:'',
                description_post: '',
                category_id: '',
                user_id: userLogged[0].user_id,
                imagepath_post:null,
                brand_post:''
            });    
            toast.success('uploaded post ')
        }catch(error) {
            toast.error('it was not possible to upload the post')
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
        setPost({
          ...post,
          imagepath_post: file,
        });
      };
    return (
        <div className='bg-zinc-100 min-h-screen'>
             <Toaster richColors />
            <div className='pt-7 pl-3'>
                <IoChevronBackSharp  size={30} onClick={()=>navigate(-1)}/>
            </div>
            {!create?
                <div className='flex flex-col justify-center items-center w-[70%] m-auto mt-12'>
                    <p className='font-semibold '>Registrate para subir posts</p>
                    <button className='bg-mainColor mt-2 text-white rounded-lg' onClick={()=>navigate('/signup')}>Registrarse</button>
                </div>:
                <div className='w-[70%] m-auto'>
                    <h2 className=' pt-5 text-[22px] font-bold'>Agrega un nuevo Post</h2>
                    <form className='flex flex-col gap-4 mt-7' onSubmit={onSubmit}>

                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={post.title_post}
                            onChange={(e) => setPost({ ...post, title_post: e.target.value })}
                            placeholder='titulo'
                        />
                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={post.description_post}
                            onChange={(e) => setPost({ ...post, description_post: e.target.value })}
                            placeholder='descripcion '
                        />
                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={post.brand_post}
                            onChange={(e) => setPost({ ...post, brand_post: e.target.value })}
                            placeholder='brand '
                        />
                        <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={post.category_id}
                            onChange={(e) => setPost({ ...post, category_id: e.target.value })}
                            placeholder='category id'
                        />
                        {/* <input
                            className='py-1 px-3  rounded-lg drop-shadow-xl'
                            type="text"
                            value={post.user_id}
                            onChange={(e) => setPost({ ...post, user_id: e.target.value })}
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
                            <p className="text-neutral-500">Selecciona una foto para el post</p>
                        </div>
                        <button
                            className='bg-mainColor drop-shadow-md text-white'
                            type="submit">enviar
                        </button>
                    </form>
                </div>
                }
        </div>
    );
};

export default CreatePost;
