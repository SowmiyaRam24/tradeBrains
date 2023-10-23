import React from 'react';
import  { useContext ,useEffect} from "react";
import Home from './components/Home';
import Watchlist from './components/Watchlist'
import AuthForm from './Athentication/AthenticationForm';
import { Routes,Route,useNavigate,Navigate} from 'react-router-dom';
import AuthContext from './Athentication/AuthenContext'
export default function App() {
  const authCtx= useContext(AuthContext);
  const navigate=useNavigate();
  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/");
    }
  }, [authCtx.isLoggedIn]);
  return (
    <>
    <Routes>
    <Route path="/" exact  element={<AuthForm/>}/>
     <Route path="/home"   element={ authCtx.isLoggedIn?<Home/>:<Navigate to="/"/>}/>
     <Route path="/Watchlist"  element={ authCtx.isLoggedIn?<Watchlist/>:<Navigate to="/"/>}/>
     </Routes>
    </>
  )
}




