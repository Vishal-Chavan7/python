import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../ui/layouts/PublicLayout';
import DashboardLayout from '../ui/layouts/DashboardLayout';
import Home from '../ui/pages/public/Home';
import About from '../ui/pages/public/About';
import Contact from '../ui/pages/public/Contact';
import Listings from '../ui/pages/public/Listings';
import PropertyDetails from '../ui/pages/public/PropertyDetails';
import Login from '../ui/pages/auth/Login';
import Signup from '../ui/pages/auth/Signup';
import TenantDashboard from '../ui/pages/tenant/Dashboard';
import TenantApplications from '../ui/pages/tenant/Applications';
import TenantPayments from '../ui/pages/tenant/Payments';
import TenantMaintenance from '../ui/pages/tenant/Maintenance';
import TenantNotifications from '../ui/pages/tenant/Notifications';
import LandlordDashboard from '../ui/pages/landlord/Dashboard';
import LandlordProperties from '../ui/pages/landlord/Properties';
import LandlordApplications from '../ui/pages/landlord/Applications';
import LandlordRent from '../ui/pages/landlord/Rent';
import LandlordMaintenance from '../ui/pages/landlord/Maintenance';
import LandlordNotifications from '../ui/pages/landlord/Notifications';
import AdminDashboard from '../ui/pages/admin/Dashboard';
import AdminUsers from '../ui/pages/admin/Users';
import AdminProperties from '../ui/pages/admin/Properties';
import AdminRent from '../ui/pages/admin/Rent';
import AdminMaintenance from '../ui/pages/admin/Maintenance';
import AdminNotifications from '../ui/pages/admin/Notifications';
import AdminLogin from '../ui/pages/admin/Login';
import Profile from '../ui/pages/common/Profile';
import AuthProvider, { RequireAuth, RequireRole } from '../state/AuthProvider';

const AppRoutes = () => (
  <AuthProvider>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="listings" element={<Listings />} />
        <Route path="listings/:id" element={<PropertyDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Route>

      <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
        <Route path="profile" element={<Profile />} />

        <Route path="tenant" element={<RequireRole role="tenant"><TenantDashboard /></RequireRole>} />
        <Route path="tenant/applications" element={<RequireRole role="tenant"><TenantApplications /></RequireRole>} />
        <Route path="tenant/payments" element={<RequireRole role="tenant"><TenantPayments /></RequireRole>} />
        <Route path="tenant/maintenance" element={<RequireRole role="tenant"><TenantMaintenance /></RequireRole>} />
        <Route path="tenant/notifications" element={<RequireRole role="tenant"><TenantNotifications /></RequireRole>} />

        <Route path="landlord" element={<RequireRole role="landlord"><LandlordDashboard /></RequireRole>} />
        <Route path="landlord/properties" element={<RequireRole role="landlord"><LandlordProperties /></RequireRole>} />
        <Route path="landlord/applications" element={<RequireRole role="landlord"><LandlordApplications /></RequireRole>} />
        <Route path="landlord/rent" element={<RequireRole role="landlord"><LandlordRent /></RequireRole>} />
        <Route path="landlord/maintenance" element={<RequireRole role="landlord"><LandlordMaintenance /></RequireRole>} />
        <Route path="landlord/notifications" element={<RequireRole role="landlord"><LandlordNotifications /></RequireRole>} />

        <Route path="admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />
        <Route path="admin/users" element={<RequireRole role="admin"><AdminUsers /></RequireRole>} />
        <Route path="admin/properties" element={<RequireRole role="admin"><AdminProperties /></RequireRole>} />
        <Route path="admin/rent" element={<RequireRole role="admin"><AdminRent /></RequireRole>} />
        <Route path="admin/maintenance" element={<RequireRole role="admin"><AdminMaintenance /></RequireRole>} />
        <Route path="admin/notifications" element={<RequireRole role="admin"><AdminNotifications /></RequireRole>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthProvider>
);

export default AppRoutes;
