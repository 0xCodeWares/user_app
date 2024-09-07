import logo from './logo.svg';
import './App.css';
import { initDB } from "react-indexed-db-hook";
import { DBConfig } from "./config/DBConfig";
import Login from './pages/login';
import Signup from './pages/signup';
import UserList from './pages/userlist';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { useEffect } from 'react';

initDB(DBConfig);
function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

function MainRoutes() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    console.log(location.pathname)
    if (user === null  ) {
      if(location.pathname !== "/signup"){
        navigate("/login")
      }
    }
    else {
      navigate("/userlist")
    }
  },[user])
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/userlist"
        element={
         
            <UserList />
        }
      />
    </Routes>
  )

}

export default App;
