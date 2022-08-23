import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from "../services/user.service";
import { Link } from "react-router-dom";


const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [inputId, setInputId] = useState("");
    const [userById, setUserById] = useState(null);

    const init = () => {
        userService.getAll()
            .then(response => {
                console.log('Printing users data', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }
    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if (inputId === null || inputId === undefined || inputId === "") {
            setUserById(null);
        } else {
            userService.get(inputId)
                .then(response => {
                    console.log('Printing users data', response.data);
                    setUserById(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }

    }, [inputId])

    const handleDelete = id => {
        var answer = window.confirm("Are you sure you want to delete ID(" + id + ") ?");
        if (answer) {
            userService.remove(id)
                .then(response => {
                    console.log('User deleted successfully', response.data);
                    init();
                }).catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }


    return (
        <div className="container">
            <h1>User Account Management</h1>
            <hr />
            <div>
                <form>
                    <div className="form-group row ml-2">
                        <h4 >Find User By ID:   </h4>
                        <input type="text"
                            className="form-control col-4 ml-2"
                            id="inputId"
                            placeholder="Enter ID"
                            value={inputId}
                            onChange={(e) => setInputId(e.target.value || null)}
                        />

                    </div>
                </form>
                <hr />
                <div>

                </div>
                <Link to="/add" className="btn btn-primary mb-2"> add User</Link>
                <table border="1" cellPadding="10" className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userById == null ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link className="btn btn-info" to={`/user/edit/${user.id}`}>Update</Link>
                                        <button className="btn btn-danger ml-2" onClick={(e) => handleDelete(user.id)}>Delete</button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr key={userById.id}>
                            <td>{userById.id}</td>
                            <td>{userById.name}</td>
                            <td>{userById.age}</td>
                            <td></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersList;