import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/listings">Listings</Link>
        <span style={{ flex: 1 }} />
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <Outlet />
    </div>
  );
}
