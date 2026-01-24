import React, { useState } from "react";

// Admin profiles
const adminProfiles = [
  { name: "Chaitanya", employeeId: "EMP12345", email: "chaitanya@company.com", role: "Female", contact: "8937478899", profilePic: "https://i.pravatar.cc/150?img=32" },
  { name: "Aishwarya Patil", employeeId: "EMP12346", email: "aishwarya@company.com", role: "Female", contact: "6378500909", profilePic: "https://i.pravatar.cc/150?img=45" },
  { name: "Umashankar", employeeId: "EMP12347", email: "umashankar@company.com", role: "Male", contact: "8479392020", profilePic: "https://i.pravatar.cc/150?img=12" },
  { name: "Mahallapa", employeeId: "EMP12348", email: "mahallapa@company.com", role: "Male", contact: "9047362828", profilePic: "https://i.pravatar.cc/150?img=8" },
  { name: "Rohit Sharma", employeeId: "EMP12349", email: "rohit@company.com", role: "Male", contact: "9001122334", profilePic: "https://i.pravatar.cc/150?img=59" },
  { name: "Neha Singh", employeeId: "EMP12350", email: "neha@company.com", role: "Female", contact: "9123456789", profilePic: "https://i.pravatar.cc/150?img=47" },
];

// Leave types and total allowed
const leaveTypes = {
  "Sick Leave": 12,
  "Casual Leave": 8,
  "Paid Leave": 10,
  "Maternity Leave": 180,
  "Paternity Leave": 15
};

// Dummy leaves: 6 records
const initialLeaves = [
  { id: 1, adminId: "EMP12345", leaveType: "Sick Leave", startDate: "2026-01-21", endDate: "2026-01-22", reason: "Fever", status: "Pending" },
  { id: 2, adminId: "EMP12346", leaveType: "Casual Leave", startDate: "2026-01-22", endDate: "2026-01-23", reason: "Personal work", status: "Pending" },
  { id: 3, adminId: "EMP12347", leaveType: "Paid Leave", startDate: "2026-01-20", endDate: "2026-01-25", reason: "Vacation", status: "Approved" },
  { id: 4, adminId: "EMP12348", leaveType: "Sick Leave", startDate: "2026-01-21", endDate: "2026-01-21", reason: "Cold", status: "Rejected", rejectReason: "Not eligible" },
  { id: 5, adminId: "EMP12349", leaveType: "Paid Leave", startDate: "2026-01-19", endDate: "2026-01-21", reason: "Family event", status: "Pending" },
  { id: 6, adminId: "EMP12350", leaveType: "Casual Leave", startDate: "2026-01-21", endDate: "2026-01-22", reason: "Travel", status: "Pending" },
];

