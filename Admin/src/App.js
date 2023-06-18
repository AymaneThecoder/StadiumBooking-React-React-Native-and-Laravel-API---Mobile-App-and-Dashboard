import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Import components
import AdminPrivateRoute from './routes/AdminRoutes';
import ViewStade from './components/Stade/ViewStade';
import EditStade from './components/Stade/EditStade';
import AddStade from './components/Stade/AddStade';
import AddUser from './components/Users/AddUser';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import AdminHeader from './pages/AdminHeader';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import NotFound from './pages/NotFound';
import ForgetPass from './pages/Auth/ForgetPass';
import ResetPass from './pages/Auth/ResetPass';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AdminHeader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPass />} />
          <Route path="/reset-password" element={<ResetPass />} />

          <Route element={<AdminPrivateRoute />}>
            <Route path="/stade/create" element={<AddStade />} />
            <Route path="/stade/edit/:id" element={<EditStade />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/create" element={<AddUser />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
