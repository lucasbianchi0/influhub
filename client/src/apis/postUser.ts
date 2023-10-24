import axios from "axios";
import { UserModel } from "../types";

export const createUser = async (formData:UserModel): Promise<string> => {
    try{
        console.log(formData)
        const response = await axios.post('http://localhost:3000/auth/signup',  formData);
        return response.data.message; 
    }catch(err){
        console.log(err)
        throw err
    }
};

