import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/products">products</Link>
      </li>
      <li>
        <Link to="/product">product</Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
