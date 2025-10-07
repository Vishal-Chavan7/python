import React from 'react';
import { Link } from 'react-router-dom';

export default function Listings(){
  // Placeholder listings
  const mock = [
    { id: '1', title: 'Sunny Apartment', rent: 1200, location: 'Downtown' },
    { id: '2', title: 'Cozy Studio', rent: 900, location: 'Midtown' },
  ];
  return (
    <div style={{ padding: 24 }}>
      <h2>Listings</h2>
      <ul>
        {mock.map(p => (
          <li key={p.id}>
            <Link to={`/listings/${p.id}`}>{p.title}</Link> - ${p.rent} - {p.location}
          </li>
        ))}
      </ul>
    </div>
  );
}