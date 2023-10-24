import { useDispatch, useSelector } from "react-redux"
import Navbar from "../components/Navbar"
import { RootState } from "../store/store"
import { ChangeEvent, FormEvent, useState } from "react"
import { UserInfo } from "../types"
import { updateUserById } from "../apis/getUsers"
import { useNavigate } from "react-router-dom"
import { updateUser } from "../store/features/user.slice"
import { Toaster, toast } from 'sonner'


const EditProfile = () => {
    const userLogged = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch()
    const [editPhoto, setEditPhoto] = useState(false)
    const [updateInfo, setUpdateInfo] = useState<UserInfo>({
        user_id:userLogged[0]?.user_id,
        name: userLogged[0]?.name || '',
        lastname: userLogged[0]?.lastname || null,
        imagepath_profile: userLogged[0]?.imagepath_profile || null,
        description_profile: userLogged[0]?.description_profile || '',
        username: userLogged[0]?.username || '',
        password: userLogged[0]?.password || null,
      });


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    console.log(file)
    if (file instanceof File) {
        console.log(file);
        setUpdateInfo({
            ...updateInfo,
            imagepath_profile: file,
        });
    }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        console.log(updateInfo.lastname)
        const formData = new FormData();
        formData.append('id', updateInfo.user_id.toString() );
        formData.append('name', updateInfo.name||'');
        formData.append('lastname', updateInfo.lastname||'');
        formData.append('description_profile', updateInfo.description_profile);
        formData.append('username', updateInfo.username);
        formData.append('password', updateInfo.password||'') ;
        if (updateInfo.imagepath_profile instanceof File) {
            formData.append('image',updateInfo.imagepath_profile);
        }
        console.log([...formData.entries()]);
        try {
            console.log('sale de edit profile')
            console.log('updateInfo')
            console.log(updateInfo)

            const userUpdated = await updateUserById(formData);
            dispatch(updateUser(userUpdated))
            console.log("Usuario actualizado correctamente", userUpdated);
            toast.success('User updated')
            
        } catch (error) {
            toast.error('User hasnt been updated')
            console.error("Error al actualizar el usuario:", error);
        }
    }

    

  return (
    <div>
        <Navbar visible={true} title='Edit profile'/>
        <Toaster richColors />
        <div className="pt-14 w-[90%] m-auto ">
            <div>
                <img src={`http://localhost:3000/uploads/${updateInfo.imagepath_profile}`} alt="" />
                <button onClick={()=>setEditPhoto(!editPhoto)} className="bg-zinc-200">editar foto</button>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                {editPhoto?
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    :null
                }

                <div className="flex gap-3 border-b border-gray-300 py-2 ">
                    <label htmlFor="nombre">Nombre:</label>
                    <input 
                        className="outline-none"
                        onChange={(e)=>setUpdateInfo({...updateInfo, name:e.target.value})}
                        value={updateInfo?.name} type="text" id="nombre" placeholder="nombre" />

                </div>
                <div className="flex gap-3 border-b border-gray-300 py-2">
                    <label htmlFor="username">Nombre <br/> de Usuario:</label>
                    <input 
                        className="outline-none"
                        onChange={(e)=>setUpdateInfo({...updateInfo, username:e.target.value})}
                        value={updateInfo.username} type="text" id="username" placeholder="username" />
                </div>
                <div className="flex gap-3 border-b border-gray-300 py-2">
                    <label htmlFor="description">Descripción:</label>
                    <input 
                        className="outline-none"
                        onChange={(e)=>setUpdateInfo({...updateInfo, description_profile:e.target.value})}
                        value={updateInfo?.description_profile } type="text" id="description" placeholder="description" />
                </div>
                <button type="submit" className="bg-mainColor text-white mt-10">Enviar</button>
            </form>
        </div>


    </div>
  )
}

export default EditProfile