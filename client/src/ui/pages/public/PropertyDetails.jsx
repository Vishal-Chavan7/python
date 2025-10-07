import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PropertyDetails(){
  const { id } = useParams();
  return (
    <div style={{ padding: 24 }}>
      <h2>Property {id}</h2>
      <p>Description and images go here.</p>
      <Link to="/tenant/applications">Apply</Link>
    </div>
  );
}