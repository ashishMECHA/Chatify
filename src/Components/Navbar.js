import React from 'react'
import './Navbar.css'
import mainlogo from './assets/logo.png';
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
        <nav>
            <div className='left'>
                <img src={mainlogo} />
            </div>
            <div className='right'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/signup'><button>Signup</button></Link>
            </div>
        </nav>
    </div>
  )
}

export default Navbar