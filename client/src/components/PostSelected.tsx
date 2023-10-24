
import { Link, useNavigate } from "react-router-dom";
import { PostType } from "../types";
import BtnGoBack from "./BtnGoBack";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { deletePost } from "../apis/getPosts";
import DeleteModal from "./DeleteModal";


interface Props {
  info: PostType | null; 
}

const PostSelected = ({ info }: Props) => {
  const navigate = useNavigate()
  
  const [matchUser, setMatchUser] = useState(false)
  const [deleteState, setDeleteState] = useState(false)

  const userLogged = useSelector((state:RootState)=>state.user)

  useEffect(()=>{
    console.log(matchUser)
    if(userLogged[0]?.user_id === info?.user_id){
      setMatchUser(true)
    }else{
      setMatchUser(false)
    }
  },[userLogged,info, matchUser])
  console.log(info)

  const handleDelete = async(id:number)=>{
    try{
      const response = await deletePost(id)
      console.log(response)
      navigate(-1)
      
    }catch(err){
      console.log(err)
    }
  }

  const handleCancel =()=>{
    setDeleteState(!deleteState)
  }
  


  if (!info) {
    return null; // Si info es null, no renderizamos nada
  }


  return (
    <div className='w-[100%] min-h-screen bg-zinc-100 m-auto pb-[70px]'>
      {deleteState && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <DeleteModal handleDelete={()=>handleDelete(info.post_id)} handleCancel={handleCancel}/>
        </div>
      )}
      
      <div className='relative bg-white'>
        <img className='w-full h-[550px]' src={`http://localhost:3000/uploads/${info.imagepath_post}`} alt="" />
        <div className='absolute top-4 left-4 bg-zinc-200 w-[40px] p-1 rounded-[50%] flex items-center justify-center'>
          <BtnGoBack visible={true} color='black' navigateTo={-1}/>
        </div>

        {matchUser? 
        <div className='absolute top-4 right-4 bg-zinc-200 h-[40px] w-[40px] p-1 rounded-[50%] flex items-center justify-center'>
          <TiDeleteOutline
          onClick={()=>setDeleteState(!deleteState)}
          //  onClick={()=>handleDelete(info?.post_id)}  

           size={30} color='black'/>
        </div>:null}
       

      </div>
      <div className={`bg-zinc-100 border-t border-zinc-200 rounded-t-[50px] translate-y-[-25px] `}>
        <div className='w-[85%] m-auto flex flex-col gap-1 pt-5 '>
          <h3 className='text-[22px] font-poppins font-bold text-center'>{info.title_post}</h3>
          <p className="text-mainColor text-center">{info.brand_post}</p>
          {/* <Link className="text-mainColor" to='https://www.mercadolibre.com.ar/mouse-vertical-trust-verto-ergonomic-negro/p/MLA13875541#polycard_client=recommendations_home_navigation-recommendations&reco_backend=machinalis-homes-pdp-boos&reco_client=home_navigation-recommendations&reco_item_pos=1&reco_backend_type=function&reco_id=c7961e10-a2e9-49a2-a283-32738d860fd5'>Conseguilo en este link</Link> */}
          <Link to={`/profile/${info.user_id}`} className='mt-2 flex items-center  gap-4'>
              <img className=' w-[50px] h-[50px] rounded-full shadow-2xl' src={`http://localhost:3000/uploads/${info.imagepath_profile}`} alt="" />
              <p className='text-[18px] text-zinc-800 font-semibold'>{info.username}</p>
          </Link>  
          <div className="mt-2 w-[85%] m-auto">
            <p className='text-[16px] text-zinc-700 leading-1 font-semiBold   '>{info.description_post}</p>
          </div>
          {/* <p className='font-semiBold'>Brand: {info.brand_post}</p> */}
          <button  className="mt-4 mx-auto w-[156px] text-center h-[39px] bg-gradient-to-b from-customPurpleStart to-customPurpleEnd text-white rounded-2xl py-1">Ir a comprar</button>
        </div>
      </div>
      
                
    </div>
  )
}

export default PostSelected