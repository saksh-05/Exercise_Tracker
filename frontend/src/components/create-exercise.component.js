import React,{useState,useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateExercise = () => {
    const[username, setUserName]=useState('');
    const [description, setDescription]=useState('')
    const [duration, setDuration]= useState(0)
    const [date, setDate]= useState(new Date())
    const [users, setUsers]= useState([])

    const getUser= () =>{
        axios.get('http://localhost:5000/users/')
            .then(response =>{
                if(response.data.length >0){
                    const allUser=response.data.map(user => user.username)
                    setUsers(allUser);
                    // setUserName(response.data.username)
                        
                }
            })
    }
    console.log(users);

    useEffect(() => {
        getUser();
    }, []);


    const handleSubmit = (e) =>{
        e.preventDefault();
        const exercise={
            username:username,
            description: description,
            duration: duration,
            date: date,
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        // setUserName('')
        // console.log(username);
        // console.log(description);
        // console.log(duration);
        // console.log(date);

        // var window: Window
        // window.location= '/';
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:
                    <input type="userInput" className="form-control" required value={username} placeholder="Username" onChange={e => setUserName(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description:
                    <input type="text" className="form-control" value={description} placeholder="Description" onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Duration(in minute): 
                    <input type="text" className="form-control" value={duration} placeholder="Duration" onChange={e => setDuration(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <div>
                        <DatePicker
                        selected={date}
                        onChange={date => setDate(date)} />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateExercise
