import React from 'react';

const reports = [
  {
    id: 1,
    reporter: { name: 'John Doe', email: 'john@example.com', avatar: 'https://i.pravatar.cc/40?img=1' },
    reportedUser: 'Jane Smith',
    reason: 'Inappropriate content',
    date: '2025-04-14',
    status: 'Pending',
  },
  {
    id: 2,
    reporter: { name: 'Alice Johnson', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/40?img=2' },
    reportedUser: 'Bob Brown',
    reason: 'Spam messages',
    date: '2025-04-13',
    status: 'Resolved',
  },
  // Add more report objects as needed
];

const UserReportsList = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Reports</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Reporter</th>
              <th>Reported User</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={report.reporter.avatar} alt={report.reporter.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{report.reporter.name}</div>
                      <div className="text-sm opacity-50">{report.reporter.email}</div>
                    </div>
                  </div>
                </td>
                <td>{report.reportedUser}</td>
                <td>{report.reason}</td>
                <td>{report.date}</td>
                <td>
                  <span
                    className={`badge ${
                      report.status === 'Pending' ? 'badge-warning' : 'badge-success'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button className="btn btn-sm btn-primary">View</button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReportsList;
