import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import About from './pages/About';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Services from './pages/Services';
import SignUp from './pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import UserDashboard from './pages/user-routes/UserDashboard';
import Privateroute from './components/privateroute';
import ProfileInfo from './pages/user-routes/profile-info';
import PostPage from './pages/PostPage';
import UserProvider from './context/userProvider';
import Categories from './pages/Categories';
import UpdateBlog from './pages/UpdateBlog';


function App() {
  return (
 
    <UserProvider>
    <BrowserRouter> 
    <ToastContainer/>
    <Routes>

    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path ="/about" element={<About/>}/>
    <Route path ="/services" element={<Services/>} />
    <Route path ="/post/:postId" element={<PostPage/>} />
    <Route path="/categories/:categoryId" element={<Categories />} />
    <Route path ="/user" element={<Privateroute/>}>
    <Route path ="dashboard" element={<UserDashboard/>}/>
    <Route path='profile-info/:userId' element={<ProfileInfo/>}/>
    <Route path='update-blog/:blogId' element={<UpdateBlog/>}/>

    </Route>


    </Routes>
    </BrowserRouter>
    </UserProvider>

 
  );
}

export default App;
