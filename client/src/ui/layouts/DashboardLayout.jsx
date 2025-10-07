import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
        <Link to="/tenant">Tenant</Link>
        <Link to="/tenant/applications">My Applications</Link>
        <Link to="/tenant/payments">My Payments</Link>
        <Link to="/tenant/maintenance">Maintenance</Link>
        <Link to="/tenant/notifications">Notifications</Link>
        <span style={{ flex: 1 }} />
        <Link to="/landlord">Landlord</Link>
        <Link to="/landlord/properties">My Properties</Link>
        <Link to="/landlord/applications">Tenant Applications</Link>
        <Link to="/landlord/rent">Rent</Link>
        <Link to="/landlord/maintenance">Maintenance</Link>
        <Link to="/landlord/notifications">Notifications</Link>
        <span style={{ flex: 1 }} />
        <Link to="/admin">Admin</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/properties">Properties</Link>
        <Link to="/admin/rent">Rent & Contracts</Link>
        <Link to="/admin/maintenance">Maintenance</Link>
        <Link to="/admin/notifications">Notifications</Link>
        <span style={{ flex: 1 }} />
        <Link to="/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}
