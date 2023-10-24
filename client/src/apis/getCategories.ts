import axios from 'axios'
import {CategoriesType, CategoryModel} from '../types'


export const getCategories = async (): Promise<CategoriesType> => {
    try {
        const response = await axios.get<CategoriesType>('http://localhost:3000/categories');
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};

export const getCategoryById = async (id:string|null): Promise<CategoriesType> => {
    try {
        const response = await axios.get<CategoriesType>('http://localhost:3000/category/'+id);
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};


export const createCategory = async (formData:CategoryModel): Promise<string> => {
    try{
        const response = await axios.post('http://localhost:3000/create-category',  formData);
        return response.data; 
    }catch(err){
        console.log(err)
        throw err
    }
};

