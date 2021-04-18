import React,{useState} from 'react'
import axios from 'axios'

const CreateUser = () => {
    const [username, setUserName] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        const user={
            username: username,
        }
        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        setUserName('');
    }

    return (
        <div>
            <h3>create new user</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Username:
                    </label>
                    <input className="form-control" type="text" required value={username} placeholder="username" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser
