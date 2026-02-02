
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiPlus,
  FiShield,
  FiSlash,
  FiUserPlus,
  FiEdit3,
  FiTrash2
} from "react-icons/fi";


const initialAdmins = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Ashwini new",
    email: "ashwinipatil@company.com",
    status: "Disabled",
    lastLogin: "Yesterday, 10:45 AM",
    created: "Feb 3,2025"
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Premya Patil",
    email: "PremyaPatil@company.com",
    status: "Active",
    lastLogin: "3 days ago",
    created: "Feb 5, 2025"
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Siddraj Naik",
    email: "SiddrajNaik@company.com",
    status: "Disabled",
    lastLogin: "Never",
    created: "Feb 5, 2025"
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Vaishnavi Patil",
    email: "VaishnaviPatil@company.com",
    status: "Active",
    lastLogin: "Outdated",
    created: "Apr 24, 2025"
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Nandish Patil",
    email: "NandishPatil@company.com",
    status: "Disabled",
    lastLogin: "2 hours ago",
    created: "Apr 24, 2025"
  }
];



export default function SuperAdminAdminManagement() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All");
  const [creatorFilter, setCreatorFilter] = useState("All Creators");
  const navigate = useNavigate();


  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",

  });



  const filtered = useMemo(() => {
    return admins.filter(a => {
      const matchSearch =
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.employeeId.toLowerCase().includes(search.toLowerCase());


      const matchStatus =
        statusFilter === "All Status" || a.status === statusFilter;

      const matchCreator =
        creatorFilter === "All Creators" ||
        a.creator === creatorFilter;

      const matchDate = (() => {
        if (dateFilter === "All") return true;
        const createdDate = new Date(a.created);
        const now = new Date();
        const diff = (now - createdDate) / (1000 * 60 * 60 * 24);
        return dateFilter === "7" ? diff <= 7 : diff <= 30;
      })();

      return matchSearch && matchStatus && matchCreator && matchDate;
    });
  }, [admins, search, statusFilter, creatorFilter, dateFilter]);



  const activeCount = useMemo(
    () => admins.filter(a => a.status === "Active").length,
    [admins]
  );

  const disabledCount = useMemo(
    () => admins.filter(a => a.status === "Disabled").length,
    [admins]
  );

  const createdThisMonth = useMemo(() => {
    const now = new Date();
    return admins.filter(a => {
      const d = new Date(a.created);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [admins]);
  const handleCreate = () => {
    if (!form.name || !form.email) return;

    setAdmins(prev => [
      ...prev,
      {
        id: Date.now(),
        employeeId: `EMP${String(prev.length + 1).padStart(3, "0")}`,
        name: form.name,
        email: form.email,
        status: form.status,
        lastLogin: "Never",
        created: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      }
    ]);

    setForm({ name: "", email: "", status: "Active" });
    setOpenCreate(false);
  };


  const handleEdit = () => {
    setAdmins(prev =>
      prev.map(a =>
        a.id === selected.id ? { ...a, ...form } : a
      )
    );
    setOpenEdit(false);
  };

  const handleDelete = id => {
    if (!window.confirm("Delete this admin?")) return;
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen w-[100%] ml-auto p-8 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">




      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin Management</h1>
          <p className="text-sm text-slate-500">
            Manage and monitor system administrators and their roles.
          </p>
        </div>
        {/* <br/> */}
        {/* <br/> */}


        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow"
        >
          <FiPlus size={16} />
          Create Admin
        </button>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 mb-7">
        <StatCard
          icon={<FiShield size={14} className="text-green-700" />}
          label="Active Admins"
          value={activeCount}
          badge={`${activeCount} total`}
          badgeColor="bg-green-100 text-green-600" />

        <StatCard
          icon={<FiSlash size={14} className="text-orange-600" />}
          label="Disabled Admins"
          value={disabledCount}
          badge={`${disabledCount} total`}
          badgeColor="bg-orange-100 text-orange-600" />

        <StatCard
          icon={<FiUserPlus size={14} className="text-blue-600" />}
          label="Admins Created"
          value={createdThisMonth}
          badge="This month"
          badgeColor="bg-blue-100 text-blue-600" />
      </div>
      <br />




      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b">

          <div className="flex items-center border rounded-xl px-3 h-10 w-full max-w-sm bg-slate-50">
            <FiSearch size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, or ID"
              className="ml-3 outline-none text-sm w-full bg-transparent"
            />
          </div>



          <div className="flex items-center gap-3">
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              // className="border rounded-lg px-3 py-2 text-sm bg-slate-50"
              className="h-10 px-3 text-sm rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"

            >
              <option value="All">All</option>
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>

            <select
              value={creatorFilter}
              onChange={e => setCreatorFilter(e.target.value)}
              // className="border rounded-lg px-3 py-2 text-sm bg-slate-50"
              // className="h-10 border rounded-lg px-3 text-sm bg-slate-50"
              className="h-10 px-3 text-sm rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"

            >
              <option>All Creators</option>
              <option>Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              // className="border rounded-lg px-3 py-2 text-sm bg-slate-50"
              className="h-10 px-3 text-sm rounded-lg bg-slate-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"

            >
              <option>All Status</option>
              <option>Active</option>
              <option>Disabled</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="text-left">Employee ID</th>
              <th className="text-left">Email</th>
              <th className="text-center">Status</th>
              {/* <th className="text-center">Last Login</th> */}
              <th className="text-right">Last Login</th>
              {/* <th className="text-center">Created</th> */}
              <th className="text-right">Created</th>
              <th className="pr-4 text-center">Actions</th>
            </tr>
          </thead>


          <tbody>
            {filtered.map(a => (
              // <tr key={a.id} className="border-t hover:bg-slate-50">
              <tr
                key={a.id}
                className="border-t hover:bg-slate-50 transition-colors"
              >

                <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                  {a.name}
                </td>

                <td className="whitespace-nowrap text-slate-600">
                  {a.employeeId}
                </td>


                <td className="text-slate-500 text-sm truncate max-w-[260px]">
                  {a.email}
                </td>


                <td className="text-center">
                  <span
                    className={`inline-flex items-center justify-center
                        min-w-[96px] px-3 py-1 rounded-full text-xs font-medium
                        ${a.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {a.status}
                  </span>

                </td>

                <td className="text-right text-slate-500 whitespace-nowrap">
                  {a.lastLogin}
                </td>

                <td className="text-right text-slate-500 whitespace-nowrap">
                  {a.created}
                </td>

                {/* <td className="text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      disabled
                      className="text-gray-400 cursor-not-allowed"
                      title="Delete disabled"> <FiTrash2 size={16} /></button>

                  </div>
                </td> */}
                <td className="text-center">
                  <div className="flex justify-center items-center gap-3">

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setSelected(a);
                        setForm(a);
                        setOpenEdit(true);
                      }}
                      className="p-2 rounded-md hover:bg-slate-100 text-blue-600"
                      title="Edit admin"
                    >
                      <FiEdit3 size={16} />
                    </button>

                    {/* Delete (disabled for now) */}
                    <button
                      disabled
                      className="p-2 rounded-md text-slate-400 cursor-not-allowed"
                      title="Delete disabled"
                    >
                      <FiTrash2 size={16} />
                    </button>

                  </div>
                </td>

              </tr>

            )
            
            
            
            )}
          </tbody>
        </table>
      </div>


      {openCreate && (
        <Modal
          title="Create Admin"
          form={form}
          setForm={setForm}
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreate}
        />
      )}


      {openEdit && (
        <Modal
          title="Edit Admin"
          form={form}
          setForm={setForm}
          onClose={() => setOpenEdit(false)}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}

function Modal({ title, form, setForm, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <div className="space-y-4">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />


        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}


function StatCard({ icon, label, value, badge, badgeColor }) {
  return (
    <div className="bg-white rounded-xl border p-5 flex items-center justify-between
                    transition-all duration-200
                    hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300">

      {/* Left */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <div className="text-sm text-slate-500">{label}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
        </div>
      </div>

      {/* Right badge */}
      <span
        className={`text-xs font-medium px-3 py-1 rounded-full ${badgeColor}`}
      >
        {badge}
      </span>
    </div>
  );
}
