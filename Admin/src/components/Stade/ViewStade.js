import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import AddStade from "./AddStade"; // Import the AddUser component
import swal from "sweetalert";
import { FaCheck } from 'react-icons/fa';

export default function ViewStade() {
  const [rooms, setRooms] = useState([]);
  const [showAddStade, setShowAddStade] = useState(false);
  const [productInput, setProductInput] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    location: "",
    size: "",
    type: "",
    city: "",
    sport: "",
    status: "",
    featured: false,
    reviews: 0,
  });
  const [errorList, setErrorList] = useState({});

  useEffect(() => {
    fetchStades();
  }, []);

  const fetchStades = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/stades");
      setRooms(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteStade = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/stades/${id}`);
      if (response.status === 200) {
        swal("Success", "Stade deleted successfully", "success");
        fetchStades();
      }
    } catch (error) {
      swal("Error", "Failed to delete stade", "error");
      console.log(error);
    }
  };

  const addStade = async (stade) => {
    try {
      const response = await axios.post(`/api/stades/`, stade, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === 201) {
        swal("Success", response.data.message, "success");
        fetchStades();
        setShowAddStade(false);
      } else if (response.data.status === 422) {
        swal('All Fields are mandatory', '', 'error');
        setErrorList(response.data.errors);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setShowAddStade(true)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3"
        >
          <span>Create</span>
          <FaPlusCircle className="mr-2" />
        </button>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Sport</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Featured</th>
            <th className="px-4 py-2">Reviews</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((row) => (
            <tr key={row.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{row.title}</td>
              <td className="px-4 py-2 line-clamp-2">{row.description}</td>
              <td className="px-4 py-2">
                <img
                  src={`http://127.0.0.1:8000/storage/stades/image/${row.image}`}
                  alt={row.title}
                  className="h-45 w-45 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2">{row.size}</td>
              <td className="px-4 py-2">{row.city}</td>
              <td className="px-4 py-2">{row.sport}</td>
              <td className="px-4 py-2">{row.type}</td>
              <td className="px-4 py-2">{row.status ? 'Active' : 'Inactive'}</td>
              <td className="px-4 py-2">{row.featured ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2">{row.reviews}</td>
              <td className=" px-4 py-8 flex">
                <Link
                  to={`/stade/edit/${row.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded me-2"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => deleteStade(row.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddStade && ( 
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Add Stade</h2>
            <AddStade
            addStade={addStade}
            />
            <button
              onClick={() => setShowAddStade(false)} // Hide AddStade popup when clicked
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
