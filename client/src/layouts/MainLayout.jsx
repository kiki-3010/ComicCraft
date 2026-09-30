import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-body)',
      }}
    >
      <Navbar />
      <main style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
