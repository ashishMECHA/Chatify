import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Signup from './Components/login-signup-components/Signup';
import Login from './Components/login-signup-components/Login';
import Mainpage from './Components/Mainpage';
import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { db, auth } from './firebaseConfig/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import FOF from './Components/FOF';


function App() {

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [user, setUser] = useState('');
  
  function GetCurrentUser(){
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if(userlogged){
          const getUser = async () =>{
            const q = query(collection(db,"users"),where("uid", "==", userlogged.uid))
            const data = await getDocs(q);
            setUser(data.docs.pushmap((doc)=>({...doc.data(),id:doc.id})))
          };
          getUser();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user
  }
  GetCurrentUser();

  return (
    <div>
      {user?<div>
        <BrowserRouter>
          <Routes>
            <Route path = '/signup' element={<Signup/>}/>
            <Route path = '/login' element={<Login/>}/>
            <Route path = '/mainpage' element={<Mainpage userdata={user}/>}/>
            <Route path = '/' element={<Mainpage userdata={user}/>}/>
            <Route path = '/*' element={<FOF/>}/>
            
          </Routes>
        </BrowserRouter>
      </div> :
      <div>
        <BrowserRouter>
          <Routes>
            <Route path = '/signup' element={<Signup/>}/>
            <Route path = '/login' element={<Login/>}/>
            <Route path = '/*' element={<Login/>}/>
          
          </Routes>
        </BrowserRouter>
        </div>}
    </div>
  );
}

export default App;
