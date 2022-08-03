import React, { useState } from 'react'
import Navbar from '../Navbar'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { storage, db } from '../../firebaseConfig/FirebaseConfig.js'
import { collection, getDocs, query, where, addDoc } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import './loginsignupform.css'

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [dob, setDob] = useState();
    const [profilepic, setProfilepic] = useState();
    const [username, setName] = useState();

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const auth = getAuth();
    const navigate = useNavigate();


    const handleProductImg = (e) => {
        let selectedFile = e.target.files[0];
        if(selectedFile){
            setProfilepic(selectedFile)
        }
        else{
            setErrorMsg('please seelct your profile picture')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const storageRef = ref(storage, `profile-images/${Date.now()}`)

            uploadBytes(storageRef,profilepic).then(()=>{
                getDownloadURL(storageRef).then(url=>{
                    addDoc(collection(db,`users`),{
                         email: email,password: password,dob,profimage: url, name:username, uid:user.uid
                    }).then(()=>{
                        setSuccessMsg("user added successfully");
                        setTimeout(() => {
                            setSuccessMsg('');
                            navigate('/login');
                        }, 2000);
                    }).catch((error)=>{
                        setErrorMsg(error.message);
                        setTimeout(() => {
                            setErrorMsg('');
                        },2000);
                    });
                }) 
            }).catch((error)=>{console.log(error.message)})
            
        }).catch((error) => {
            if(error.message == 'Firebase: Error (auth/invalid-email).'|| error.message == 'Firebase: Error (auth/admin-restricted-operation).') {
                setErrorMsg('Please fill all required fields')
            }
            if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                setErrorMsg('User already exists');
            }
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
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
                <h3 className="text-heading">Create an account</h3>
                <h5 id='text'>Already have an account?<Link to='/login'>Login</Link></h5>
            <form className='form-inner'>
                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>{errorMsg}</div>
                </>}
                <input onChange={(e) => setEmail(e.target.value)} type = "email" placeholder="Enter email address"/>
                <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name"/>
                <input onChange={(e) => setPassword(e.target.value)} type = "password" placeholder="Enter password"/>
                <input onChange={(e) => setDob(e.target.value)} type = "date" placeholder="Enter Date Of Birth"/>
                <input onChange={handleProductImg} type = "file" accept="image/jpg, image/png, image/jpeg, image/gif" placeholder='Choose a profile picture'/>
                <button onClick={handleSubmit}>Sign Up</button>
            </form>
            </div>
        </div>
    </div>
    
  )
}

export default Signup