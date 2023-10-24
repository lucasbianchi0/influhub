import axios from 'axios'
import {UserInfo, UsersType, authProps} from '../types'


export const getUsers = async (): Promise<UsersType> => {
    try {
        const response = await axios.get<UsersType>('http://localhost:3000/users');
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};

export const getUserById = async (id:string|number|null): Promise<UsersType> => {
    
    try {
        const response = await axios.get<UsersType>('http://localhost:3000/profile/'+id);
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};



export const updateUserById = async (formData: FormData): Promise<UserInfo> => { 
    try {
        const userId = (formData.get('id') || '').toString();
        const response = await axios.put(`http://localhost:3000/edit-user/${userId}`, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};





export const login = async ({username,password}:authProps): Promise<UsersType> => {
    console.log(username,password)
    try {
        const response = await axios.post<UsersType>('http://localhost:3000/auth/login',{username,password},{withCredentials:true});
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log('Hubo un error: ' + err);
        throw err;
    }
};


