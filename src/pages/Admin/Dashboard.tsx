import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const AdminDashboard = () => {
  // Sample data
  const totalUsers = 1500;
  const totalProperties = 350;
  const totalRevenue = '₱1,200,000';

  const userData = {
    labels: ['Agents', 'Clients'],
    datasets: [
      {
        label: 'Number of Users',
        data: [500, 1000],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const propertyDistribution = {
    labels: ['For Rent', 'For Sale'],
    datasets: [
      {
        label: 'Properties',
        data: [200, 150],
        backgroundColor: ['#10b981', '#f59e0b'],
      },
    ],
  };

  const propertiesPerMonth = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Properties Posted',
        data: [20, 35, 40, 25, 30, 50],
        fill: false,
        borderColor: '#3b82f6',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="h-screen flex flex-col">
    <div className="container mx-auto p-4">
      {/* Top Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-100 shadow-md">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{totalUsers}</div>
        </div>
        <div className="stat bg-base-100 shadow-md">
          <div className="stat-title">Total Properties</div>
          <div className="stat-value text-secondary">{totalProperties}</div>
        </div>
        <div className="stat bg-base-100 shadow-md">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-accent">{totalRevenue}</div>
        </div>
      </div>

      {/* Bar and Pie Charts */}
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <Bar data={userData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
        </div>

        {/* Pie Chart */}
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Property Distribution</h2>
          <Pie data={propertyDistribution} height={50} options={{ responsive: true, maintainAspectRatio:true, plugins: { legend: { position: 'right' } } }} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="card bg-base-100 shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Properties Posted Per Month</h2>
        <Line data={propertiesPerMonth} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
</div>

  );
};

export default AdminDashboard;
