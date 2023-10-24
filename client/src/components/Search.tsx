import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BtnGoBack from './BtnGoBack';
import { BiSearch } from 'react-icons/bi';
const Search = ():React.ReactElement => {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [hiddenIcon, setHiddenIcon] = useState<boolean>(true)

    const onSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const handleClick =()=>{
        setOpen(!open)
        
        
    }
    useEffect(()=>{
        if(location.pathname === '/search'){
            setHiddenIcon(false)
        }else{
            setHiddenIcon(true)
        }
    },[location])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (searchQuery.trim() !== '') {
                    setOpen(!open)
                    navigate('/searched/' + searchQuery);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchQuery, navigate,open]);
    
  return (
    <div className={`w-full pt-5 ${open?  'top-0 h-screen bg-zinc-200': null}  `}>
        <div  className='flex items-center  w-[95%] m-auto gap-1'>
            <div className={`${open? 'hidden':null} ${!hiddenIcon? 'hidden':null}`}>
                <BtnGoBack visible={true} color='black' navigateTo={-1}/>
            </div>
            <div className='flex w-full rounded-full px-4 py-2 bg-white drop-shadow-md gap-2 items-center '>
                <BiSearch size={20} color='gray ' />
                <input
                    type='text'
                    onChange={onSearchQueryChange}
                    placeholder='Buscar...'
                    className='w-full    focus:outline-none '
                    onClick={()=>setOpen(!open)}
                />
            </div>
            
            <button onClick={handleClick} className={`bg-transparent p-1 text-black ${open? 'visible': 'hidden'}`} >
                cancelar
            </button>
        </div>
    
  </div>
  )
}

export default Search