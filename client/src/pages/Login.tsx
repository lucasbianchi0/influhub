import React, {  FormEvent, useEffect, useState } from 'react';
import { authProps } from '../types';
import Navbar from '../components/Navbar';
import { login } from '../apis/getUsers';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/features/user.slice';
import { RootState } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner'


const Login = (): React.ReactElement => {
    const [user, setUser] = useState<authProps>({ username:'', password:''});
    const userLogged = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        console.log(user.username)
        try {
            const response = await login(user);
            dispatch(loginUser(response))
            console.log(response);
            
        } catch (error) {
            toast.error('Error en la contrasena')
            console.error(error);
        }
    };
  
    useEffect(()=>{
        console.log(userLogged)
        if(userLogged.length ===0){
            console.log('no esta logueado')
        }else{
            navigate('/')
        }

    },[userLogged,navigate])

    return (
        <div>
            <Navbar visible={false} title='Influhub'/>
            <Toaster richColors/>
            {/* <h2 className='mt-[100px] text-center text-[26px] font-bold'>Signup</h2> */}
            <form className='mt-12 py-8 rounded-xl w-[70%] m-auto bg-slate-100 flex flex-col justify-center items-center gap-3' onSubmit={onSubmit}>
              <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder='Nombre'
                />
                <input
                    className='py-2 px-3 rounded-sm border border-zinc-300'
                    type="text"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder='Apellido'
                />
                
                <button
                    className='bg-mainColor text-white'
                    type="submit">enviar
                </button>
            </form>
            <div className='flex gap-2 mt-5 w-[70%] m-auto items-center justify-center'>
                <p className='text-zinc-500'>¿No tienes una cuenta? </p>
                <Link to='/signup' className='text-mainColor'>Registrate</Link>
            </div>
        
        </div>
    );
};

export default Login;
