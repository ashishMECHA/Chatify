import React, { useState } from 'react'
import Navbar from '../Navbar'
import './loginsignupform.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'



const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [dob, setDob] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password) 
        .then((userCredential) => {
            const user = userCredential.user;
            setTimeout(() => {
                setSuccessMsg("Logged in successfully")
                navigate("/mainpage");
            },2000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            if(errorMessage == 'Firebase: Error (auth/wrong-password).') {
                setErrorMsg("Wrong Password")
            }
            if(errorMessage == 'Firebase: Error (auth/invalid-email).') {
                setErrorMsg("Invalid Email")
            }
            if(errorMessage == 'Firebase: Error (auth/user-not-found).') {
                setErrorMsg("User not registered, Please sign up first")
            }
            if(errorMessage == 'Firebase: Error (auth/missing-email).' || errorMessage == 'Firebase: Error (auth/Internal-error).' ) {
                setErrorMsg("Fields can't be empty")
            }
            setTimeout(() => {
                setErrorMsg('');
            }, 4000);
        })
    }

  return (
    <div>
        {/* <Navbar /> */}
        <div className='form-outermost'>
            {/* <h1>Signup</h1> */}
            <div className="left-container">
                
            </div>
            <div className='right-container'>
                <h3 className="text-heading">Log in to Chatify</h3>
                <h5 id='text'>Don't have an account?<Link to='/signup'>Sign up now</Link></h5>
            <form className='form-inner'>
                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>{errorMsg}</div>
                </>}
                <input onChange={(e) => setEmail(e.target.value)} type = "email" placeholder="Enter email address"/>
                <input onChange={(e) => setPassword(e.target.value)} type = "password" placeholder="Enter password"/>
                <button onClick={handleSubmit}>Log In</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Login