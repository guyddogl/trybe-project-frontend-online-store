import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderNav extends Component {
  render() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link me-2 btn btn-light text-dark text-decoration-none"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link me-2 btn btn-light text-dark text-decoration-none"
            data-bs-toggle="offcanvas"
            data-bs-target="#NavCategories"
          >
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/cart"
            className="btn btn-light position-relative"
            data-testid="shopping-cart-button"
          >
            <i className="fa-solid fa-cart-shopping fa-lg mt-3" />
            <span
              className="position-absolute start-100 translate-middle badge bg-dark"
            >
              10
            </span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default HeaderNav;
