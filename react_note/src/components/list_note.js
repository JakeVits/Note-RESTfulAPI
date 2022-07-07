// import {useState, useEffect} from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/list_note.css';
import '../css/modal.css';
import '../css/base.css';

function ListNote() {
    // must set the initial state to empty array as the fetched data returns as array of objects
    const [note, setNote] = useState([]);
    const [id, setId] = useState(0)
    const navigate = useNavigate()
    // execute for once
    useEffect(()=>{
        axios.get('/api/list-note/', {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            setNote(res.data)
        }).catch((err)=>{
            if(err.code === "ERR_BAD_REQUEST"){
                navigate('/login', {replace: true})
            }
        })
    }, [])
    // to handle modal
    const openModal = (e)=>{
        document.querySelector('.modal-container').classList.add('active')
        setId(e.target.id)
    }
    const closeModal = ()=>{
        document.querySelector('.modal-container').classList.remove('active')
    }
    document.addEventListener('click', (e) =>{
        if(e.target.id === 'modal-container'){
            document.querySelector('.modal-container').classList.remove('active')
        }
    })
    // to delete a note
    const deleteNote = () =>{
        axios.delete(`/api/delete-note/${id}/`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).catch((err)=>{
            console.log('Error:', err)
        })
        document.querySelector('.modal-container').classList.remove('active')
    }
    const logout = () =>{
        axios.post('/api/logout/', {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            localStorage.removeItem('token')
            navigate('/login', {replace: true})
        }).catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div>
            <div id='c-link'>
                <Link to='/add-note' className='link'>Create-Note | </Link>
                <Link to='/' className='link' onClick={logout}>Logout</Link>
            </div>     
            {note.length !== 0 
                ?  
                <div id="grid-container">
                    {note.map((item) =>(
                        <div key={item.id} className="box">
                            <p id="note-title">{item.title}</p>
                            <Link className='link' to={`/update-note/${item.id}`}>Update | </Link>
                            <Link id={item.id} data-id={item.id} to='/list-note/' 
                                onClick={openModal} className='link'>Delete</Link>
                        </div>
                    ))}
                </div> 
                : <h3 id="empty-note">No Note is Available in the Moment!</h3>
            }
            <div className="modal-container" id="modal-container">
                <div className="modal">
                    <div className="confirm-message">
                        <p>Confirm your action?</p>
                    </div>
                    <button onClick={closeModal} className='cancelBtn'>Cancel</button>
                    <button onClick={deleteNote} className="confirmBtn" type="button">Confirm</button>   
                </div>
            </div>
        </div>     
    );
}

export default ListNote;