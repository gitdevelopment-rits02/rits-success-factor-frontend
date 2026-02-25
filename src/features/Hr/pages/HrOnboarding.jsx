import { useState, useMemo, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import hrOnboardingThunk from "../Redux/thunks/HrOnboardingThunk";
import {
  FiUsers, FiCheckCircle, FiPauseCircle, FiEdit2, FiTrash2,
  FiUser, FiBriefcase, FiDollarSign, FiUmbrella, FiMonitor, FiFileText,
  FiMapPin, FiTarget, FiPhone, FiMail, FiCalendar, FiClock, FiAward,
  FiPlusCircle, FiX, FiCheck, FiAlertCircle, FiUpload, FiFile, FiSearch,
  FiChevronLeft, FiChevronRight, FiHome, FiAlertTriangle
} from "react-icons/fi";
import {
  HiOutlineOfficeBuilding, HiOutlineDocumentText, HiOutlineIdentification
} from "react-icons/hi";
import { BsPerson, BsPersonBadge, BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { MdOutlineAttachMoney, MdWorkOutline } from "react-icons/md";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const INITIAL_EMPLOYEES = [
  {
    id: "EMP001", name: "Rahul Sharma", role: "Software Engineer", department: "Engineering",
    email: "rahul.sharma@successfactor.com", phone: "+91 98765 43210", status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul", type: "Employee",
    manager: "Priya Sharma", headline: "Senior Software Engineer | Full-Stack Specialist",
    designation: "Software Engineer", joiningDate: "2022-03-15", workLocation: "Bangalore",
    workType: "Hybrid", bloodGroup: "O+", address: "42 Tech Park Road", city: "Bangalore",
    zip: "560001", username: "rahul.sharma",
    qualifications: [
      { id: "q1", degree: "B.Tech in Computer Science", institution: "IIT Bombay", year: "2020" },
      { id: "q2", degree: "M.Tech in Software Engineering", institution: "BITS Pilani", year: "2022" }
    ],
    skills: [{ id: "s1", name: "React", category: "Frontend" }, { id: "s2", name: "Node.js", category: "Backend" }],
    assets: [
      { id: "a1", name: "MacBook Pro 14\"", serial: "MBP-2022-44821", assignedDate: "2022-03-20" },
      { id: "a2", name: "Dell 27\" Monitor", serial: "DLL-MON-77234", assignedDate: "2022-03-20" }
    ],
    documents: [
      { id: "d1", name: "Offer Letter", fileName: "offer_letter_rahul.pdf" },
      { id: "d2", name: "ID Proof - Aadhaar", fileName: "aadhaar_rahul.pdf" }
    ],
    salary: {
      annualCTC: 700000,
      components: [
        { id: "sc1", name: "Basic", amount: 270640, type: "earning" },
        { id: "sc2", name: "HRA", amount: 135320, type: "earning" },
        { id: "sc3", name: "Conveyance", amount: 19200, type: "earning" },
        { id: "sc4", name: "Special Allowance", amount: 251440, type: "earning" },
        { id: "sc5", name: "PF - Employee", amount: 21600, type: "deduction" },
        { id: "sc6", name: "Professional Tax", amount: 2400, type: "deduction" }
      ]
    },
    leaves: { annual: 18, sick: 12, casual: 6, maternity: 0 },
    lastLogin: "Never", createdAt: "2/15/2026"
  },
  {
    id: "EMP002", name: "Priya Sharma", role: "Engineering Manager", department: "Engineering",
    email: "priya.sharma@successfactor.com", phone: "+91 98765 11111", status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya", type: "Employee",
    manager: "CEO", headline: "Engineering Manager | People Leader",
    designation: "Engineering Manager", joiningDate: "2020-01-10", workLocation: "Bangalore",
    workType: "On-site", bloodGroup: "A+", address: "15 MG Road", city: "Bangalore",
    zip: "560008", username: "priya.sharma",
    qualifications: [{ id: "q1", degree: "B.Tech in CS", institution: "IIT Delhi", year: "2018" }],
    skills: [{ id: "s1", name: "Leadership", category: "Soft Skills" }],
    assets: [{ id: "a1", name: "MacBook Pro 16\"", serial: "MBP-2020-33211", assignedDate: "2020-01-15" }],
    documents: [{ id: "d1", name: "Offer Letter", fileName: "offer_priya.pdf" }],
    salary: {
      annualCTC: 1800000,
      components: [
        { id: "sc1", name: "Basic", amount: 700000, type: "earning" },
        { id: "sc2", name: "HRA", amount: 350000, type: "earning" },
        { id: "sc3", name: "Special Allowance", amount: 700000, type: "earning" },
        { id: "sc4", name: "PF - Employee", amount: 50000, type: "deduction" }
      ]
    },
    leaves: { annual: 21, sick: 12, casual: 6, maternity: 180 },
    lastLogin: "2/15/2026", createdAt: "1/10/2020"
  },
  {
    id: "EMP003", name: "Amit Verma", role: "UI/UX Designer", department: "Design",
    email: "amit.verma@successfactor.com", phone: "+91 97654 32109", status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit", type: "Employee",
    manager: "Design Head", headline: "UI/UX Designer | Product Thinker",
    designation: "Senior Designer", joiningDate: "2021-06-01", workLocation: "Mumbai",
    workType: "Remote", bloodGroup: "B+", address: "22 Bandra West", city: "Mumbai",
    zip: "400050", username: "amit.verma",
    qualifications: [{ id: "q1", degree: "B.Des", institution: "NID Ahmedabad", year: "2019" }],
    skills: [{ id: "s1", name: "Figma", category: "Design" }, { id: "s2", name: "Prototyping", category: "Design" }],
    assets: [{ id: "a1", name: "iPad Pro", serial: "IPD-2021-22198", assignedDate: "2021-06-10" }],
    documents: [{ id: "d1", name: "Offer Letter", fileName: "offer_amit.pdf" }],
    salary: {
      annualCTC: 900000,
      components: [
        { id: "sc1", name: "Basic", amount: 350000, type: "earning" },
        { id: "sc2", name: "HRA", amount: 175000, type: "earning" },
        { id: "sc3", name: "Special Allowance", amount: 340000, type: "earning" },
        { id: "sc4", name: "PF - Employee", amount: 35000, type: "deduction" }
      ]
    },
    leaves: { annual: 18, sick: 12, casual: 6, maternity: 0 },
    lastLogin: "2/16/2026", createdAt: "6/1/2021"
  },
  {
    id: "EMP004", name: "Sneha Patel", role: "HR Manager", department: "HR",
    email: "sneha.patel@successfactor.com", phone: "+91 96543 21098", status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sneha", type: "Employee",
    manager: "CHRO", headline: "HR Manager | Culture Builder",
    designation: "HR Manager", joiningDate: "2019-09-15", workLocation: "Delhi",
    workType: "On-site", bloodGroup: "AB+", address: "5 Connaught Place", city: "Delhi",
    zip: "110001", username: "sneha.patel",
    qualifications: [{ id: "q1", degree: "MBA in HR", institution: "XLRI Jamshedpur", year: "2017" }],
    skills: [{ id: "s1", name: "Recruitment", category: "HR" }],
    assets: [{ id: "a1", name: "Lenovo ThinkPad", serial: "LNV-2019-55431", assignedDate: "2019-09-20" }],
    documents: [{ id: "d1", name: "Offer Letter", fileName: "offer_sneha.pdf" }],
    salary: {
      annualCTC: 850000,
      components: [
        { id: "sc1", name: "Basic", amount: 330000, type: "earning" },
        { id: "sc2", name: "HRA", amount: 165000, type: "earning" },
        { id: "sc3", name: "Special Allowance", amount: 315000, type: "earning" },
        { id: "sc4", name: "PF - Employee", amount: 33000, type: "deduction" }
      ]
    },
    leaves: { annual: 18, sick: 12, casual: 6, maternity: 0 },
    lastLogin: "2/17/2026", createdAt: "9/15/2019"
  },
  {
    id: "EMP005", name: "Karan Mehta", role: "Sales Executive", department: "Sales",
    email: "karan.mehta@successfactor.com", phone: "+91 95432 10987", status: "Inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karan", type: "Employee",
    manager: "Sales Head", headline: "Sales Executive | Revenue Driver",
    designation: "Sales Executive", joiningDate: "2023-02-20", workLocation: "Hyderabad",
    workType: "Hybrid", bloodGroup: "O-", address: "8 HITEC City", city: "Hyderabad",
    zip: "500081", username: "karan.mehta",
    qualifications: [{ id: "q1", degree: "BBA", institution: "Symbiosis", year: "2021" }],
    skills: [{ id: "s1", name: "CRM", category: "Sales" }],
    assets: [],
    documents: [{ id: "d1", name: "Offer Letter", fileName: "offer_karan.pdf" }],
    salary: {
      annualCTC: 600000,
      components: [
        { id: "sc1", name: "Basic", amount: 230000, type: "earning" },
        { id: "sc2", name: "HRA", amount: 115000, type: "earning" },
        { id: "sc3", name: "Special Allowance", amount: 225000, type: "earning" },
        { id: "sc4", name: "PF - Employee", amount: 27000, type: "deduction" }
      ]
    },
    leaves: { annual: 15, sick: 10, casual: 5, maternity: 0 },
    lastLogin: "Never", createdAt: "2/20/2023"
  },
  {
    id: "EMP006", name: "Divya Nair", role: "Finance Analyst", department: "Finance",
    email: "divya.nair@successfactor.com", phone: "+91 94321 09876", status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=divya", type: "Employee",
    manager: "CFO", headline: "Finance Analyst | Numbers Whisperer",
    designation: "Finance Analyst", joiningDate: "2021-11-01", workLocation: "Pune",
    workType: "On-site", bloodGroup: "A-", address: "33 Koregaon Park", city: "Pune",
    zip: "411001", username: "divya.nair",
    qualifications: [{ id: "q1", degree: "CA", institution: "ICAI", year: "2020" }],
    skills: [{ id: "s1", name: "Excel", category: "Finance" }, { id: "s2", name: "SAP", category: "Finance" }],
    assets: [{ id: "a1", name: "HP EliteBook", serial: "HP-2021-88732", assignedDate: "2021-11-05" }],
    documents: [{ id: "d1", name: "Offer Letter", fileName: "offer_divya.pdf" }],
    salary: {
      annualCTC: 800000,
      components: [
        { id: "sc1", name: "Basic", amount: 310000, type: "earning" },
        { id: "sc2", name: "HRA", amount: 155000, type: "earning" },
        { id: "sc3", name: "Special Allowance", amount: 300000, type: "earning" },
        { id: "sc4", name: "PF - Employee", amount: 31000, type: "deduction" }
      ]
    },
    leaves: { annual: 18, sick: 12, casual: 6, maternity: 0 },
    lastLogin: "2/14/2026", createdAt: "11/1/2021"
  }
];

const DEPARTMENTS = ["All Departments", "Engineering", "Design", "HR", "Sales", "Finance", "Marketing", "Administration"];
const STATUS_OPTS = ["All Status", "Active", "Inactive", "Pending"];
const genId = () => "EMP" + Math.random().toString(36).substr(2, 6).toUpperCase();
const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

function collectChanges(orig, curr) {
  const changes = [];
  const basicFields = ["name", "phone", "bloodGroup", "headline", "designation", "department", "manager", "joiningDate", "workLocation", "workType", "status", "address", "city", "zip"];
  basicFields.forEach(f => {
    if (orig[f] !== curr[f]) {
      const section = ["address", "city", "zip"].includes(f) ? "Address" : ["name", "phone", "bloodGroup", "headline"].includes(f) ? "Personal" : "Work Details";
      changes.push({ section, field: f.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()), from: String(orig[f] || "—"), to: String(curr[f] || "—") });
    }
  });
  if (orig.salary.annualCTC !== curr.salary.annualCTC)
    changes.push({ section: "Salary", field: "Annual CTC", from: fmt(orig.salary.annualCTC), to: fmt(curr.salary.annualCTC) });
  curr.salary.components.forEach(sc => {
    const found = orig.salary.components.find(o => o.id === sc.id);
    if (!found) changes.push({ section: "Salary", field: `${sc.name} (New)`, from: "—", to: fmt(sc.amount) });
    else if (found.amount !== sc.amount) changes.push({ section: "Salary", field: sc.name, from: fmt(found.amount), to: fmt(sc.amount) });
  });
  orig.salary.components.forEach(o => { if (!curr.salary.components.find(sc => sc.id === o.id)) changes.push({ section: "Salary", field: `${o.name} (Removed)`, from: fmt(o.amount), to: "Deleted" }); });
  curr.assets.forEach(a => { if (!orig.assets.find(o => o.id === a.id)) changes.push({ section: "Assets", field: `${a.name} (New)`, from: "—", to: `S/N: ${a.serial}` }); });
  orig.assets.forEach(o => { if (curr.assets.find(a => a.id === o.id && a._removed)) changes.push({ section: "Assets", field: `${o.name} (Return)`, from: `S/N: ${o.serial}`, to: "Returned" }); });
  ["annual", "sick", "casual", "maternity"].forEach(lt => {
    if (orig.leaves[lt] !== curr.leaves[lt]) changes.push({ section: "Leaves", field: `${lt.charAt(0).toUpperCase() + lt.slice(1)} Leave`, from: `${orig.leaves[lt]} days`, to: `${curr.leaves[lt]} days` });
  });
  return changes;
}

const DEPT_COLORS = {
  Engineering: "bg-blue-100 text-blue-700",
  Design: "bg-purple-100 text-purple-700",
  HR: "bg-pink-100 text-pink-700",
  Sales: "bg-orange-100 text-orange-700",
  Finance: "bg-green-100 text-green-700",
  Marketing: "bg-yellow-100 text-yellow-700",
  Administration: "bg-gray-100 text-gray-700",
};

const DEPT_AVATAR_COLORS = {
  Engineering: "from-blue-500 to-blue-600",
  Design: "from-purple-500 to-pink-500",
  HR: "from-pink-500 to-rose-500",
  Sales: "from-orange-500 to-amber-500",
  Finance: "from-green-500 to-emerald-500",
  Marketing: "from-yellow-500 to-orange-400",
  Administration: "from-gray-500 to-slate-500",
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function HrOnboarding() {
  const dispatch = useDispatch();
  const {
    getEmployeesLoading,
    getEmployeeByIdLoading,
    getDashboardCardsLoading,
    employees,
    pagination,
    dashboardCards,
    error
  } = useSelector((state) => state.hr.onboarding);

  const [screen, setScreen] = useState("list"); // list | profile | edit | add
  const [selectedId, setSelectedId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    dispatch(hrOnboardingThunk.getEmployeesThunk());
    dispatch(hrOnboardingThunk.getDashboardCardsThunk());
  }, [dispatch]);

  const handleSearch = () => {
    const params = {};
    if (searchQuery) params.employeeName = searchQuery;
    if (deptFilter !== "All Departments") params.department = deptFilter;
    if (statusFilter !== "All Status") params.status = statusFilter.toLowerCase();
    dispatch(hrOnboardingThunk.getEmployeesThunk(params));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, deptFilter, statusFilter]);


  const selectedEmployee = useSelector((state) => state.hr.onboarding.selectedEmployee);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = !searchQuery ||
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = deptFilter === "All Departments" || emp.department === deptFilter;
      const matchStatus = statusFilter === "All Status" || emp.status === statusFilter;
      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, searchQuery, deptFilter, statusFilter]);

  const stats = useMemo(() => ({
    active: dashboardCards?.active || 0,
    inactive: dashboardCards?.inactive || 0,
    total: dashboardCards?.totalEmployees || 0,
    depts: dashboardCards?.departments || 0
  }), [dashboardCards]);

  const goToProfile = (id) => {
    setSelectedId(id);
    dispatch(hrOnboardingThunk.getEmployeeByIdThunk(id));
    setScreen("profile");
  };
  const goToEdit = () => { setEditData(deepClone(selectedEmployee)); setScreen("edit"); };
  const goToList = () => { setScreen("list"); setSelectedId(null); setEditData(null); };
  const goBackToProfile = () => { setEditData(null); setScreen("profile"); };

  const upd = (k, v) => setEditData(p => ({ ...p, [k]: v }));
  const updSalary = (k, v) => setEditData(p => ({ ...p, salary: { ...p.salary, [k]: v } }));
  const updSC = (id, f, v) => setEditData(p => ({ ...p, salary: { ...p.salary, components: p.salary.components.map(c => c.id === id ? { ...c, [f]: v } : c) } }));
  const removeSC = (id) => setEditData(p => ({ ...p, salary: { ...p.salary, components: p.salary.components.filter(c => c.id !== id) } }));
  const addSC = () => setEditData(p => ({ ...p, salary: { ...p.salary, components: [...p.salary.components, { id: genId(), name: "New Component", amount: 0, type: "earning" }] } }));
  const updDyn = (k, id, f, v) => setEditData(p => ({ ...p, [k]: p[k].map(i => i.id === id ? { ...i, [f]: v } : i) }));
  const addDyn = (k, init) => setEditData(p => ({ ...p, [k]: [...p[k], { ...init, id: genId() }] }));
  const removeDyn = (k, id) => setEditData(p => ({ ...p, [k]: p[k].filter(i => i.id !== id) }));
  const toggleReturn = (id) => setEditData(p => ({ ...p, assets: p.assets.map(a => a.id === id ? { ...a, _removed: !a._removed } : a) }));

  const changes = useMemo(() => {
    if (screen !== "edit" || !selectedEmployee || !editData) return [];
    return collectChanges(selectedEmployee, editData);
  }, [selectedEmployee, editData, screen]);

  const netMonthly = editData ? editData.salary.components.reduce((s, c) => c.type === "earning" ? s + c.amount : s - c.amount, 0) : 0;

  const handleConfirmSave = () => {
    // For now we just mock the update in local state or refetch
    dispatch(hrOnboardingThunk.updateEmployeeThunk({ id: editData._id, data: editData }))
      .then(() => {
        setSaved(true); setShowConfirmModal(false);
        setTimeout(() => { setSaved(false); setSelectedId(editData._id); setScreen("profile"); setEditData(null); }, 2000);
      });
  };

  const handleDeleteEmployee = (id) => {
    dispatch(hrOnboardingThunk.deleteEmployeeThunk(id));
  };

  if (screen === "add") return (
    <AddEmployeeScreen
      onSave={(formData) => {
        dispatch(hrOnboardingThunk.addEmployeeThunk(formData))
          .then(() => { setScreen("list"); });
      }}
      onCancel={() => setScreen("list")}
    />
  );
  if (screen === "profile") {
    if (getEmployeeByIdLoading) return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse">Loading profile details...</p>
        </div>
      </div>
    );
    if (!selectedEmployee) return null;
    return <ProfileScreen employee={selectedEmployee} onBack={goToList} onEdit={goToEdit} />;
  }
  if (screen === "edit" && editData) return (
    <EditScreen
      employee={selectedEmployee} editData={editData} changes={changes} netMonthly={netMonthly}
      onBack={goBackToProfile} onDiscard={goBackToProfile}
      upd={upd} updSalary={updSalary} updSC={updSC} removeSC={removeSC} addSC={addSC}
      updDyn={updDyn} addDyn={addDyn} removeDyn={removeDyn} toggleReturn={toggleReturn}
      onSave={() => setShowConfirmModal(true)} showModal={showConfirmModal}
      onConfirm={handleConfirmSave} onCancelModal={() => setShowConfirmModal(false)}
      saved={saved}
    />
  );

  // ── LIST SCREEN ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Employee Management</h1>
            <p className="text-slate-500 text-sm mt-1">Manage and monitor your team members and their roles.</p>
          </div>
          <button onClick={() => setScreen("add")}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all duration-150 w-fit">
            <FiPlusCircle className="w-4 h-4" /> Add Employee
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Employees", value: stats.total, Icon: FiUsers, sub: "All members", color: "bg-blue-50 border-blue-100", iconBg: "bg-blue-100", iconColor: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
            { label: "Active", value: stats.active, Icon: FiCheckCircle, sub: "Working now", color: "bg-green-50 border-green-100", iconBg: "bg-green-100", iconColor: "text-green-600", badge: "bg-green-100 text-green-700" },
            { label: "Inactive", value: stats.inactive, Icon: FiPauseCircle, sub: "On leave/exit", color: "bg-orange-50 border-orange-100", iconBg: "bg-orange-100", iconColor: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
            { label: "Departments", value: stats.depts, Icon: FiPauseCircle, sub: "Active depts", color: "bg-purple-50 border-purple-100", iconBg: "bg-purple-100", iconColor: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
          ].map(stat => (
            <div key={stat.label} className={`${stat.color} border rounded-2xl p-4 sm:p-5 flex items-center gap-3`}>
              <div className={`${stat.iconBg} rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0`}>
                <stat.Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-slate-500 font-semibold truncate">{stat.label}</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.badge}`}>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, ID or role..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition" />
            </div>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition font-medium min-w-[160px]">
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition font-medium min-w-[130px]">
              {STATUS_OPTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {["Name", "Employee ID", "Department", "Email", "Status", "Last Login", "Created", "Actions"].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-16 text-slate-400 text-sm font-medium">No employees found matching your search.</td></tr>
                ) : filteredEmployees.map((emp, i) => (
                  <tr key={emp._id} className={`border-b border-slate-50 hover:bg-blue-50/40 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}
                    onClick={() => goToProfile(emp._id)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${DEPT_AVATAR_COLORS[emp.department] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-slate-600 font-semibold">{emp.employeeNo}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${DEPT_COLORS[emp.department] || "bg-gray-100 text-gray-700"}`}>{emp.department}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{emp.email}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${emp.status === "active" ? "bg-green-100 text-green-700" : emp.status === "inactive" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-700"}`}>{emp.status}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{emp.lastLogin || "Never"}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{new Date(emp.created).toLocaleDateString()}</td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => goToProfile(emp._id)} className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition" title="Edit">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => { if (window.confirm(`Delete ${emp.name}?`)) handleDeleteEmployee(emp._id); }} className="p-1.5 text-red-400 hover:bg-red-100 rounded-lg transition" title="Delete">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No employees found.</div>
            ) : filteredEmployees.map(emp => (
              <div key={emp._id} className="p-4 hover:bg-slate-50 transition cursor-pointer" onClick={() => goToProfile(emp._id)}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${DEPT_AVATAR_COLORS[emp.department] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white font-black text-base flex-shrink-0`}>
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{emp.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${emp.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{emp.status}</span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">{emp.designation} · {emp.email}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">{emp.employeeNo}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${DEPT_COLORS[emp.department] || "bg-gray-100 text-gray-700"}`}>{emp.department}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 font-medium">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </div>
      </div>
      {saved && <Toast msg="Employee updated successfully!" />}
    </div>
  );
}

// ─── PROFILE SCREEN ────────────────────────────────────────────────────────────
function ProfileScreen({ employee: emp, onBack, onEdit }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 transition">
          <FiChevronLeft className="w-4 h-4" /> Back to Employees
        </button>

        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${DEPT_AVATAR_COLORS[emp?.department] || "from-blue-500 to-blue-600"} flex items-center justify-center text-white font-black text-3xl flex-shrink-0 shadow-lg`}>
            {emp?.name?.charAt(0) || "?"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{emp.employeeName}</h2>
            <p className="text-slate-400 text-sm mt-1">{emp.workDetails?.designation} · {emp.workDetails?.department}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Chip label={emp.employeeNo} className="bg-white/10 text-white" />
              <Chip label={emp.status} className={emp.status === "active" ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"} />
              <Chip label={emp.workDetails?.workType} className="bg-white/10 text-white" />
            </div>
          </div>
          <button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 transition flex items-center gap-2 w-full sm:w-auto justify-center">
            <FiEdit2 className="w-4 h-4" /> Edit Employee
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Personal Info" Icon={FiUser}>
            <InfoRow label="Email" value={emp.officialEmail} />
            <InfoRow label="Phone" value={emp.phoneNumber} />
            <InfoRow label="Blood Group" value={emp.personalDetails?.bloodGroup} />
            <InfoRow label="City" value={emp.personalDetails?.city} />
            <InfoRow label="Pincode" value={emp.personalDetails?.pincode} />
          </InfoCard>
          <InfoCard title="Work Details" Icon={FiBriefcase}>
            <InfoRow label="Department" value={emp.workDetails?.department} />
            <InfoRow label="Designation" value={emp.workDetails?.designation} />
            <InfoRow label="Joined" value={new Date(emp.workDetails?.dateOfJoining).toLocaleDateString()} />
            <InfoRow label="Status" value={emp.status} />
            <InfoRow label="Work Mode" value={emp.workDetails?.workType} />
          </InfoCard>
          <InfoCard title="Salary" Icon={FiDollarSign}>
            <InfoRow label="Annual CTC" value={fmt(emp.salary?.annualCTC || 0)} highlight />
            {emp.salary?.components?.map(c => (
              <InfoRow key={c.id} label={c.name} value={fmt(c.amount)} tag={c.type === "deduction" ? "deduction" : "earning"} />
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <InfoRow label="Net Monthly" value={fmt(emp.salary?.components?.reduce((s, c) => c.type === "earning" ? s + c.amount : s - c.amount, 0) || 0)} highlight />
            </div>
          </InfoCard>
          <InfoCard title="Assets & Leaves" Icon={FiMonitor}>
            {emp.assets?.length > 0 ? emp.assets.map(a => <InfoRow key={a.id} label={a.name} value={a.serial} />) : <p className="text-slate-400 text-xs italic">No assets assigned</p>}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <InfoRow label="Annual Leave" value={`${emp.leaves?.annual || 0} days`} />
              <InfoRow label="Sick Leave" value={`${emp.leaves?.sick || 0} days`} />
              <InfoRow label="Casual Leave" value={`${emp.leaves?.casual || 0} days`} />
            </div>
          </InfoCard>
          {emp.documents?.length > 0 && (
            <InfoCard title="Documents" Icon={FiFileText}>
              {emp.documents.map(d => <InfoRow key={d.id} label={d.name} value={d.fileName} />)}
            </InfoCard>
          )}
          {emp.qualifications?.length > 0 && (
            <InfoCard title="Qualifications" Icon={FiAward}>
              {emp.qualifications.map(q => (
                <div key={q.id} className="py-2 border-b border-slate-50 last:border-0">
                  <div className="font-bold text-slate-800 text-sm">{q.degree}</div>
                  <div className="text-xs text-slate-500">{q.institution} · {q.year}</div>
                </div>
              ))}
            </InfoCard>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── EDIT SCREEN ──────────────────────────────────────────────────────────────
function EditScreen({ employee, editData, changes, netMonthly, onBack, onDiscard, upd, updSalary, updSC, removeSC, addSC, updDyn, addDyn, removeDyn, toggleReturn, onSave, showModal, onConfirm, onCancelModal, saved }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sticky topbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-3 py-2 rounded-lg transition">← Back</button>
          <div>
            <div className="font-black text-slate-900 text-sm sm:text-base">{employee.name}</div>
            <div className="text-blue-600 font-bold text-xs">● Edit Mode Active</div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {changes.length > 0 && (
            <span className="hidden sm:block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-lg">{changes.length} unsaved</span>
          )}
          <button onClick={onDiscard} className="border border-slate-200 text-slate-600 font-bold text-xs px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 transition">Discard</button>
          <button onClick={onSave} disabled={changes.length === 0}
            className={`font-bold text-xs px-4 sm:px-5 py-2 rounded-lg transition ${changes.length > 0 ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}>
            Save Changes
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-2 flex flex-wrap gap-4">
        {[["#e8f0fe", "#4285f4", "Saved Value"], ["#fff", "#3d5afe", "Edited / New"], ["#fce8e6", "#f5c6c3", "Removed"]].map(([bg, bd, label]) => (
          <div key={label} className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <div style={{ background: bg, border: `1.5px solid ${bd}`, width: 28, height: 14, borderRadius: 4 }} />
            {label}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-4">
        {/* Personal */}
        <EditSection title="Personal Information" Icon={FiUser}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EF label="Full Name" value={editData.name} orig={employee.name} onChange={v => upd("name", v)} />
            <EF label="Phone Number" value={editData.phone} orig={employee.phone} onChange={v => upd("phone", v)} />
            <EF label="Blood Group" value={editData.bloodGroup} orig={employee.bloodGroup} onChange={v => upd("bloodGroup", v)} type="select" opts={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />
            <EF label="Professional Headline" value={editData.headline} orig={employee.headline} onChange={v => upd("headline", v)} />
          </div>
        </EditSection>

        {/* Work */}
        <EditSection title="Work Details" Icon={FiBriefcase}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EF label="Designation" value={editData.designation} orig={employee.designation} onChange={v => upd("designation", v)} />
            <EF label="Department" value={editData.department} orig={employee.department} onChange={v => upd("department", v)} type="select" opts={["Engineering", "Marketing", "Sales", "Design", "HR", "Finance", "Administration"]} />
            <EF label="Reporting Manager" value={editData.manager} orig={employee.manager} onChange={v => upd("manager", v)} />
            <EF label="Work Location" value={editData.workLocation} orig={employee.workLocation} onChange={v => upd("workLocation", v)} />
            <EF label="Work Type" value={editData.workType} orig={employee.workType} onChange={v => upd("workType", v)} type="select" opts={["On-site", "Remote", "Hybrid"]} />
            <EF label="Status" value={editData.status} orig={employee.status} onChange={v => upd("status", v)} type="select" opts={["Active", "Pending", "Inactive"]} />
            <EF label="Date of Joining" value={editData.joiningDate} orig={employee.joiningDate} onChange={v => upd("joiningDate", v)} type="date" />
          </div>
        </EditSection>

        {/* Salary */}
        <EditSection title="Salary Structure" Icon={FiDollarSign}>
          <div className="mb-4 max-w-xs">
            <EF label="Annual CTC (₹)" value={editData.salary.annualCTC} orig={employee.salary.annualCTC} onChange={v => updSalary("annualCTC", Number(v))} type="number" />
          </div>
          <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1fr_80px] gap-3 px-3 mb-2">
            {["Component", "Monthly (₹)", "Type", ""].map(h => <div key={h} className="text-xs font-black text-slate-400 uppercase tracking-wider">{h}</div>)}
          </div>
          {editData.salary.components.map(comp => {
            const orig = employee.salary.components.find(c => c.id === comp.id);
            const isNew = !orig;
            const amtEdited = orig && orig.amount !== comp.amount;
            return (
              <div key={comp.id} style={{ background: isNew ? "#fff" : "#e8f0fe", border: `1.5px solid ${isNew ? "#4285f4" : "#c5d8fc"}` }}
                className="rounded-xl p-3 mb-2.5 grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_1fr_80px] gap-2 sm:gap-3 items-start sm:items-center">
                {isNew && <div className="sm:hidden text-xs font-black text-blue-600 tracking-wider">NEW COMPONENT</div>}
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1 sm:hidden">Component</div>
                  {isNew && <div className="text-xs font-black text-blue-600 tracking-wider mb-0.5 hidden sm:block">NEW</div>}
                  <input value={comp.name} onChange={e => updSC(comp.id, "name", e.target.value)} disabled={!isNew}
                    className="w-full border-none bg-transparent text-sm font-bold text-slate-900 outline-none" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1 sm:hidden">Monthly (₹)</div>
                  <input type="number" value={comp.amount} onChange={e => updSC(comp.id, "amount", Number(e.target.value))}
                    style={{ border: amtEdited || isNew ? "1.5px solid #4285f4" : "1.5px solid transparent", background: amtEdited || isNew ? "#fff" : "transparent" }}
                    className="w-full rounded-md px-2 py-1.5 text-sm font-bold text-slate-900 outline-none" />
                  {amtEdited && orig && <div className="text-xs text-red-500 font-bold mt-0.5">was {fmt(orig.amount)}</div>}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1 sm:hidden">Type</div>
                  <select value={comp.type} onChange={e => updSC(comp.id, "type", e.target.value)}
                    className="border-none bg-transparent text-xs font-black outline-none cursor-pointer"
                    style={{ color: comp.type === "deduction" ? "#ea4335" : "#0d8a4e" }}>
                    <option value="earning">Earning</option>
                    <option value="deduction">Deduction</option>
                  </select>
                </div>
                <button onClick={() => removeSC(comp.id)} className="bg-red-50 hover:bg-red-100 text-red-500 text-xs font-black rounded-lg px-3 py-1.5 transition w-fit">Remove</button>
              </div>
            );
          })}
          {employee.salary.components.filter(o => !editData.salary.components.find(c => c.id === o.id)).map(del => (
            <div key={del.id} className="rounded-xl p-3 mb-2.5 grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_1fr_80px] gap-2 opacity-70" style={{ background: "#fce8e6", border: "1.5px solid #f5c6c3" }}>
              <div className="text-sm font-bold text-red-500 line-through">{del.name}</div>
              <div className="text-sm font-bold text-red-500 line-through">{fmt(del.amount)}</div>
              <div className="text-xs text-red-500 font-black">REMOVED</div>
            </div>
          ))}
          <div className="grid grid-cols-[2fr_1.5fr_1fr_80px] gap-3 p-3 bg-slate-900 rounded-xl mt-2 mb-3">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Net Monthly</div>
            <div className="text-base font-black text-green-400">{fmt(netMonthly)}</div>
          </div>
          <button onClick={addSC} className="border-2 border-dashed border-blue-400 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ ADD COMPONENT</button>
        </EditSection>

        {/* Assets */}
        <EditSection title="Assigned Assets" Icon={FiMonitor}>
          {editData.assets.map(asset => {
            const isOrig = !!employee.assets.find(a => a.id === asset.id);
            const isNew = !isOrig;
            const returned = asset._removed;
            return (
              <div key={asset.id} style={{ background: returned ? "#fce8e6" : isNew ? "#fff" : "#e8f0fe", border: `1.5px solid ${returned ? "#f5c6c3" : isNew ? "#4285f4" : "#c5d8fc"}` }}
                className="rounded-xl p-3 sm:p-4 mb-3 grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-start sm:items-center">
                {isNew && <div className="sm:col-span-4 text-xs font-black text-blue-600 tracking-wider">NEW ASSET</div>}
                {returned && <div className="sm:col-span-4 text-xs font-black text-red-500 tracking-wider">MARKED FOR RETURN</div>}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Asset Name</div>
                  <input value={asset.name} onChange={e => updDyn("assets", asset.id, "name", e.target.value)} disabled={isOrig}
                    style={{ textDecoration: returned ? "line-through" : "none", color: returned ? "#ea4335" : "#1a1d2e" }}
                    className="w-full border-none bg-transparent text-sm font-bold outline-none" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Serial No.</div>
                  <input value={asset.serial} onChange={e => updDyn("assets", asset.id, "serial", e.target.value)} disabled={isOrig}
                    style={{ textDecoration: returned ? "line-through" : "none" }}
                    className="w-full border-none bg-transparent text-xs text-slate-600 font-semibold outline-none" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Assigned Date</div>
                  <input type="date" value={asset.assignedDate} onChange={e => updDyn("assets", asset.id, "assignedDate", e.target.value)} disabled={isOrig}
                    className="border-none bg-transparent text-xs text-slate-500 outline-none" />
                </div>
                {isOrig && (
                  <button onClick={() => toggleReturn(asset.id)}
                    style={{ background: returned ? "#e8f0fe" : "#fce8e6", color: returned ? "#4285f4" : "#ea4335" }}
                    className="rounded-lg px-3 py-1.5 text-xs font-black border-none cursor-pointer w-fit">
                    {returned ? "UNDO" : "RETURN"}
                  </button>
                )}
                {isNew && <button onClick={() => removeDyn("assets", asset.id)} className="text-red-500 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-1.5 text-xs font-black transition w-fit">✕ Remove</button>}
              </div>
            );
          })}
          <button onClick={() => addDyn("assets", { name: "", serial: "", assignedDate: "" })} className="border-2 border-dashed border-blue-400 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ ASSIGN NEW ASSET</button>
        </EditSection>

        {/* Documents */}
        <EditSection title="Documents" Icon={FiFileText}>
          {editData.documents.map(doc => {
            const isOrig = !!employee.documents.find(d => d.id === doc.id);
            const isNew = !isOrig;
            const isReplaced = isOrig && employee.documents.find(d => d.id === doc.id)?.fileName !== doc.fileName;
            return (
              <div key={doc.id} style={{ background: isNew || isReplaced ? "#fff" : "#e8f0fe", border: `1.5px solid ${isNew || isReplaced ? "#4285f4" : "#c5d8fc"}` }}
                className="rounded-xl p-3 mb-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black tracking-wider mb-1" style={{ color: isNew ? "#3d5afe" : isReplaced ? "#f9a825" : "#0d8a4e" }}>
                    {isNew ? "🆕 NEW" : isReplaced ? "🔄 REPLACED" : "✅ SAVED"}
                  </div>
                  <input value={doc.name} onChange={e => updDyn("documents", doc.id, "name", e.target.value)} placeholder="Document name"
                    className="w-full border-none bg-transparent text-sm font-bold text-slate-900 outline-none" />
                </div>
                <span className="text-xs text-slate-500 font-semibold truncate max-w-[140px]">{doc.fileName || "No file"}</span>
                <label className="bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1.5 text-xs font-black text-blue-600 cursor-pointer transition">
                  REPLACE <input type="file" className="hidden" onChange={e => { if (e.target.files[0]) updDyn("documents", doc.id, "fileName", e.target.files[0].name); }} />
                </label>
                {isNew && <button onClick={() => removeDyn("documents", doc.id)} className="text-red-500 bg-red-50 hover:bg-red-100 rounded-lg px-3 py-1.5 text-xs font-black transition">✕</button>}
              </div>
            );
          })}
          <button onClick={() => addDyn("documents", { name: "", fileName: "" })} className="border-2 border-dashed border-blue-400 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ ADD DOCUMENT</button>
        </EditSection>

        {/* Address */}
        <EditSection title="Permanent Address" Icon={FiMapPin}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <EF label="Address Line" value={editData.address} orig={employee.address} onChange={v => upd("address", v)} />
            <EF label="City" value={editData.city} orig={employee.city} onChange={v => upd("city", v)} />
            <EF label="ZIP Code" value={editData.zip} orig={employee.zip} onChange={v => upd("zip", v)} />
          </div>
        </EditSection>

        {/* Leaves */}
        <EditSection title="Leave Allocation" Icon={FiUmbrella}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["annual", "sick", "casual", "maternity"].map(lt => (
              <EF key={lt} label={`${lt.charAt(0).toUpperCase() + lt.slice(1)} Leave`} value={editData.leaves[lt]} orig={employee.leaves[lt]}
                onChange={v => { const leaves = { ...editData.leaves, [lt]: Number(v) }; upd("leaves", leaves); }} type="number" />
            ))}
          </div>
        </EditSection>
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="px-6 pt-6 pb-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Confirm Changes</h3>
              <p className="text-sm text-slate-500 mt-1">Review {changes.length} change{changes.length !== 1 ? "s" : ""} before saving.</p>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {Object.entries(changes.reduce((acc, c) => { (acc[c.section] = acc[c.section] || []).push(c); return acc; }, {})).map(([sec, items]) => (
                <div key={sec} className="mb-4">
                  <div className="text-xs font-black text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-1 h-3 bg-blue-600 rounded-full inline-block" />{sec}
                  </div>
                  {items.map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg px-3 py-2 mb-1.5">
                      <div className="text-xs font-bold text-slate-800">{item.field}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400 line-through">{item.from}</span>
                        <span className="text-xs text-slate-300">→</span>
                        <span className={`text-xs font-bold ${["Deleted", "Returned"].includes(item.to) ? "text-red-500" : "text-green-600"}`}>{item.to}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={onCancelModal} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-5 py-2.5 rounded-xl transition">Cancel</button>
              <button onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition">Confirm Save</button>
            </div>
          </div>
        </div>
      )}
      {saved && <Toast msg="Employee profile updated successfully!" />}
    </div>
  );
}

// ─── ADD EMPLOYEE SCREEN (Full Multi-Step Form) ────────────────────────────────
const FORM_DEPARTMENTS = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Administration", "Operations", "Legal", "Product"];
const ASSET_TYPES_LIST = ["Laptop", "Desktop", "Monitor", "Keyboard & Mouse", "Mobile Phone", "Headset", "Tablet", "Access Card", "Other"];
const MOCK_MANAGERS_LIST = [
  { id: "MGR001", name: "Priya Sharma", dept: "Engineering" },
  { id: "MGR002", name: "Arjun Nair", dept: "Design" },
  { id: "MGR003", name: "Meera Iyer", dept: "Sales" },
  { id: "MGR004", name: "Rohit Gupta", dept: "HR" },
  { id: "MGR005", name: "Sanya Khanna", dept: "Finance" },
];
const ADD_STEPS = [
  { id: 1, label: "Role", Icon: FiTarget },
  { id: 2, label: "Basic", Icon: FiUser },
  { id: 3, label: "Work", Icon: FiBriefcase },
  { id: 4, label: "Salary", Icon: FiDollarSign },
  { id: 5, label: "Leaves", Icon: FiUmbrella },
  { id: 6, label: "Assets", Icon: FiMonitor },
  { id: 7, label: "Documents", Icon: FiFileText },
  { id: 8, label: "Address", Icon: FiMapPin },
];
const initSalaryState = () => ({
  totalCTC: "",
  components: [
    { id: "basic", name: "Basic Pay", amount: "", type: "earning" },
    { id: "hra", name: "HRA", amount: "", type: "earning" },
    { id: "special", name: "Special Allowance", amount: "", type: "earning" },
    { id: "bonus", name: "Bonus", amount: "", type: "earning" },
    { id: "pf", name: "PF (Employee)", amount: "", type: "deduction" },
    { id: "gratuity", name: "Gratuity", amount: "", type: "deduction" },
  ],
});
const initFormState = () => ({
  roleType: "Employee", reportingManager: "",
  firstName: "", lastName: "", email: "", phone: "", dob: "", gender: "", profilePhoto: null,
  employeeId: "EMP-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
  department: "", designation: "", joiningDate: "", workLocation: "Office",
  shiftStart: "09:00", shiftEnd: "18:00",
  salary: initSalaryState(),
  leaves: { casual: 12, sick: 12, earned: 18, lop: 0 },
  assets: [], workExperiences: [], otherDocuments: [],
  currentAddress: { line1: "", line2: "", city: "", state: "", zip: "" },
  permanentAddress: { line1: "", line2: "", city: "", state: "", zip: "" },
  sameAsCurrent: false, emergencyName: "", emergencyPhone: "",
});
const initCustomDefsState = () => ({ 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] });

function AddEmployeeScreen({ onSave, onCancel }) {
  const [step, setStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState(new Set([1])); // Track which steps user has visited
  const [form, setForm] = useState(initFormState());
  const [customDefs, setCustomDefs] = useState(initCustomDefsState());
  const [customVals, setCustomVals] = useState({});
  const [errors, setErrors] = useState({});
  const [showCFModal, setShowCFModal] = useState(false);
  const [cfStep, setCfStep] = useState(1);
  const [newField, setNewField] = useState({ name: "", type: "text", options: "" });
  const photoRef = useRef();

  const setF = (path, val) => {
    setForm(prev => {
      const keys = path.split(".");
      if (keys.length === 1) return { ...prev, [keys[0]]: val };
      if (keys.length === 2) return { ...prev, [keys[0]]: { ...prev[keys[0]], [keys[1]]: val } };
      return prev;
    });
    if (errors[path]) setErrors(p => ({ ...p, [path]: "" }));
  };

  const sal = form.salary;
  const totalEarn = sal.components.filter(c => c.type === "earning").reduce((s, c) => s + (Number(c.amount) || 0), 0);
  const totalDed = sal.components.filter(c => c.type === "deduction").reduce((s, c) => s + (Number(c.amount) || 0), 0);
  const netMo = totalEarn - totalDed;

  const updSC = (id, f, v) => setForm(p => ({ ...p, salary: { ...p.salary, components: p.salary.components.map(c => c.id === id ? { ...c, [f]: v } : c) } }));
  const rmSC = (id) => setForm(p => ({ ...p, salary: { ...p.salary, components: p.salary.components.filter(c => c.id !== id) } }));
  const addSC = () => setForm(p => ({ ...p, salary: { ...p.salary, components: [...p.salary.components, { id: genId(), name: "New Component", amount: "", type: "earning" }] } }));

  const addAss = () => setForm(p => ({ ...p, assets: [...p.assets, { id: genId(), type: "", serial: "", issueDate: "", notes: "" }] }));
  const updAss = (id, f, v) => setForm(p => ({ ...p, assets: p.assets.map(a => a.id === id ? { ...a, [f]: v } : a) }));
  const rmAss = (id) => setForm(p => ({ ...p, assets: p.assets.filter(a => a.id !== id) }));

  const addExp = () => setForm(p => ({ ...p, workExperiences: [...p.workExperiences, { id: genId(), company: "", role: "", years: "", cert: null }] }));
  const updExp = (id, f, v) => setForm(p => ({ ...p, workExperiences: p.workExperiences.map(e => e.id === id ? { ...e, [f]: v } : e) }));
  const rmExp = (id) => setForm(p => ({ ...p, workExperiences: p.workExperiences.filter(e => e.id !== id) }));

  const addDoc = () => setForm(p => ({ ...p, otherDocuments: [...p.otherDocuments, { id: genId(), name: "", fileName: null }] }));
  const updDoc = (id, f, v) => setForm(p => ({ ...p, otherDocuments: p.otherDocuments.map(d => d.id === id ? { ...d, [f]: v } : d) }));
  const rmDoc = (id) => setForm(p => ({ ...p, otherDocuments: p.otherDocuments.filter(d => d.id !== id) }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1 && !form.reportingManager) e.reportingManager = "Select a reporting manager";
    if (s === 2) {
      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";
      if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.gender) e.gender = "Required";
    }
    if (s === 3) {
      if (!form.department) e.department = "Required";
      if (!form.designation.trim()) e.designation = "Required";
      if (!form.joiningDate) e.joiningDate = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validateStep(step) && step < 8) {
      const nextStep = step + 1;
      setStep(nextStep);
      setVisitedSteps(prev => new Set([...prev, nextStep]));
    }
  };
  const goPrev = () => { if (step > 1) setStep(s => s - 1); };
  const goToStep = (targetStep) => {
    setStep(targetStep);
    setVisitedSteps(prev => new Set([...prev, targetStep]));
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;

    const formData = new FormData();
    formData.append("employeeName", `${form.firstName} ${form.lastName}`);
    formData.append("officialEmail", form.email);
    formData.append("phoneNumber", form.phone);
    formData.append("employeeNo", form.employeeId);

    // Personal Details
    formData.append("personalDetails[bloodGroup]", customVals["2-bloodgroup"] || "O+");
    formData.append("personalDetails[city]", form.currentAddress.city);
    formData.append("personalDetails[pincode]", form.currentAddress.zip);

    // Work Details
    formData.append("workDetails[department]", form.department);
    formData.append("workDetails[designation]", form.designation);
    formData.append("workDetails[dateOfJoining]", form.joiningDate);
    formData.append("workDetails[workType]", form.workLocation);

    if (form.profilePhoto) {
      formData.append("profilePhoto", form.profilePhoto);
    }

    onSave(formData);
  };

  const progress = ((step - 1) / 7) * 100;

  const openCFModal = (s) => { setCfStep(s); setNewField({ name: "", type: "text", options: "" }); setShowCFModal(true); };
  const saveCF = () => {
    if (!newField.name.trim()) return;
    const def = { id: genId(), name: newField.name.trim(), type: newField.type, options: newField.options.split(",").map(s => s.trim()).filter(Boolean) };
    setCustomDefs(p => ({ ...p, [cfStep]: [...p[cfStep], def] }));
    setShowCFModal(false);
  };
  const rmCFDef = (s, id) => setCustomDefs(p => ({ ...p, [s]: p[s].filter(f => f.id !== id) }));

  return (
    <div className="min-h-screen bg-[#f0f4ff]" style={{ fontFamily: "'DM Sans','Outfit',sans-serif" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition">
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="font-black text-slate-900 text-sm sm:text-base leading-tight">Add New Employee</div>
              <div className="text-xs text-slate-400 font-medium">Step {step} of 8 — {ADD_STEPS[step - 1].label}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="text-xs font-bold text-slate-400">{Math.round(progress)}% complete</div>
              <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <button onClick={onCancel} className="text-xs font-bold text-slate-400 hover:text-slate-600 transition">Cancel</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 lg:p-4 lg:sticky lg:top-24">
            <div className="flex lg:flex-col gap-1 overflow-x-auto pb-1 lg:pb-0">
              {ADD_STEPS.map(s => {
                const isActive = step === s.id;
                const isCompleted = visitedSteps.has(s.id) && s.id < step;
                const StepIcon = s.Icon;
                return (
                  <button key={s.id} onClick={() => goToStep(s.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all text-left flex-shrink-0 w-full ${isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : isCompleted ? "bg-green-50 text-green-700 hover:bg-green-100" : "hover:bg-slate-50 text-slate-500"}`}>
                    <div className="text-base flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {isCompleted ? <FiCheck className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0 hidden sm:block lg:block">
                      <div className={`text-xs font-black truncate ${isActive ? "text-white" : isCompleted ? "text-green-700" : "text-slate-700"}`}>{s.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Step header */}
            <div className="px-6 py-5 border-b border-slate-100" style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  {(() => { const StepIcon = ADD_STEPS[step - 1].Icon; return <StepIcon className="w-5 h-5 text-white" />; })()}
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">{ADD_STEPS[step - 1].label}</h2>
                  <p className="text-blue-200 text-xs font-medium">Step {step} of 8</p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <AFLabel>Add as</AFLabel>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {["Employee", "Manager"].map(type => (
                        <button key={type} onClick={() => setF("roleType", type)}
                          className={`py-4 rounded-xl border-2 font-black text-sm transition-all ${form.roleType === type ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50/50"}`}>
                          <div className="text-3xl mb-1.5 flex items-center justify-center">
                            {type === "Employee" ? <FiUser className="w-8 h-8" /> : <BsPersonBadge className="w-8 h-8" />}
                          </div>{type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <AFLabel required>Reporting Manager</AFLabel>
                    <select value={form.reportingManager} onChange={e => setF("reportingManager", e.target.value)}
                      className={`w-full mt-1.5 bg-slate-50 border ${errors.reportingManager ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition`}>
                      <option value="">Select reporting manager</option>
                      {MOCK_MANAGERS_LIST.map(m => <option key={m.id} value={m.id}>{m.name} — {m.dept}</option>)}
                    </select>
                    {errors.reportingManager && <AFErr msg={errors.reportingManager} />}
                  </div>
                  <CFRenderer stepId={1} defs={customDefs[1]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(1)} />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <AFLabel>Profile Photo</AFLabel>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-black overflow-hidden border-4 border-white shadow-lg">
                        {form.profilePhoto ? <img src={URL.createObjectURL(form.profilePhoto)} alt="" className="w-full h-full object-cover" /> : (form.firstName ? form.firstName[0].toUpperCase() : "?")}
                      </div>
                      <div>
                        <button onClick={() => photoRef.current?.click()} className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-black text-xs px-4 py-2 rounded-xl transition border border-blue-200">Upload Photo</button>
                        <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files[0]) setF("profilePhoto", e.target.files[0]); }} />
                        <p className="text-xs text-slate-400 mt-1 font-medium">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AF label="First Name" required value={form.firstName} onChange={v => setF("firstName", v)} error={errors.firstName} />
                    <AF label="Last Name" required value={form.lastName} onChange={v => setF("lastName", v)} error={errors.lastName} />
                    <AF label="Email Address" required value={form.email} onChange={v => setF("email", v)} type="email" error={errors.email} />
                    <AF label="Phone Number" required value={form.phone} onChange={v => setF("phone", v)} error={errors.phone} placeholder="+91 98765 43210" />
                    <AF label="Date of Birth" value={form.dob} onChange={v => setF("dob", v)} type="date" />
                    <div>
                      <AFLabel required>Gender</AFLabel>
                      <div className="flex gap-2 mt-1.5 flex-wrap">
                        {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => (
                          <button key={g} onClick={() => setF("gender", g)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition ${form.gender === g ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300"}`}>{g}</button>
                        ))}
                      </div>
                      {errors.gender && <AFErr msg={errors.gender} />}
                    </div>
                  </div>
                  <CFRenderer stepId={2} defs={customDefs[2]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(2)} />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <AFLabel>Employee ID</AFLabel>
                      <div className="mt-1.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-blue-700 font-mono flex items-center justify-between">
                        {form.employeeId}
                        <button onClick={() => setF("employeeId", "EMP-" + Math.random().toString(36).substr(2, 6).toUpperCase())} className="text-xs text-slate-400 hover:text-blue-600 font-bold transition ml-2">↻</button>
                      </div>
                    </div>
                    <div>
                      <AFLabel required>Department</AFLabel>
                      <select value={form.department} onChange={e => setF("department", e.target.value)}
                        className={`w-full mt-1.5 bg-slate-50 border ${errors.department ? "border-red-400" : "border-slate-200"} rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition`}>
                        <option value="">Select department</option>
                        {FORM_DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                      {errors.department && <AFErr msg={errors.department} />}
                    </div>
                    <AF label="Job Title / Designation" required value={form.designation} onChange={v => setF("designation", v)} error={errors.designation} />
                    <AF label="Date of Joining" required value={form.joiningDate} onChange={v => setF("joiningDate", v)} type="date" error={errors.joiningDate} />
                    <div>
                      <AFLabel>Work Location</AFLabel>
                      <div className="flex gap-2 mt-1.5 flex-wrap">
                        {["Office", "Remote", "Hybrid"].map(w => (
                          <button key={w} onClick={() => setF("workLocation", w)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition ${form.workLocation === w ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300"}`}>{w}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <AFLabel>Reporting Manager</AFLabel>
                      <select value={form.reportingManager} onChange={e => setF("reportingManager", e.target.value)}
                        className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition">
                        <option value="">Select manager</option>
                        {MOCK_MANAGERS_LIST.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <AFLabel>Shift Timing</AFLabel>
                      <div className="flex items-center gap-2 mt-1.5">
                        <input type="time" value={form.shiftStart} onChange={e => setF("shiftStart", e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                        <span className="text-slate-400 font-bold text-sm">to</span>
                        <input type="time" value={form.shiftEnd} onChange={e => setF("shiftEnd", e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                      </div>
                    </div>
                  </div>
                  <CFRenderer stepId={3} defs={customDefs[3]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(3)} />
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="max-w-xs">
                    <AF label="Total Annual CTC (₹)" value={form.salary.totalCTC} onChange={v => setForm(p => ({ ...p, salary: { ...p.salary, totalCTC: v } }))} type="number" placeholder="e.g. 700000" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <AFLabel>Monthly Salary Components</AFLabel>
                      <span className="text-xs text-slate-400 font-semibold">Monthly amounts (₹)</span>
                    </div>
                    <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1.2fr_50px] gap-3 px-3 mb-2">
                      {["Component", "Monthly (₹)", "Type", ""].map(h => <div key={h} className="text-xs font-black text-slate-400 uppercase tracking-wider">{h}</div>)}
                    </div>
                    <div className="space-y-2">
                      {sal.components.map(comp => (
                        <div key={comp.id} className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_1.2fr_50px] gap-2 sm:gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3 items-center">
                          <input value={comp.name} onChange={e => updSC(comp.id, "name", e.target.value)} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                          <input type="number" value={comp.amount} onChange={e => updSC(comp.id, "amount", e.target.value)} placeholder="0" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                          <select value={comp.type} onChange={e => updSC(comp.id, "type", e.target.value)} style={{ color: comp.type === "deduction" ? "#dc2626" : "#16a34a" }} className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-black outline-none focus:ring-2 focus:ring-blue-300 transition">
                            <option value="earning">Earning</option>
                            <option value="deduction">Deduction</option>
                          </select>
                          <button onClick={() => rmSC(comp.id)} className="text-red-400 hover:bg-red-50 rounded-lg p-2 transition text-sm">✕</button>
                        </div>
                      ))}
                    </div>
                    <button onClick={addSC} className="mt-3 border-2 border-dashed border-blue-300 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ Add Component</button>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-5">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-4">Auto-calculated Summary</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Gross Monthly", val: fmt(totalEarn), color: "text-emerald-400" },
                        { label: "Total Deductions", val: fmt(totalDed), color: "text-red-400" },
                        { label: "Net Monthly", val: fmt(netMo), color: "text-blue-400" },
                        { label: "Annual Gross", val: fmt(totalEarn * 12), color: "text-emerald-300" },
                        { label: "Annual Net", val: fmt(netMo * 12), color: "text-blue-300" },
                        { label: "CTC (Input)", val: form.salary.totalCTC ? fmt(form.salary.totalCTC) : "—", color: "text-white" },
                      ].map(item => (
                        <div key={item.label} className="bg-white/5 rounded-xl p-3">
                          <div className="text-xs text-slate-500 font-semibold mb-1">{item.label}</div>
                          <div className={`text-sm font-black ${item.color}`}>{item.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <CFRenderer stepId={4} defs={customDefs[4]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(4)} />
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { key: "casual", label: "Casual Leave", icon: "", color: "bg-orange-50 border-orange-200" },
                      { key: "sick", label: "Sick Leave", icon: "", color: "bg-red-50 border-red-200" },
                      { key: "earned", label: "Earned Leave", icon: "", color: "bg-yellow-50 border-yellow-200" },
                      { key: "lop", label: "Loss of Pay", icon: "", color: "bg-slate-50 border-slate-200" },
                    ].map(lt => (
                      <div key={lt.key} className={`${lt.color} border-2 rounded-2xl p-4`}>
                        <div className="text-2xl mb-2">{lt.icon}</div>
                        <div className="text-xs font-black text-slate-600 mb-2">{lt.label}</div>
                        <input type="number" min="0" value={form.leaves[lt.key]} onChange={e => setForm(p => ({ ...p, leaves: { ...p.leaves, [lt.key]: Number(e.target.value) } }))}
                          className="w-full bg-white/80 border border-white rounded-xl px-3 py-2 text-xl font-black text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 text-center" />
                        <div className="text-xs text-slate-400 font-semibold text-center mt-1">days/year</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                    <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-3">Leave Summary</div>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(form.leaves).map(([k, v]) => (
                        <div key={k} className="bg-white rounded-xl px-4 py-2 shadow-sm">
                          <span className="text-xs text-slate-500 font-semibold capitalize">{k === "lop" ? "Loss of Pay" : k} </span>
                          <span className="font-black text-slate-900">{v} days</span>
                        </div>
                      ))}
                      <div className="bg-blue-600 text-white rounded-xl px-4 py-2 shadow-sm">
                        <span className="text-xs font-semibold">Total </span>
                        <span className="font-black">{Object.values(form.leaves).reduce((a, b) => a + b, 0)} days</span>
                      </div>
                    </div>
                  </div>
                  <CFRenderer stepId={5} defs={customDefs[5]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(5)} />
                </div>
              )}

              {/* STEP 6 */}
              {step === 6 && (
                <div className="space-y-4">
                  {form.assets.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
                      <div className="text-4xl mb-3">🖥️</div>
                      <p className="text-slate-500 font-semibold text-sm">No assets assigned yet</p>
                    </div>
                  )}
                  {form.assets.map((asset, i) => (
                    <div key={asset.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs font-black text-blue-600 uppercase tracking-wider">Asset #{i + 1}</div>
                        <button onClick={() => rmAss(asset.id)} className="text-red-400 hover:bg-red-50 rounded-lg px-2 py-1 text-xs font-bold transition">✕ Remove</button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <AFLabel>Asset Type</AFLabel>
                          <select value={asset.type} onChange={e => updAss(asset.id, "type", e.target.value)} className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition">
                            <option value="">Select type</option>
                            {ASSET_TYPES_LIST.map(t => <option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <AFLabel>Serial Number</AFLabel>
                          <input value={asset.serial} onChange={e => updAss(asset.id, "serial", e.target.value)} placeholder="e.g. MBP-2024-12345" className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                        </div>
                        <div>
                          <AFLabel>Issue Date</AFLabel>
                          <input type="date" value={asset.issueDate} onChange={e => updAss(asset.id, "issueDate", e.target.value)} className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                        </div>
                        <div>
                          <AFLabel>Condition / Notes</AFLabel>
                          <input value={asset.notes} onChange={e => updAss(asset.id, "notes", e.target.value)} placeholder="e.g. Good condition" className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={addAss} className="w-full border-2 border-dashed border-blue-300 text-blue-500 font-black text-sm py-3 rounded-2xl hover:bg-blue-50 transition flex items-center justify-center gap-2">
                    <span className="text-lg">+</span> Assign New Asset
                  </button>
                  <CFRenderer stepId={6} defs={customDefs[6]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(6)} />
                </div>
              )}

              {/* STEP 7 */}
              {step === 7 && (
                <div className="space-y-6">
                  <div>
                    <div className="font-black text-slate-800 text-sm mb-3">Work Experience</div>
                    {form.workExperiences.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl mb-3">
                        <p className="text-slate-400 font-semibold text-sm">No work experience added</p>
                      </div>
                    )}
                    {form.workExperiences.map((exp, i) => (
                      <div key={exp.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs font-black text-blue-600 uppercase tracking-wider">Experience #{i + 1}</div>
                          <button onClick={() => rmExp(exp.id)} className="text-red-400 hover:bg-red-50 rounded-lg px-2 py-1 text-xs font-bold transition">✕</button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div><AFLabel>Company Name</AFLabel><input value={exp.company} onChange={e => updExp(exp.id, "company", e.target.value)} placeholder="e.g. Google" className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" /></div>
                          <div><AFLabel>Role</AFLabel><input value={exp.role} onChange={e => updExp(exp.id, "role", e.target.value)} placeholder="e.g. Senior Developer" className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" /></div>
                          <div><AFLabel>Years Worked</AFLabel><input value={exp.years} onChange={e => updExp(exp.id, "years", e.target.value)} placeholder="e.g. 2.5" className="w-full mt-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" /></div>
                          <div>
                            <AFLabel>Experience Certificate</AFLabel>
                            <label className="flex items-center gap-2 mt-1.5 bg-white border border-dashed border-blue-300 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition">
                              <span className="text-blue-500 font-bold text-xs">{exp.cert ? `📄 ${exp.cert.name}` : "📎 Upload certificate"}</span>
                              <input type="file" className="hidden" onChange={e => { if (e.target.files[0]) updExp(exp.id, "cert", e.target.files[0]); }} />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={addExp} className="border-2 border-dashed border-blue-300 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ Add Experience</button>
                  </div>

                  <div>
                    <div className="font-black text-slate-800 text-sm mb-3">Other Documents</div>
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-3">
                      <div className="text-xs font-black text-blue-700 mb-2">Quick upload</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["Education Certificate", "ID Proof", "Offer Letter", "Bank Details"].map(docName => (
                          <label key={docName} className="flex flex-col items-center justify-center gap-1 bg-white rounded-xl p-3 border border-blue-100 cursor-pointer hover:border-blue-400 transition text-center">
                            <span className="text-xl">📄</span>
                            <span className="text-xs font-bold text-slate-600 leading-tight">{docName}</span>
                            <span className="text-xs text-blue-400 font-semibold">+ Upload</span>
                            <input type="file" className="hidden" onChange={e => { if (e.target.files[0]) { addDoc(); } }} />
                          </label>
                        ))}
                      </div>
                    </div>
                    {form.otherDocuments.map(doc => (
                      <div key={doc.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-2">
                        <span className="text-lg">📄</span>
                        <input value={doc.name} onChange={e => updDoc(doc.id, "name", e.target.value)} placeholder="Document name" className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-slate-800 placeholder-slate-400" />
                        <span className="text-xs text-slate-400 font-medium max-w-[120px] truncate">{doc.fileName?.name || "No file"}</span>
                        <label className="bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1 text-xs font-black text-blue-500 cursor-pointer transition">
                          Upload<input type="file" className="hidden" onChange={e => { if (e.target.files[0]) updDoc(doc.id, "fileName", e.target.files[0]); }} />
                        </label>
                        <button onClick={() => rmDoc(doc.id)} className="text-red-400 text-xs hover:bg-red-50 rounded px-1 py-1 transition">✕</button>
                      </div>
                    ))}
                    <button onClick={addDoc} className="border-2 border-dashed border-blue-300 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ Add Document</button>
                  </div>

                  <CFRenderer stepId={7} defs={customDefs[7]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(7)} />
                </div>
              )}

              {/* STEP 8 */}
              {step === 8 && (
                <div className="space-y-6">
                  <div>
                    <div className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2"><span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-xs"></span>Current Address</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2"><AF label="Address Line 1" value={form.currentAddress.line1} onChange={v => setF("currentAddress.line1", v)} /></div>
                      <AF label="Address Line 2" value={form.currentAddress.line2} onChange={v => setF("currentAddress.line2", v)} />
                      <AF label="City" value={form.currentAddress.city} onChange={v => setF("currentAddress.city", v)} />
                      <AF label="State" value={form.currentAddress.state} onChange={v => setF("currentAddress.state", v)} />
                      <AF label="ZIP Code" value={form.currentAddress.zip} onChange={v => setF("currentAddress.zip", v)} />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 w-fit">
                    <input type="checkbox" checked={form.sameAsCurrent} onChange={e => { setF("sameAsCurrent", e.target.checked); if (e.target.checked) setForm(p => ({ ...p, permanentAddress: { ...p.currentAddress } })); }} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-bold text-blue-700">Permanent address same as current</span>
                  </label>
                  {!form.sameAsCurrent && (
                    <div>
                      <div className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2"><span className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center text-xs"></span>Permanent Address</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2"><AF label="Address Line 1" value={form.permanentAddress.line1} onChange={v => setF("permanentAddress.line1", v)} /></div>
                        <AF label="Address Line 2" value={form.permanentAddress.line2} onChange={v => setF("permanentAddress.line2", v)} />
                        <AF label="City" value={form.permanentAddress.city} onChange={v => setF("permanentAddress.city", v)} />
                        <AF label="State" value={form.permanentAddress.state} onChange={v => setF("permanentAddress.state", v)} />
                        <AF label="ZIP Code" value={form.permanentAddress.zip} onChange={v => setF("permanentAddress.zip", v)} />
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="font-black text-slate-800 text-sm mb-4 flex items-center gap-2"><span className="w-6 h-6 bg-red-100 rounded-lg flex items-center justify-center text-xs"></span>Emergency Contact</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <AF label="Contact Name" value={form.emergencyName} onChange={v => setF("emergencyName", v)} placeholder="Full name" />
                      <AF label="Contact Number" value={form.emergencyPhone} onChange={v => setF("emergencyPhone", v)} placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <CFRenderer stepId={8} defs={customDefs[8]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(8)} />
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3">
              <button onClick={goPrev} disabled={step === 1}
                className={`flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl transition ${step === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-slate-200 bg-slate-100"}`}>← Previous</button>
              <div className="flex items-center gap-1">
                {ADD_STEPS.map(s => (
                  <div key={s.id} className={`rounded-full transition-all ${step === s.id ? "w-6 h-2 bg-blue-600" : step > s.id ? "w-2 h-2 bg-green-500" : "w-2 h-2 bg-slate-300"}`} />
                ))}
              </div>
              {step < 8
                ? <button onClick={goNext} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition shadow-lg shadow-blue-200">Next →</button>
                : <button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-black text-sm px-6 py-2.5 rounded-xl transition shadow-lg shadow-green-200">✅ Save Employee</button>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Custom Field Modal */}
      {showCFModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 pt-5 pb-4 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Add Custom Field</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Applies to all future employees in this section</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <AFLabel required>Field Name</AFLabel>
                <input value={newField.name} onChange={e => setNewField(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Passport Number, Blood Group"
                  className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
              </div>
              <div>
                <AFLabel>Field Type</AFLabel>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[{ val: "text", label: "Text", icon: "Aa" }, { val: "number", label: "Number", icon: "123" }, { val: "date", label: "Date", icon: "📅" }, { val: "dropdown", label: "Dropdown", icon: "▾" }, { val: "file", label: "File", icon: "📎" }, { val: "textarea", label: "Long Text", icon: "¶" }].map(ft => (
                    <button key={ft.val} onClick={() => setNewField(p => ({ ...p, type: ft.val }))}
                      className={`py-2.5 rounded-xl border-2 font-bold text-xs transition ${newField.type === ft.val ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-blue-300"}`}>
                      <div className="text-base mb-0.5">{ft.icon}</div>{ft.label}
                    </button>
                  ))}
                </div>
              </div>
              {newField.type === "dropdown" && (
                <div>
                  <AFLabel>Options (comma-separated)</AFLabel>
                  <input value={newField.options} onChange={e => setNewField(p => ({ ...p, options: e.target.value }))} placeholder="Option A, Option B, Option C"
                    className="w-full mt-1.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition" />
                </div>
              )}
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowCFModal(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm px-5 py-2.5 rounded-xl transition">Cancel</button>
              <button onClick={saveCF} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition shadow-lg shadow-blue-200">Add Field</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Custom fields renderer
function CFRenderer({ stepId, defs, vals, onChange, onRm }) {
  if (!defs || defs.length === 0) return null;
  return (
    <div className="border-t border-slate-100 pt-5">
      <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <span className="w-1 h-3 bg-blue-400 rounded-full inline-block" />Custom Fields
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {defs.map(def => {
          const key = `${stepId}-${def.id}`;
          return (
            <div key={def.id} className="relative group">
              <div className="flex items-center justify-between mb-1.5">
                <AFLabel>{def.name}</AFLabel>
                <button onClick={() => onRm(stepId, def.id)} className="text-red-400 text-xs opacity-0 group-hover:opacity-100 transition font-bold hover:bg-red-50 rounded px-1">✕</button>
              </div>
              <CFInput def={def} value={vals[key] || ""} onChange={v => onChange(key, v)} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
function CFInput({ def, value, onChange }) {
  const cls = "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 transition";
  if (def.type === "dropdown") return <select value={value} onChange={e => onChange(e.target.value)} className={cls}><option value="">Select...</option>{def.options.map(o => <option key={o}>{o}</option>)}</select>;
  if (def.type === "file") return <label className="flex items-center gap-2 bg-slate-50 border border-dashed border-blue-300 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition"><span className="text-blue-500 font-bold text-xs">{value ? `📄 ${value}` : "📎 Upload file"}</span><input type="file" className="hidden" onChange={e => { if (e.target.files[0]) onChange(e.target.files[0].name); }} /></label>;
  if (def.type === "textarea") return <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls + " resize-none"} />;
  return <input type={def.type} value={value} onChange={e => onChange(e.target.value)} className={cls} />;
}
function AddCFBtn({ onClick }) {
  return <button onClick={onClick} className="flex items-center gap-2 text-xs font-black text-blue-500 border-2 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-50 px-4 py-2.5 rounded-xl transition w-fit">＋ Add Custom Field</button>;
}
function AF({ label, required, value, onChange, type = "text", error, placeholder }) {
  return (
    <div>
      <AFLabel required={required}>{label}</AFLabel>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full mt-1.5 bg-slate-50 border ${error ? "border-red-400 bg-red-50/30" : "border-slate-200"} rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition`} />
      {error && <AFErr msg={error} />}
    </div>
  );
}
function AFLabel({ children, required }) {
  return <div className="text-xs font-black text-slate-500 uppercase tracking-wider">{children}{required && <span className="text-red-500 ml-0.5">*</span>}</div>;
}
function AFErr({ msg }) {
  return <p className="text-red-500 text-xs font-semibold mt-1">⚠ {msg}</p>;
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function InfoCard({ title, Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="font-black text-slate-900 text-sm mb-4 flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-600" />
        {title}
      </div>
      {children}
    </div>
  );
}
function InfoRow({ label, value, highlight, tag }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 gap-2 text-sm">
      <span className="text-slate-500 font-semibold flex-shrink-0">{label}</span>
      <div className="flex items-center gap-2 flex-wrap justify-end">
        {tag && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tag === "deduction" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>{tag}</span>}
        <span className={`font-bold text-right ${highlight ? "text-blue-700 text-base" : "text-slate-900"}`}>{value}</span>
      </div>
    </div>
  );
}
function Chip({ label, className }) {
  return <span className={`${className} rounded-lg px-3 py-1 text-xs font-bold`}>{label}</span>;
}
function EditSection({ title, Icon, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2.5">
        <Icon className="w-4 h-4 text-slate-600" />
        <span className="font-black text-slate-900 text-sm">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
function EF({ label, value, orig, onChange, type = "text", opts = [] }) {
  const edited = JSON.stringify(value) !== JSON.stringify(orig);
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-black text-slate-400 uppercase tracking-wider">{label}</label>
        {edited && <span className="bg-blue-600 text-white text-xs font-black px-1.5 py-0.5 rounded">EDITED</span>}
      </div>
      {type === "select" ? (
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ background: edited ? "#fff" : "#e8f0fe", border: edited ? "1.5px solid #4285f4" : "1.5px solid #c5d8fc" }}
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition">
          {opts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <div>
          <input type={type} value={value} onChange={e => onChange(e.target.value)}
            style={{ background: edited ? "#fff" : "#e8f0fe", border: edited ? "1.5px solid #4285f4" : "1.5px solid #c5d8fc" }}
            className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none box-border transition" />
          {edited && <div className="text-xs text-red-500 font-semibold mt-1 pl-1">Previous: {String(orig) || "—"}</div>}
        </div>
      )}
    </div>
  );
}

function Toast({ msg }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-[9999]">
      ✅ {msg}
    </div>
  );
}