import React, { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiShield,
  FiSlash,
  FiUserPlus,
  FiEdit3,
  FiTrash2,
  FiFilter,
  FiX,
  FiMail,
  FiUser,
  FiPhone,
  FiLock,
} from "react-icons/fi";

const initialAdmins = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Ashwini new",
    email: "ashwinipatil@company.com",
    status: "Disabled",
    lastLogin: "Yesterday, 10:45 AM",
    created: "Feb 3, 2025",
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Premya Patil",
    email: "PremyaPatil@company.com",
    status: "Active",
    lastLogin: "3 days ago",
    created: "Feb 5, 2025",
  },
  {
    id: 3,
    employeeId: "EMP003",
    name: "Siddraj Naik",
    email: "SiddrajNaik@company.com",
    status: "Disabled",
    lastLogin: "Never",
    created: "Feb 5, 2025",
  },
  {
    id: 4,
    employeeId: "EMP004",
    name: "Vaishnavi Patil",
    email: "VaishnaviPatil@company.com",
    status: "Active",
    lastLogin: "2 weeks ago",
    created: "Apr 24, 2025",
  },
  {
    id: 5,
    employeeId: "EMP005",
    name: "Nandish Patil",
    email: "NandishPatil@company.com",
    status: "Disabled",
    lastLogin: "2 hours ago",
    created: "Apr 24, 2025",
  },
];

