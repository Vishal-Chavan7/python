import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Find your next home</h1>
      <div style={{ marginTop: 16 }}>
        <input placeholder="Location" />
        <input placeholder="Min Price" />
        <input placeholder="Max Price" />
        <select>
          <option value="">Any Type</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Studio</option>
        </select>
        <Link to="/listings" style={{ marginLeft: 8 }}>Search</Link>
      </div>
    </div>
  );
}
