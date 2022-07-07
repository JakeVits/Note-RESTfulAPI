import {useState, useEffect} from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import '../../css/login.css';

function Login() {
    const [data, setData] = useState({username: '', password: ''})
    const navigate = useNavigate()  
    const fetchData = (e) =>{
        e.preventDefault()
        axios.post('/api/login/', data, {
            headers:{'Content-Type': 'application/json'}
        }).then(({data})=>{
            localStorage.setItem('token', data.token)
            navigate('/list-note', {replace: true})
        }).catch((err)=>{
            console.log('Error:', err)
        })
    }
    return (
        <div className="container">       
            <div id='title'><h1>Z-Notes</h1></div>
            <form onSubmit={fetchData}>
                <div className="txt_field">
                    <input name='username' type='text' onChange={(e)=>setData({...data, username: e.target.value})} required/>
                    <span></span>
                    <label>Username</label>
                    <i className="fa fa-user" aria-hidden="true"></i>            
                </div>
                <div className="txt_field">
                    <input name="password" type="password" onChange={(e)=>setData({...data, password: e.target.value})} required/>
                    <span></span>
                    <label>Password</label>
                    <i className="fa fa-key" id="key" aria-hidden="true"></i>  
                </div>
                <input type="submit" value="Login"/>
            </form>
            <div id='link'>
                <hr/>
                <Link id='form-link' to='/register'>Register</Link> 
            </div>        
        </div>
    );
}

export default Login;