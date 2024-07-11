import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"

import { Button, Form, Input } from 'antd';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const update = async (id) => {
    // console.log(users[id-1].name)
    setName(users[id - 1].name)
    setEmail(users[id - 1].email)
    console.log(name)
    // const response = await axios.put(`http://localhost:3001/users/${id}`, { name, email });
    // console.log(response)
  }

  return (
    <div className="App">
      <h1>Users</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          form={Form}
          label="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button onClick={createUser} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <ul>
        {users.map(user => (
          <div key={user.id}>
            <li>{user.name} - {user.email}
              <button
                onClick={() => update(user.id)}
                className="updateBtn">Update</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
