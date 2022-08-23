import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import userService from "../services/user.service";

const AddUser = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const history = useNavigate();
    const { id } = useParams();

    const saveUser = (e) => {
        e.preventDefault();

        const user = { name, age, id };
        if (id) {
            //update the record
            userService.update(user)
                .then(response => {
                    console.log('User data updated successfully', response.data);
                    alert("User(ID:" + id + "), " + response.data.status);
                    history.push('/');

                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });

        } else {
            //create new record
            userService.create(user)
                .then(response => {
                    console.log('User data added successfully', response.data);
                    alert(response.data.status);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }

    const title = () => {
        if (id) {
            return <h3>Update User</h3>
        } else {
            return <h3>Add New User</h3>
        }
    }

    useEffect(() => {
        if (id) {
            userService.get(id)
                .then(user => {
                    setName(user.data.name);
                    setAge(user.data.age);
                }).catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, [])



    return (
        <div className="container">
            {
                title()
            }
            <hr />
            <form>
                <div className="form-group">
                    <h4>Name: </h4>
                    <input type="text"
                        className="form-control col-4"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />

                </div>
                <div className="form-group">
                    <h4>Age: </h4>
                    <input type="number"
                        className="form-control col-4"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
                    />
                </div>

                <div>
                    <button className="btn btn-primary" onClick={(e) => saveUser(e)}>Save</button>
                </div>
            </form>
            <hr />
            <Link to="/">Back to List</Link>
        </div>
    );
}

export default AddUser;