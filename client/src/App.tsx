
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostPage from './pages/PostPage'
import Category from './pages/Category'
import Signup from './pages/Signup'
import Users from './pages/Users'
import CreateCategory from './components/CreateCategory'
import CreatePost from './pages/CreatePost'
import Results from './pages/Results'
import UploadProduct from './components/Uploads'
import SearchPage from './pages/SearchPage'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import EditProfile from './pages/EditProfile'
import Settings from './pages/Settings'
import Cuponera from './pages/Cuponera'
import CreateCoupon from './pages/CreateCoupon'
import Create from './pages/Create'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/uploads' element={<UploadProduct/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/create-category' element={<CreateCategory/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/create-coupon' element={<CreateCoupon/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/cuponera' element={<Cuponera/>}/>
          <Route path='/searched/:search' element={<Results/>}/>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user' element={<UserProfile/>}/>
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/category/:id' element={<Category/>}/>      
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


function NotFound() {
  return <h1>404 - Página no encontrada</h1>;
}










export default App
