// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import ListNote from './components/list_note';
import AddNote from './components/add_note';
import UpdateNote from './components/update_note';

function App() {
    return (
        <BrowserRouter>
            <Routes>        
                <Route path='/' element={<Navigate to='/list-note'/>}/>
                <Route exact path='/login/' element={<Login/>}/>
                <Route exact path='/register/' element={<Register/>}/>
                <Route exact path='/list-note/' element={<ListNote/>}/>
                <Route exact path='/add-note/' element={<AddNote/>}/>
                <Route exact path='/update-note/:pk' element={<UpdateNote/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

// const [value, setValue] = useState(0)
// const [s_value, setSValue] = useState(localStorage.getItem('value'))
// const increment = ()=>{
//     setValue(value + 1)
// }
// const save = ()=>{
//     setSValue(value)
//     localStorage.setItem('value', value)
// }
// useEffect(()=>{
//     axios.
// }, []) 
// <div>
    //     <div id="top-link">
    //         <p>Hi, User | <a href='#'>Logout</a></p>
    //         <a href="#" id="create-link">Create Note? Click here!</a>
    //     </div>
    // </div>
{/*
<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Number: {value}</p>
        <p>Saved Value: {s_value ? s_value : '-'}</p>
        <div>
            <button onClick={increment}>Increment</button> | <button onClick={save}>Save</button>
        </div>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a>
      </header>
    </div> 
<p>
  Edit <code>src/App.js</code> and save to reload.
</p> */}