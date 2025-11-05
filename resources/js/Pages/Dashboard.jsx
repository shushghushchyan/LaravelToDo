import React from 'react';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <div className="p-8">
      <Head title="Dashboard" />
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Welcome to your Dashboard 🎉</h1>
      <p>You have successfully registered and logged in.</p>
    </div>
  );
}
