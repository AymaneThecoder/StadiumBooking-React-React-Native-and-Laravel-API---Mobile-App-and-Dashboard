import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditStade = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [stadeInput, setStadeInput] = useState({
    title: '',
    description: '',
    image: null,
    price: '',
    location: '',
    size: '',
    type: '',
    city: '',
    sport: '',
    status: '',
    featured: false,
    reviews: '',
  });

  useEffect(() => {
    fetchStade();
  }, []);

  const fetchStade = async () => {
    try {
      const { data } = await axios.get(`/api/stades/${id}`);
      const {
        title,
        description,
        image,
        price,
     
        size,
        type,
        city,
        sport,
        status,
        featured,
        reviews,
      } = data.Stade;
      setStadeInput({
        ...stadeInput,
        title,
        description,
        image,
        price,
 
        size,
        type,
        city,
        sport,
        status,
        featured,
        reviews,
      });
      console.log(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleInput = (e) => {
    setStadeInput({ ...stadeInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setStadeInput({ ...stadeInput, image: e.target.files[0] });
  };

  const submitStade = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', stadeInput.title);
    formData.append('description', stadeInput.description);
    formData.append('image', stadeInput.image);
    formData.append('price', stadeInput.price);
   
    formData.append('size', stadeInput.size);
    formData.append('type', stadeInput.type);
    formData.append('city', stadeInput.city);
    formData.append('sport', stadeInput.sport);
    formData.append('status', stadeInput.status);
    formData.append('featured', stadeInput.featured ? 1 : 0);
    formData.append('reviews', stadeInput.reviews);

    try {
      const { data } = await axios.post(`/api/stades/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data.message);
      navigate('/#stades');
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="w-full sm:w-full md:w-4/5">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-medium mb-4">Edit Stade</h3>
            <hr className="my-4" />
            <form onSubmit={submitStade}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="title"
                  name="title"
                  value={stadeInput.title}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </label>
                <textarea
                  className="form-textarea mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="description"
                  name="description"
                  rows="3"
                  value={stadeInput.description}
                  onChange={handleInput}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                  Image
                </label>
                <input
                  type="file"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="image"
                  name="image"
                  onChange={handleImage}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="price"
                  name="price"
                  value={stadeInput.price}
                  onChange={handleInput}
                />
              </div>
             
              <div className="mb-4">
                <label htmlFor="size" className="block text-gray-700 font-bold mb-2">
                  Size
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="size"
                  name="size"
                  value={stadeInput.size}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Type
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="type"
                  name="type"
                  value={stadeInput.type}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="city"
                  name="city"
                  value={stadeInput.city}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="sport" className="block text-gray-700 font-bold mb-2">
                  Sport
                </label>
                <input
                  type="text"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="sport"
                  name="sport"
                  value={stadeInput.sport}
                  onChange={handleInput}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                  Status
                </label>
                <select
                  className="form-select mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="status"
                  name="status"
                  value={stadeInput.status}
                  onChange={handleInput}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="featured" className="block text-gray-700 font-bold mb-2">
                  Featured
                </label>
                <select
                  className="form-select mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="featured"
                  name="featured"
                  value={stadeInput.featured}
                  onChange={handleInput}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="reviews" className="block text-gray-700 font-bold mb-2">
                  Reviews
                </label>
                <input
                  type="number"
                  className="form-input mt-1 block w-full border border-gray-400 rounded py-2 px-3"
                  id="reviews"
                  name="reviews"
                  value={stadeInput.reviews}
                  onChange={handleInput}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStade;
