import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ProductsList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profil";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
