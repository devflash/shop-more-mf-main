import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Cart</Link>
      </li>
      <li>
        <Link to="/address/kasjdald">Address</Link>
      </li>
      <li>
        <Link to="/preview">Preview</Link>
      </li>
      <li>
        <Link to="/payment">Payment</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
