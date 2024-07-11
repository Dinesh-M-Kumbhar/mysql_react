import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"



function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdate, setisUpdate] = useState(false)
  const [updateId, setUpdateId] = useState()

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3001/users');
    setUsers(response.data);
  };

  const createUser = async () => {
    const response = await axios.post('http://localhost:3001/users', { name, email });
    setUsers([...users, response.data]);
    setName('');
    setEmail('');
  };

  const Edit = async (id) => {
    setisUpdate(true)
    setUpdateId(id)
    setName(users[id - 1].name)
    setEmail(users[id - 1].email)
  }
  const update = async (id) => {
    const response = await axios.put(`http://localhost:3001/users/${id}`, { name, email });
    console.log(response)
    setisUpdate(false)
  }

  return (
    <div className="App">
      <h1>Users</h1>
      <label>Username
        <input type='text' name="name" value={name}
          onChange={(e) => setName(e.target.value)}
        /><br></br>
        <br></br>
      </label>
      <label>Email
        <input type='text' name="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label><br></br><br></br>
      {!isUpdate ? <button onClick={createUser}>ADD user</button> :
        <button
          onClick={() => update(updateId)}
          className="updateBtn">Update
        </button>}

      <ul>
        {users.map(user => (
          <div key={user.id}>
            <li>{user.name} - {user.email}
              <button
                onClick={() => Edit(user.id)}
                className="updateBtn">Edit</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
