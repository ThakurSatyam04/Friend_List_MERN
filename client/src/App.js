import { Route, Routes } from "react-router-dom/dist";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import AddUserForm from "./components/AddUserForm";
import Users from "./components/Users"
import EditUserForm from "./components/EditUserForm";

const App = () => {
  return (
    <div>
      <div className="bg-slate-900">
        <Navbar/>
      </div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/AddUserForm' element={<AddUserForm/>}/>
        <Route path='/EditUserForm/:userId' element={<EditUserForm/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
    </div>
  )
};

export default App;
