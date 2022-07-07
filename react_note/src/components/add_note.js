// import {useState, useEffect} from 'react';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/add_note.css';

function AddNote() {
    const [note, setNote] = useState({title: '', content: ''})
    const navigate = useNavigate()
    const fetchData = (e) =>{
        e.preventDefault()
        axios.post('/api/add-note/', note, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            if(res.data.error){
                alert(res.data.error)   
            }else{
                navigate('/list-note', {replace: true})   
            }     
        }).catch((err)=>{
            console.log('Error:', err)
        })
    }
    axios.get('/api/add-note/', {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }).catch((err)=>{
        if(err.code === "ERR_BAD_REQUEST"){
            navigate('/login', {replace: true})
        }
    })
    return (
        <div id="form-background">
            <form method="post" onSubmit={fetchData}>
                <div id='label'><label >Title</label></div>
                <input required type={'text'} onChange={(e)=>setNote({...note, title: e.target.value})}/>
                <div id='label'><label >Content</label></div>
                <textarea onChange={(e)=>setNote({...note, content: e.target.value})}/>
                <div className="button-area">
                <Link to='/list-note'><button id='view-btn' type='button'>Back</button></Link>             
                    <button id="create-btn" type="submit">Create</button>       
                </div>
            </form>
        </div>     
    );
}

export default AddNote;