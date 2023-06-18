import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import swal from 'sweetalert';
import axios from 'axios';
const authUser = localStorage.getItem('auth_name');

function Navbar() {

  const navigate = useNavigate();

  const logoutSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message, "success");
        navigate('/');
      }
    });
  }

  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link text-white text-lg font-bold" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white text-lg font-bold" to="/register">Register</Link>
        </li>
      </ul>
    );
  }
  else {
    AuthButtons = (
  <button onClick={logoutSubmit} className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition">
    Logout
  </button>
    );
  }

  return (
    <nav className="bg-primary shadow sticky-top">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <Link className="text-white text-lg font-bold" to="/">Admin Dashboard</Link>
          </div>
          <button className="block lg:hidden focus:outline-none navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="hidden lg:block">
            <ul className="navbar-nav">
            <span className="text-gray-500">{authUser}</span> {AuthButtons}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