const SuperAdminLeavePage = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [profileModal, setProfileModal] = useState({ open: false, adminId: null, leave: null });
  const [showTodays, setShowTodays] = useState(false);
  const [reasonModal, setReasonModal] = useState({ open: false, leave: null });

  const today = "2026-01-21";

  const handleApprove = (id) => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: "Approved" } : l));
  };

  const handleReject = (id) => {
    const reason = prompt("Enter reason for rejection:");
    if (!reason) return;
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: "Rejected", rejectReason: reason } : l));
  };

  const admin = profileModal.adminId ? adminProfiles.find(a => a.employeeId === profileModal.adminId) : null;
  const todaysLeaves = leaves.filter(l => l.startDate <= today && l.endDate >= today);

  return (
    <div
      className="min-h-screen p-6 text-lg"
      style={{ backgroundImage: "url('/Bg-image.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-black">Super Admin Leave Requests</h1>
        <button
          onClick={() => setShowTodays(!showTodays)}
          className="bg-blue-300 text-white px-6 py-3 rounded-lg hover:bg-blue-400 text-xl font-semibold transition"
        >
          Today's Leaves
        </button>
      </div>

      {showTodays && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-3">Leaves Today ({today})</h2>
          {todaysLeaves.length ? (
            <ul className="text-lg">
              {todaysLeaves.map(l => {
                const emp = adminProfiles.find(a => a.employeeId === l.adminId);
                return <li key={l.id} className="py-1">{emp.name} - {l.leaveType}</li>;
              })}
            </ul>
          ) : <p>No leaves today</p>}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <table className="w-full border border-gray-300 text-lg">
          <thead className="bg-blue-50 text-lg">
            <tr>
              <th className="border px-4 py-3 font-semibold text-2xl text-center">Employee</th>
              <th className="border px-4 py-3 font-semibold text-2xl text-center">Reason</th>
              <th className="border px-4 py-3 font-semibold text-2xl text-center">Status / Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map(l => {
              const emp = adminProfiles.find(a => a.employeeId === l.adminId);
              if (!emp) return null;
              return (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td
                    className="border px-4 py-3 text-center text-blue-600 underline cursor-pointer"
                    onClick={() => setProfileModal({ open: true, adminId: emp.employeeId, leave: l })}
                  >
                    {emp.name}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    <button
                      onClick={() => setReasonModal({ open: true, leave: l })}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg text-lg hover:bg-gray-300 transition"
                    >
                      View Leave
                    </button>
                  </td>
                  <td className="border px-4 py-3 text-center">
                    {l.status === "Pending" ? (
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={() => handleApprove(l.id)}
                          className="bg-blue-100 text-blue-800 px-5 py-2 rounded-md text-lg font-medium shadow-sm hover:bg-blue-200 transition duration-300"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(l.id)}
                          className="bg-red-100 text-red-800 px-5 py-2 rounded-md text-lg font-medium shadow-sm hover:bg-red-200 transition duration-300"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <span>{l.status}</span>
                        <button
                          onClick={() => setLeaves(prev => prev.map(item => item.id === l.id ? { ...item, status: "Pending", rejectReason: undefined } : item))}
                          className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Reason Modal */}
      {reasonModal.open && reasonModal.leave && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl w-full h-3/4 overflow-y-auto relative text-lg">
            <button
              onClick={() => setReasonModal({ open: false, leave: null })}
              className="absolute top-4 right-4 text-lg font-bold px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              X
            </button>
            <h2 className="font-bold mb-6 text-3xl text-center">Leave Details</h2>
            <div className="text-xl space-y-4">
              <p><strong>Employee:</strong> {adminProfiles.find(a => a.employeeId === reasonModal.leave.adminId)?.name}</p>
              <p><strong>Leave Type:</strong> {reasonModal.leave.leaveType}</p>
              <p><strong>Start Date:</strong> {reasonModal.leave.startDate}</p>
              <p><strong>End Date:</strong> {reasonModal.leave.endDate}</p>
              <p><strong>Reason:</strong> {reasonModal.leave.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal.open && admin && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white p-6 rounded-xl shadow max-w-3xl w-full relative">
            <button
              onClick={() => setProfileModal({ open: false, adminId: null, leave: null })}
              className="absolute top-4 right-4 text-lg font-bold px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              X
            </button>

            <div className="flex items-center gap-6 mb-6">
              <img src={admin.profilePic} alt={admin.name} className="w-28 h-28 rounded-full" />
              <div className="text-lg flex-1">
                <h2 className="font-bold text-3xl mb-2">{admin.name}</h2>
                <p className="mb-1"><strong>Employee ID:</strong> {admin.employeeId}</p>
                <p className="mb-1"><strong>Email:</strong> {admin.email}</p>
                <p className="mb-1"><strong>Role:</strong> {admin.role}</p>
                <p className="mb-1"><strong>Contact:</strong> {admin.contact}</p>
              </div>
            </div>

            {/* Leave Summary Table */}
            <div className="overflow-x-auto">
              <h3 className="font-semibold text-2xl mb-2">Leave Summary</h3>
              <table className="w-full border border-gray-300 text-lg mb-4">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-3 py-2">Leave Type</th>
                    <th className="border px-3 py-2">Total Allowed</th>
                    <th className="border px-3 py-2">Used</th>
                    <th className="border px-3 py-2">Left</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(leaveTypes)
                    .filter(type => {
                      // Show only Paternity for male, Maternity for female
                      if (type === "Paternity Leave" && admin.role === "Female") return false;
                      if (type === "Maternity Leave" && admin.role !== "Female") return false;
                      return true;
                    })
                    .map(type => {
                      const used = leaves.filter(
                        l => l.adminId === admin.employeeId && l.leaveType === type && l.status === "Approved"
                      ).length;
                      return (
                        <tr key={type}>
                          <td className="border px-3 py-2">{type}</td>
                          <td className="border px-3 py-2">{leaveTypes[type]}</td>
                          <td className="border px-3 py-2">{used}</td>
                          <td className="border px-3 py-2">{leaveTypes[type] - used}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Last Leave Status */}
            {profileModal.leave && (
              <div className="mt-4 p-4 border-t border-gray-300">
                {profileModal.leave.status === "Approved" ? (
                  <p className="text-green-600 font-semibold text-lg">Approved by Abhishek Bachanna</p>
                ) : profileModal.leave.status === "Rejected" ? (
                  <p className="text-red-600 font-semibold text-lg">
                    Rejected. Reason: {profileModal.leave.rejectReason || "Not specified"}
                  </p>
                ) : (
                  <p className="text-gray-600 font-semibold text-lg">Pending</p>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminLeavePage;
