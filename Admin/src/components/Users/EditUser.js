import React, { useState } from 'react';

function EditUser({ userId, userName,userPhone, userEmail, userPassword, editUser, closeEditPopup }) {
  const [editUserName, setEditUserName] = useState(userName);
  const [editUserPhone, setEditUserPhone] = useState(userPhone);
  const [editUserEmail, setEditUserEmail] = useState(userEmail);
  const [editUserPassword, setEditUserPassword] = useState(userPassword);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      name: editUserName,
      phone_number: editUserPhone,
      email: editUserEmail,
      password: editUserPassword,
    };
    editUser(userId, updatedUser);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              value={editUserPhone}
              onChange={(e) => setEditUserPhone(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={editUserPassword}
              onChange={(e) => setEditUserPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeEditPopup}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
