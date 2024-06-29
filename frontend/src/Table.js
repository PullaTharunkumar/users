import React, { useState, useEffect } from 'react';

function Table(){
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [friend, setFriend] = useState([]);
    const [editId, setEditId] = useState(-1);
    const [deleteId, setDeleteId] = useState(-1);
    const [updateName, setUpdateName] = useState('');
    const [updateFriends, setUpdateFriends] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    },[editId, deleteId])

    const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/users').then(data => data.json())
          setUsers(response);
        } catch (error) {
          console.error('Error while fetching users data', error);
        }
    };

    const addUser = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/users', {  body : JSON.stringify({ name : name, friend: friend }), method : 'post', headers: { 
            "Content-type": "application/json; charset=UTF-8"
          } }).then(data => data.json())
          setUsers([...users, response]);
          console.log(users,"users");
          setName('');
          setFriend('');
        } catch (error) {
          console.error('Error while adding user:', error);
        }
      };

    const editUserData = (user) => {
        setEditId(user.id)
        setUpdateName(user.name)
        setUpdateFriends(user.friends)
    }

    const updateUserData = async (userId) => {
        try {
            const friends = updateFriends?.includes(',') ? updateFriends?.split(',') : typeof(updateFriends) === 'string' && [updateFriends]
            const response = await fetch('http://localhost:8080/api/users/'+userId, {  body : JSON.stringify({ name : updateName, friend: friends }), method : 'put', headers: { 
              "Content-type": "application/json; charset=UTF-8"
            } }).then(data => data.json());
            console.log('Udated user', response);
            setEditId(-1);
            setUpdateName('');
            setUpdateFriends('');
        } catch (error) {
        console.error('Error while updating user:', error);
        }
    }

    const deleteUser = async (userId) => {
        try {
            setDeleteId(userId)
            const response = await fetch('http://localhost:8080/api/users/'+userId, { method : 'delete', headers: { 
                "Content-type": "application/json; charset=UTF-8"
            }} ).then(data => data.json() );
            console.log("TRES",response)
        } catch (error) {
            console.error('Error while deleting user:', error);
        }
    }
    return ( 
        <div>
            <div className='form-div'>
                <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Friend"
                    value={friend}
                    onChange={(event) => setFriend(event.target.value)}
                />
                <button onClick={addUser}>Add User</button>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>User Friends</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => (
                            user.id === editId ?
                                <tr key = {user.id}> 
                                    <td> {user.id } </td>
                                    <td> <input 
                                            type='text' 
                                            value={updateName} 
                                            onChange={(event) => setUpdateName(event.target.value)}
                                        />
                                    </td>
                                    <td> <input 
                                            type='text' 
                                            value={updateFriends}
                                            onChange={(event) => setUpdateFriends(event.target.value)}
                                        />
                                    </td>
                                    <td> <button onClick={() => updateUserData(user.id)}> Update </button></td>
                                </tr> :
                                <tr key = { user.id }>
                                    <td> { user.id }</td>
                                    <td> { user.name }</td>
                                    <td> { user?.friends?.join(', ') }</td>
                                    <td> 
                                        <button onClick={() => editUserData(user)}> Edit </button>
                                        <button onClick={() => deleteUser(user.id)}> Delete </button></td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table