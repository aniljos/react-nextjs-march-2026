'use client'

import { AppThemeContext } from "../context/AppThemeContext";
import {Link} from "react-router-dom";
import { useContext } from "react";

export default function AppBar() {

  const theme = useContext(AppThemeContext);

  function handleSwitchTheme(){
    theme.changeTheme(theme.mode === 'dark' ? 'light' : 'dark');
    console.log("theme", theme.mode);
  }

  return (
    <nav className={`navbar navbar-${theme.mode} bg-${theme.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Next.js
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/gadgets">
              Gadgets
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/viewcart">
              View Cart
            </Link>
          </li>
           <li className="nav-item">
            <Link className="nav-link" to="/customers">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/suppliers">
              Suppliers
            </Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-warning" onClick={handleSwitchTheme}>Switch Theme</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
