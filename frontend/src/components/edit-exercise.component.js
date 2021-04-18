import React,{useState,useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = (props) => {
    const[username, setUserName]=useState('');
    const [description, setDescription]=useState('')
    const [duration, setDuration]= useState(0)
    const [date, setDate]= useState(new Date())
    const [users, setUsers]= useState([])

    const editExercise= () =>{
        axios.get('http://localhost:5000/exercise/'+ props.match.params.id)
            .then(response =>{
                setUserName(response.data.exercise.username)
                setDescription(response.data.exercise.description)
                setDuration(response.data.exercise.duration)
                setDate(response.data.exercise.date)
            })
            .catch(function(error){
                console.log(error);
            })
    
        axios.get('http://localhost:5000/users/')
            .then(response =>{
                if(response.data.length >0){
                    const allUser=response.data.map(user => user.username);
                    setUsers(allUser);
                    // setUserName(response.data.username)
                        
                }
            })
    }
    console.log(users);

    useEffect(() => {
        editExercise();
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
        console.log(props.match.params.id);

        axios.post('http://localhost:5000/exercises/update/'+ props.match.params.id, exercise)
            .then(res => console.log(res.data));

        // var window=Window;
        // window.location= '/';
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:
                    <input type="text" value={username} placeholder="Username" onChange={e => setUserName(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description:
                    <input type="text" value={description} placeholder="Description" onChange={e => setDescription(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>Duration(in minute): 
                    <input type="text" value={duration} placeholder="Duration" onChange={e => setDuration(e.target.value)} />
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

export default EditExercise
