import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import EditUser from '../components/Users/EditUser';
import AddUser from '../components/Users/AddUser'; // Import the AddUser component

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserPassword, setEditUserPassword] = useState('');
  const [showAddUser, setShowAddUser] = useState(false); //

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/users')
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    setLoading(true);
    axios
      .delete(`http://127.0.0.1:8000/api/users/${id}`)
      .then((response) => {
        console.log(response.data.message);
        setUsers(users.filter((user) => user.id !== id));
        setMessage('User deleted successfully.');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const addUser = (user) => {
    setLoading(true);
    axios
      .post('http://127.0.0.1:8000/api/users', user)
      .then((response) => {
        console.log(response.data.message);
        setUsers([...users, response.data.user]);
        setMessage('User created successfully.');
        setLoading(false);
        setTimeout(() => setMessage(''), 5000); // Show message for 5 seconds
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const editUser = (id, updatedUser) => {
    setLoading(true);
    axios
      .post(`http://127.0.0.1:8000/api/users/${id}`, updatedUser)
      .then((response) => {
        console.log(response.data.message);
        setUsers(users.map((user) => (user.id === id ? response.data.user : user)));
        setMessage('User updated successfully.');
        setLoading(false);
        closeEditPopup();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const openEditPopup = (id, name,phone_number, email) => {
    const user = users.find((user) => user.id === id);
    setEditUserId(id);
    setEditUserName(user.name);
    setEditUserPhone(user.phone_number);
    setEditUserEmail(user.email);
    setEditUserPassword('');
  };

  const closeEditPopup = () => {
    setEditUserId(null);
    setEditUserName('');
  };

  return (
    <div className="container">
      <button
        onClick={() => setShowAddUser(true)} // Show AddUser popup when clicked
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
      >
        Add User
      </button>
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="font-bold">Success</p>
          <p>{message}</p>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone number</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">0{user.phone_number}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 flex">
                  <button
                    onClick={() => openEditPopup(user.id, user.name)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-2"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editUserId && (
        <EditUser
          userId={editUserId}
          userName={editUserName}
          userEmail={editUserEmail}
          userPhone={editUserPhone}
          userPassword={editUserPassword}
          editUser={editUser}
          closeEditPopup={closeEditPopup}
        />
      )}
      {showAddUser && ( // Show AddUser popup if showAddUser state is true
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Add User</h2>
            <AddUser
              addUser={addUser} // Pass the addUser function as a prop to AddUser component
              // AddUser component props
            />
            <button
              onClick={() => setShowAddUser(false)} // Hide AddUser popup when clicked
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
