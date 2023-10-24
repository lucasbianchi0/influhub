import React, { ChangeEvent, FormEvent, useState } from 'react';
import { CategoryModel } from '../types';
import { createCategory } from '../apis/getCategories';

const CreateCategory = (): React.ReactElement => {
    const [category, setCategory] = useState<CategoryModel>({title:'', imagepath_category:null});

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', category.title);
        if (category.imagepath_category) {
            formData.append('image', category.imagepath_category);
        }
        
        try {
            const response = await createCategory(formData);
            console.log(response);
            setCategory({title:'',imagepath_category:null});    
        }catch(error) {
            console.error(error);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setCategory({
          ...category,
          imagepath_category: file,
        });
      };

    return (
        <div className='bg-zinc-100 h-screen'>
            <div className='w-[70%] m-auto'>
                <h2 className=' pt-10 text-[22px] font-bold'>Agrega una nueva Categoria</h2>
                <form className='flex flex-col gap-4 mt-7' onSubmit={onSubmit}>
                    <input
                        className='py-1 px-3  rounded-lg drop-shadow-xl'
                        type="text"
                        value={category.title}
                        onChange={(e) => setCategory({ ...category, title: e.target.value })}
                        placeholder='titulo categoria'
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
                        <p className="text-neutral-500">Selecciona una foto para la categoria</p>
                    </div>
                    
                    <button
                        className='bg-mainColor text-white'
                        type="submit">enviar
                    </button>
                    {/* <button type="submit">enviar</button>
                    <button type="button" onClick={clearForm}>Limpiar</button> */}
                </form>
            </div>
        </div>
    );
};

export default CreateCategory;