export default function SuperAdminAdminManagement() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All");
  const [creatorFilter, setCreatorFilter] = useState("All Creators");
  const [showFilters, setShowFilters] = useState(false);

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
    status: "Active",
  });

  const filtered = useMemo(() => {
    return admins.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.employeeId.toLowerCase().includes(q);

      const matchStatus =
        statusFilter === "All Status" || a.status === statusFilter;

      const matchCreator = creatorFilter === "All Creators";

      const matchDate = (() => {
        if (dateFilter === "All") return true;
        const createdDate = new Date(a.created);
        const now = new Date();
        const diff =
          (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
        return dateFilter === "7" ? diff <= 7 : diff <= 30;
      })();

      return matchSearch && matchStatus && matchCreator && matchDate;
    });
  }, [admins, search, statusFilter, creatorFilter, dateFilter]);

  const activeCount = useMemo(
    () => admins.filter((a) => a.status === "Active").length,
    [admins]
  );

  const disabledCount = useMemo(
    () => admins.filter((a) => a.status === "Disabled").length,
    [admins]
  );

  const createdThisMonth = useMemo(() => {
    const now = new Date();
    return admins.filter((a) => {
      const d = new Date(a.created);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  }, [admins]);

  const resetForm = () => {
    setForm({
      name: "",
      username: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      status: "Active",
    });
  };

  const handleCreate = () => {
    if (!form.name || !form.email) return;

    setAdmins((prev) => [
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
          year: "numeric",
        }),
        username: form.username,
        phone: form.phone,
      },
    ]);

    resetForm();
    setOpenCreate(false);
  };

  const handleEdit = () => {
    if (!selected) return;

    setAdmins((prev) =>
      prev.map((a) =>
        a.id === selected.id
          ? {
              ...a,
              name: form.name,
              email: form.email,
              status: form.status,
              username: form.username,
              phone: form.phone,
            }
          : a
      )
    );

    setOpenEdit(false);
    setSelected(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this admin?")) return;
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Admin Management
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Manage and monitor system administrators and their roles.
            </p>
          </div>

          <button
            onClick={() => {
              resetForm();
              setOpenCreate(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 sm:px-6 sm:py-3"
          >
            <FiPlus size={18} />
            <span className="hidden sm:inline">Create Admin</span>
            <span className="sm:hidden">Create</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <StatCard
            icon={<FiShield size={20} className="text-green-600" />}
            label="Active Admins"
            value={activeCount}
            badge={`${activeCount} total`}
            badgeColor="bg-green-100 text-green-700"
            gradient="from-green-50 to-emerald-50"
            iconBg="bg-green-100"
          />

          <StatCard
            icon={<FiSlash size={20} className="text-orange-600" />}
            label="Disabled Admins"
            value={disabledCount}
            badge={`${disabledCount} total`}
            badgeColor="bg-orange-100 text-orange-700"
            gradient="from-orange-50 to-amber-50"
            iconBg="bg-orange-100"
          />

          <StatCard
            icon={<FiUserPlus size={20} className="text-blue-600" />}
            label="Admins Created"
            value={createdThisMonth}
            badge="This month"
            badgeColor="bg-blue-100 text-blue-700"
            gradient="from-blue-50 to-indigo-50"
            iconBg="bg-blue-100"
          />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Search + Filters */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="p-4 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 flex-1 items-center rounded-xl border-2 border-slate-200 bg-white px-4 transition-all duration-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100 sm:h-12">
                  <FiSearch size={20} className="text-slate-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, or ID..."
                    className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex h-11 items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 transition-colors hover:bg-slate-50 lg:hidden sm:h-12"
                >
                  <FiFilter size={18} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Filters</span>
                </button>
              </div>

              <div
                className={`${showFilters ? "flex" : "hidden"} flex-col gap-3 lg:flex sm:flex-row`}
              >
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-10 flex-1 cursor-pointer rounded-xl border-2 border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:h-11 sm:px-4"
                >
                  <option value="All">All Time</option>
                  <option value="7">Last 7 Days</option>
                  <option value="30">Last 30 Days</option>
                </select>

                <select
                  value={creatorFilter}
                  onChange={(e) => setCreatorFilter(e.target.value)}
                  className="h-10 flex-1 cursor-pointer rounded-xl border-2 border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:h-11 sm:px-4"
                >
                  <option>All Creators</option>
                  <option>Admin</option>
                  <option>Super Admin</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 flex-1 cursor-pointer rounded-xl border-2 border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:h-11 sm:px-4"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-sm">
              <thead className="border-b-2 border-slate-200 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="text-left font-semibold">Employee ID</th>
                  <th className="text-left font-semibold">Email</th>
                  <th className="text-center font-semibold">Status</th>
                  <th className="text-center font-semibold">Last Login</th>
                  <th className="text-center font-semibold">Created</th>
                  <th className="pr-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="transition-colors duration-150 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {a.name}
                    </td>
                    <td className="font-medium text-slate-600">{a.employeeId}</td>
                    <td className="max-w-[250px] truncate text-sm text-slate-500">
                      {a.email}
                    </td>
                    <td className="text-center">
                      <span
                        className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                          a.status === "Active"
                            ? "bg-green-100 text-green-700 ring-2 ring-green-200"
                            : "bg-red-100 text-red-700 ring-2 ring-red-200"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="text-center text-sm text-slate-600">{a.lastLogin}</td>
                    <td className="text-center text-sm text-slate-600">{a.created}</td>
                    <td className="pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelected(a);
                            setForm({
                              name: a.name,
                              username: a.username || "",
                              phone: a.phone || "",
                              email: a.email,
                              password: "",
                              confirmPassword: "",
                              status: a.status,
                            });
                            setOpenEdit(true);
                          }}
                          className="rounded-lg p-2 text-blue-600 transition-all duration-200 hover:scale-110 hover:bg-blue-50 active:scale-95"
                          title="Edit admin"
                        >
                          <FiEdit3 size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(a.id)}
                          className="rounded-lg p-2 text-red-600 transition-all duration-200 hover:scale-110 hover:bg-red-50 active:scale-95"
                          title="Delete admin"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-16 text-center text-slate-500">
                <p className="text-lg font-medium">No admins found</p>
                <p className="mt-1 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-100 lg:hidden">
            {filtered.map((a) => (
              <div key={a.id} className="p-4 transition-colors hover:bg-slate-50">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-base font-semibold text-slate-900">
                      {a.name}
                    </h3>
                    <p className="mb-1 text-sm text-slate-500">{a.email}</p>
                    <p className="text-xs font-medium text-slate-400">{a.employeeId}</p>
                  </div>

                  <span
                    className={`ml-2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                      a.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Last Login:</span>
                    <p className="mt-0.5 font-medium text-slate-700">{a.lastLogin}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Created:</span>
                    <p className="mt-0.5 font-medium text-slate-700">{a.created}</p>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-slate-100 pt-3">
                  <button
                    onClick={() => {
                      setSelected(a);
                      setForm({
                        name: a.name,
                        username: a.username || "",
                        phone: a.phone || "",
                        email: a.email,
                        password: "",
                        confirmPassword: "",
                        status: a.status,
                      });
                      setOpenEdit(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                  >
                    <FiEdit3 size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(a.id)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="py-16 text-center text-slate-500">
                <p className="text-base font-medium">No admins found</p>
                <p className="mt-1 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {openCreate && (
        <Modal
          title="Create Admin"
          form={form}
          setForm={setForm}
          onClose={() => {
            setOpenCreate(false);
            resetForm();
          }}
          onSubmit={handleCreate}
          submitText="Create Account"
        />
      )}

      {openEdit && (
        <Modal
          title="Edit Admin"
          form={form}
          setForm={setForm}
          onClose={() => {
            setOpenEdit(false);
            resetForm();
          }}
          onSubmit={handleEdit}
          submitText="Save Changes"
        />
      )}
    </div>
  );
}

function Modal({ title, form, setForm, onClose, onSubmit, submitText }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all">
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-200px)] space-y-4 overflow-y-auto p-6">
          <Field
            label="Full Name *"
            icon={<FiUser size={18} className="text-slate-400" />}
            value={form.name}
            placeholder="Enter full name"
            onChange={(v) => setForm({ ...form, name: v })}
          />

          <Field
            label="Username"
            icon={<FiUser size={18} className="text-slate-400" />}
            value={form.username}
            placeholder="Enter username"
            onChange={(v) => setForm({ ...form, username: v })}
          />

          <Field
            label="Phone Number"
            icon={<FiPhone size={18} className="text-slate-400" />}
            value={form.phone}
            placeholder="Enter phone number"
            onChange={(v) => setForm({ ...form, phone: v })}
          />

          <Field
            label="Email Address *"
            icon={<FiMail size={18} className="text-slate-400" />}
            type="email"
            value={form.email}
            placeholder="Enter email address"
            onChange={(v) => setForm({ ...form, email: v })}
          />

          <Field
            label="Password"
            icon={<FiLock size={18} className="text-slate-400" />}
            type="password"
            value={form.password}
            placeholder="Enter password"
            onChange={(v) => setForm({ ...form, password: v })}
          />

          <Field
            label="Confirm Password"
            icon={<FiLock size={18} className="text-slate-400" />}
            type="password"
            value={form.confirmPassword}
            placeholder="Confirm password"
            onChange={(v) => setForm({ ...form, confirmPassword: v })}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full cursor-pointer rounded-xl border-2 border-slate-200 px-4 py-3 transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 border-t border-slate-200 bg-slate-50 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-slate-300 px-4 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="flex-1 transform rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl active:scale-95"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border-2 border-slate-200 py-3 pl-10 pr-4 transition-all duration-200 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, badge, badgeColor, gradient, iconBg }) {
  return (
    <div
      className={`cursor-pointer rounded-2xl border-2 border-white bg-gradient-to-br ${gradient} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-200 sm:p-6`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} shadow-lg transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14`}
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 text-xs font-medium text-slate-600 sm:text-sm">
              {label}
            </div>
            <div className="text-2xl font-bold text-slate-900 sm:text-3xl">{value}</div>
          </div>
        </div>
        <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${badgeColor}`}>
          {badge}
        </span>
      </div>
    </div>
  );
}
