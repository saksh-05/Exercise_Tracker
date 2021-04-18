import React, {useEffect, useState} from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'

// const Exercise= props => {
//     <tr>
//         {console.log(props)};
//         <td>{props.exercise.username}</td>
//         <td>{props.exercise.description}</td>
//         <td>{props.exercise.duration}</td>
//         <td>{props.exercise.date.substring(0,10)}</td>
//         <td>
//             <Link to={"/edit/:"+ props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
//         </td>
//     </tr>
// }

function ExercisesList(){
    
    const [exercises, setExercises] = useState([]);

    const getAllExercise= async() =>{
        await axios.get('http://localhost:5000/exercises/')
            .then((response) => {
                setExercises(response.data);
            })
            .catch((error) =>{
                console.log(error);
            })
    };

    useEffect(() => {
        getAllExercise();
    },[]);

    function deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        const delExercise=exercises.filter(el => el._id !== id);
        setExercises(delExercise);
    }

    function exerciseList() {
        return exercises.map(currentexercise => {
            return (
            // <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />
                    <tr>
                        <td>{currentexercise.username}</td>
                        <td>{currentexercise.description}</td>
                        <td>{currentexercise.duration}</td>
                        <td>{currentexercise.date.substring(0,10)}</td>
                        <td>
                            <Link to={"/edit/"+ currentexercise._id}>edit</Link> | <a href="#" onClick={() => {deleteExercise(currentexercise._id)}}>delete</a>
                        </td>
                    </tr>
            );
        });
    }

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Data</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(exercises)}
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList