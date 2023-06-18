import React, { useState } from 'react';
import swal from 'sweetalert';
import { FaCheck } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';
import { BiCheck } from 'react-icons/bi';

const AddStade = ({ addStade }) => {
  const [productInput, setProductInput] = useState({
    title: '',
    description: '',
    image: null,
    price: '',
   
    size: '',
    type: '',
    city: '',
    sport: '',
    status: '',
    featured: false,
    reviews: 0,
  });
  const [errorList, setErrorList] = useState({});

  const handleInput = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setProductInput({ ...productInput, [e.target.name]: e.target.files[0] });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    const value = name === 'featured' ? (checked ? 1 : 0) : checked;
    setProductInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const submitProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!productInput.image) {
      setErrorList({ ...errorList, image: 'Please select an image.' });
      return;
    }

    formData.append('title', productInput.title);
    formData.append('description', productInput.description);
    formData.append('image', productInput.image);
    formData.append('price', productInput.price);
   
    formData.append('size', productInput.size);
    formData.append('type', productInput.type);
    formData.append('city', productInput.city);
    formData.append('sport', productInput.sport);
    formData.append('status', productInput.status);
    formData.append('featured', productInput.featured);
    formData.append('reviews', productInput.reviews);

    // Call the addStade prop with the form data
    addStade(formData);

    // Reset the form inputs
    setProductInput({
      title: '',
      description: '',
      image: null,
      price: '',
     
      size: '',
      type: '',
      city: '',
      sport: '',
      status: '',
      featured: false,
      reviews: 0,
    });
    setErrorList({});
  };


  return (
    <div>
      <form onSubmit={submitProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={productInput.title}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={productInput.description}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <div className="flex items-center justify-between border border-gray-300 rounded-md py-2 px-3">
            <input type="file" name="image" id="image" onChange={handleImage} className="hidden" />
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="bg-blue-500 text-white rounded-lg py-1 px-2 hover:bg-blue-600"
                onClick={() => document.getElementById('image').click()}
              >
                <BiImageAdd />
              </button>
              {productInput.image && <p className="truncate">{productInput.image.name}</p>}
            </div>
            {errorList.image && <p className="text-red-500 text-sm">{errorList.image}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={productInput.price}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 font-bold mb-2">
            Size
          </label>
          <input
            type="text"
            name="size"
            id="size"
            value={productInput.size}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={productInput.type}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={productInput.city}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sport" className="block text-gray-700 font-bold mb-2">
            Sport
          </label>
          <input
            type="text"
            name="sport"
            id="sport"
            value={productInput.sport}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="status"
            id="status"
            checked={productInput.status}
            onChange={handleCheckbox}
            className="hidden"
          />
          <label htmlFor="status" className="cursor-pointer flex items-center">
            <div className="bg-white border-2 border-gray-300 rounded-md p-2 mr-2">
              {productInput.status && <BiCheck className="text-green-500" />}
            </div>
            <span className="text-gray-700 font-bold">Status</span>
          </label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={productInput.featured}
            onChange={handleCheckbox}
            className="hidden"
          />
          <label htmlFor="featured" className="cursor-pointer flex items-center">
            <div className="bg-white border-2 border-gray-300 rounded-md p-2 mr-2">
              {productInput.featured && <BiCheck className="text-green-500" />}
            </div>
            <span className="text-gray-700 font-bold">Featured</span>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="reviews" className="block text-gray-700 font-bold mb-2">
            Reviews
          </label>
          <input
            type="number"
            name="reviews"
            id="reviews"
            value={productInput.reviews}
            onChange={handleInput}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded col-span-2"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddStade;
