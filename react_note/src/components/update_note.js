// import {useState, useEffect} from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../css/add_note.css';

function UpdateNote() {
    const navigate = useNavigate()
    const {pk} = useParams()
    const [note, setNote] = useState({title: '', content: ''})

    const fetchData = (e) =>{
        e.preventDefault()
        axios.put(`/api/update-note/${pk}/`, note, {
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
    useEffect(()=>{
        axios.get(`/api/update-note/${pk}/`, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            setNote({...note, title: res.data.title, content: res.data.content})
        }).catch((err)=>{
            if(err.code === "ERR_BAD_REQUEST"){
                navigate('/login', {replace: true})
            }
        })
    }, [])
    return (
        <div id="form-background">
            <form method="post" onSubmit={fetchData}>
                <div id='label'><label >Title</label></div>
                <input required type={'text'} value={note.title} onChange={(e)=>setNote({...note, title: e.target.value})}/>
                <div id='label'><label >Content</label></div>
                <textarea value={note.content} onChange={(e)=>setNote({...note, content: e.target.value})}/>
                <div className="button-area">
                <Link to='/list-note'><button id='view-btn' type='button'>Back</button></Link>             
                    <button id="create-btn" type="submit">Update</button>       
                </div>
            </form>
        </div>     
    );
}

export default UpdateNote;