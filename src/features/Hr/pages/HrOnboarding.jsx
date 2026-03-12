import { useState, useMemo, useRef } from "react";
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
import {BsPerson, BsPersonBadge, BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { MdOutlineAttachMoney, MdWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEmployeesThunk,
  getEmployeeByIdThunk,
  createEmployeeThunk,
  updateEmployeeThunk,
  updateLeaveAllocationThunk,
  replaceDocumentThunk,
  returnAssetThunk,
  undoReturnAssetThunk,
  deleteEmployeeThunk,
  getDashboardCardsThunk,
} from "../Redux/thunks/HrOnboardingThunk";
import SkeletonHrOnBoard from "./SkeletonHrOnBoard";
// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const DEPARTMENTS = ["All Departments", "Engineering", "Design", "Hr", "Sales", "Finance", "Marketing", "Administration", "cloud aws", "IT"];

const STATUS_OPTS = ["All Status", "active", "inactive"];
const genId = () => "EMP" + Math.random().toString(36).substr(2, 6).toUpperCase();
const fmt = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));


function collectChanges(orig = {}, curr = {}) {
  const changes = [];

  const origSalary = orig.salary || {};
  const currSalary = curr.salary || {};

  const origLeaves = orig.leaves || {};
  const currLeaves = curr.leaves || {};

  const fields = [
    { section: "Basic", field: "employeeName", path: "employeeName" },
    { section: "Basic", field: "phoneNumber", path: "phoneNumber" },
    { section: "Basic", field: "headline", path: "headline" },
    { section: "Basic", field: "officialEmail", path: "officialEmail" },
    { section: "Work", field: "designation", path: "workDetails.designation" },
    { section: "Work", field: "department", path: "workDetails.department" },
    { section: "Work", field: "reportingManager", path: "workDetails.reportingManager" },
    { section: "Work", field: "workLocation", path: "workDetails.workLocation" },
    { section: "Work", field: "employmentStatus", path: "workDetails.employmentStatus" },
    { section: "Work", field: "workType", path: "workDetails.workType" },
    { section: "Work", field: "dateOfJoining", path: "workDetails.dateOfJoining" },

    {
      section: "Personal",
      field: "profilePhoto",
      path: "personalDetails.profileImage"
    },
    { section: "Personal", field: "bloodGroup", path: "personalDetails.bloodGroup" },
    { section: "Personal", field: "city", path: "personalDetails.city" },
    { section: "Personal", field: "address", path: "personalDetails.address" },
    { section: "Personal", field: "pinCode", path: "personalDetails.pinCode" }
  ];

  if (curr.personalDetails?.profileImageFile) {
    changes.push({
      section: "Personal",
      field: "Profile Photo",
      from: "Existing Photo",
      to: "New Photo Uploaded"
    });
  }

  const getValue = (obj, path) =>
    path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  fields.forEach(f => {
    const origVal = getValue(orig, f.path);
    const currVal = getValue(curr, f.path);

    if ((origVal ?? "") !== (currVal ?? "")) {
      changes.push({
        section: f.section,
        field: f.field,
        from: String(origVal ?? "—"),
        to: String(currVal ?? "—")
      });
    }
  });

  // Salary CTC
  if ((origSalary.totalCtc ?? 0) !== (currSalary.totalCtc ?? 0)) {
    changes.push({
      section: "Salary",
      field: "Annual CTC",
      from: fmt(origSalary.totalCtc ?? 0),
      to: fmt(currSalary.totalCtc ?? 0)
    });
  }

  (currSalary.components || []).forEach(sc => {
    if (["basic", "hra", "conveyance", "special", "pf", "tax"].includes(sc.id)) return;
    const found = (origSalary.components || []).find(o => o.id === sc.id)

    if (!found) {
      changes.push({
        section: "Salary",
        field: `${sc.name} (New)`,
        from: "—",
        to: fmt(sc.amount ?? 0)
      });
    } else if ((found.amount ?? 0) !== (sc.amount ?? 0)) {
      changes.push({
        section: "Salary",
        field: sc.name,
        from: fmt(found.amount ?? 0),
        to: fmt(sc.amount ?? 0)
      });
    }
  });

  // Leaves
  ["casual", "sick", "earned", "lossOfPay"].forEach(lt => {
    if ((origLeaves[lt] ?? 0) !== (currLeaves[lt] ?? 0)) {
      changes.push({
        section: "Leaves",
        field: lt,
        from: `${origLeaves[lt] ?? 0} days`,
        to: `${currLeaves[lt] ?? 0} days`
      });
    }
  });

  const origDocs = orig.documents || [];
  const currDocs = curr.documents || [];

  currDocs.forEach(doc => {
  const original = origDocs.find(d => d.id === doc.id);

    if (!original) {
      changes.push({
        section: "Documents",
        field: doc.name,
        from: "—",
        to: "Added"
      });
    } else if (doc.fileObject) {
      changes.push({
        section: "Documents",
        field: doc.name,
        from: original.fileName,
        to: "Replaced"
      });
    }
  });

  const origAssets = orig.assets || [];
  const currAssets = curr.assets || [];

  currAssets.forEach(asset => {
    const original = origAssets.find(a => a.id === asset.id);

    if (!original) {
      changes.push({
        section: "Assets",
        field: asset.name,
        from: "—",
        to: "Assigned"
      });
    } else if (original.status !== asset.status) {
      changes.push({
        section: "Assets",
        field: asset.name,
        from: original.status,
        to: asset.status
      });
    }
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

const normalizeEmployee = (emp) => {
  if (!emp) return emp;

  const extraComponents = (emp.salary?.extraComponents || []).map((c) => ({
    id: c._id || genId(),
    name: c.name || "Extra Component",
    amount: c.amount || 0,
    type: c.type || "earning"
  }));

  return {
    ...emp,

    // ---------------- SALARY ----------------
    salary: {
      totalCtc: emp.salary?.totalCtc ?? 0,

      components: [
        { id: "basic", name: "Basic", amount: emp.salary?.basic ?? 0, type: "earning" },
        { id: "hra", name: "HRA", amount: emp.salary?.hra ?? 0, type: "earning" },
        { id: "conveyance", name: "Conveyance", amount: emp.salary?.conveyance ?? 0, type: "earning" },
        { id: "special", name: "Special Allowance", amount: emp.salary?.specialAllowance ?? 0, type: "earning" },

        ...extraComponents,

        { id: "pf", name: "PF", amount: emp.salary?.deductions?.pfEmployee ?? 0, type: "deduction" },
        { id: "tax", name: "Professional Tax", amount: emp.salary?.deductions?.professionalTax ?? 0, type: "deduction" }
      ]
    },

    // ---------------- LEAVES ----------------
    leaves: {
      casual: emp.leaves?.casual ?? 0,
      sick: emp.leaves?.sick ?? 0,
      earned: emp.leaves?.earned ?? 0,
      lossOfPay: emp.leaves?.lossOfPay ?? 0
    },

    // ---------------- DOCUMENTS ----------------
    documents: (emp.documents || []).map((doc) => ({
      id: doc._id,
      name: doc.documentName,
      fileName: doc.documentName,
      url: doc.documentUrl
    })),

    // ---------------- ASSETS ----------------
    assets: (emp.assets || []).map((a) => ({
      id: a._id,
      name: a.assetType,
      serial: a.serialNumber,
      assignedDate: a.assignedDate,
      returnedDate: a.returnedDate,
      status: a.status
    })),

    // ---------------- CUSTOM FIELDS ----------------
    customFields: (emp.customFields || []).map((f) => ({
      id: f._id,
      fieldName: f.fieldName,
      fieldType: f.fieldType,
      value: f.value
    }))
  };
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [screen, setScreen] = useState("list"); // list | profile | edit | add

  const [editData, setEditData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [page, setPage] = useState(1);
  const limit = 10;


  const dispatch = useDispatch();
  const {
    employees: rawEmployees = [],
    loading,
    pagination
  } = useSelector(
    (state) => state.hr?.onboarding ?? {}
  );

//   // Dynamic Departments
// const DEPARTMENTS = [
//   "All Departments",
//   ...Array.from(
//     new Set(
//       rawEmployees
//         .map((emp) => emp.department)
//         .filter(Boolean)
//     )
//   )
// ];

// // Dynamic Status Options
// const STATUS_OPTS = [
//   "All Status",
//   ...Array.from(
//     new Set(
//       rawEmployees
//         .map((emp) => emp.status?.toLowerCase())
//         .filter(Boolean)
//     )
//   )
// ];

  const employees = useMemo(
    () => rawEmployees.map(normalizeEmployee),
    [rawEmployees]
  );


  useEffect(() => {
    dispatch(getEmployeesThunk({ page, limit }));
    dispatch(getDashboardCardsThunk());
  }, [dispatch, page]);



  const selectedEmployeeFromStore = useSelector(
    (state) => state.hr?.onboarding?.selectedEmployee
  );

  const selectedEmployee = selectedEmployeeFromStore
    ? normalizeEmployee(selectedEmployeeFromStore)
    : null;

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch =
        !searchQuery ||
        emp.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.officialEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeNo?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDept =
        deptFilter === "All Departments" ||
        emp.workDetails?.department === deptFilter;


      const matchStatus =
        statusFilter === "All Status" ||
        emp.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchSearch && matchDept && matchStatus;
    });
  }, [employees, searchQuery, deptFilter, statusFilter]);

  const dashboard = useSelector(
    (state) => state.hr?.onboarding?.dashboard
  );

  const stats = {
    total: dashboard?.totalEmployees || 0,
    active: dashboard?.active || 0,
    inactive: dashboard?.inactive || 0,
    depts: dashboard?.departments || 0,
  };



  const goToProfile = async (id) => {
    await dispatch(getEmployeeByIdThunk(id));
    setScreen("profile");
  };

  const goToEdit = () => {
    if (!selectedEmployee) return;
    setEditData(JSON.parse(JSON.stringify(selectedEmployee)));
    setScreen("edit");
  };

  const goToList = () => {
    setScreen("list");
    setEditData(null);
  };

  const goBackToProfile = () => { setEditData(null); setScreen("profile"); };

  const upd = (k, v) => setEditData(p => ({ ...p, [k]: v }));
  const updSalary = (k, v) => setEditData(p => ({ ...p, salary: { ...p.salary, [k]: v } }));
  const updSC = (id, f, v) => setEditData(p => ({ ...p, salary: { ...p.salary, components: p.salary.components.map(c => c.id === id ? { ...c, [f]: v } : c) } }));
  const removeSC = (id) => setEditData(p => ({ ...p, salary: { ...p.salary, components: p.salary.components.filter(c => c.id !== id) } }));
  const addSC = () => setEditData(p => ({ ...p, salary: { ...p.salary, components: [...p.salary.components, { id: genId(), name: "New Component", amount: 0, type: "earning" }] } }));
  const updDyn = (k, id, f, v) => setEditData(p => ({ ...p, [k]: p[k].map(i => i.id === id ? { ...i, [f]: v } : i) }));
  const addDyn = (k, init) => setEditData(p => ({ ...p, [k]: [...p[k], { ...init, id: genId() }] }));
  const removeDyn = (k, id) => setEditData(p => ({ ...p, [k]: p[k].filter(i => i.id !== id) }));
  const toggleReturn = (id) =>
    setEditData(p => ({
      ...p,
      assets: p.assets.map(a =>
        a.id === id
          ? {
            ...a,
            status: a.status === "assigned" ? "returned" : "assigned"
          }
          : a
      )
    }));

  const changes = useMemo(() => {
    if (screen !== "edit" || !selectedEmployee || !editData) return [];
    return collectChanges(selectedEmployee, editData);
  }, [selectedEmployee, editData, screen]);


  if (loading && screen === "list") {
    return <SkeletonHrOnBoard />;
  }

  const netMonthly =
    editData?.salary?.components?.reduce(
      (s, c) =>
        c.type === "earning"
          ? s + (c.amount || 0)
          : s - (c.amount || 0),
      0
    ) || 0;


  const handleConfirmSave = async () => {
    if (!selectedEmployee?._id) {
      toast.error("Employee ID not found");
      return;
    }

    const employeeId = selectedEmployee._id;

    try {
      setSaving(true);


      const formData = new FormData();

      formData.append("employeeName", editData.employeeName || "");
      formData.append("officialEmail", editData.officialEmail || "");
      formData.append("phoneNumber", editData.phoneNumber || "");

      if (editData.personalDetails?.profileImageFile) {
        formData.append("profilePhoto", editData.personalDetails.profileImageFile);
      }

      formData.append(
        "personalDetails",
        JSON.stringify(editData.personalDetails || {})
      );

      formData.append(
        "workDetails",
        JSON.stringify(editData.workDetails || {})
      );

      const components = editData.salary.components || [];

      const basic = components.find(c => c.id === "basic")?.amount || 0;
      const hra = components.find(c => c.id === "hra")?.amount || 0;
      const conveyance = components.find(c => c.id === "conveyance")?.amount || 0;
      const specialAllowance = components.find(c => c.id === "special")?.amount || 0;

      const pfEmployee = components.find(c => c.id === "pf")?.amount || 0;
      const professionalTax = components.find(c => c.id === "tax")?.amount || 0;

      const extraComponents = components
        .filter(c => !["basic", "hra", "conveyance", "special", "pf", "tax"].includes(c.id))
        .map(c => ({
          name: c.name,
          amount: c.amount,
          type: c.type
        }));

      formData.append(
        "salary",
        JSON.stringify({
          basic,
          hra,
          conveyance,
          specialAllowance,

          extraComponents,

          deductions: {
            pfEmployee,
            professionalTax
          },

          totalCtc: editData.salary.totalCtc || 0
        })
      );

      formData.append(
        "customFields",
        JSON.stringify(editData.customFields || [])
      );

      // ----------- NEW ASSETS -----------
      const newAssets = (editData.assets || [])
        .filter(asset => !/^[0-9a-fA-F]{24}$/.test(asset.id))// assets added in edit screen
        .map(asset => ({
          assetType: asset.name,
          serialNumber: asset.serial,
          assignedDate: asset.assignedDate
            ? new Date(asset.assignedDate)
            : new Date(),
          condition: "Good",
          status: "assigned"
        }));

      if (newAssets.length > 0) {
        formData.append("assets", JSON.stringify(newAssets));
      }

      await dispatch(
        updateEmployeeThunk({
          id: employeeId,
          data: formData
        })
      ).unwrap();



      // ---------- LEAVE UPDATE ----------
      if (editData.leaves) {
        await dispatch(
          updateLeaveAllocationThunk({
            id: employeeId,
            data: {
              casual: editData.leaves.casual,
              sick: editData.leaves.sick,
              earned: editData.leaves.earned,
              lossOfPay: editData.leaves.lossOfPay,
            },
          })
        ).unwrap();
      }




      // ---------- ASSET RETURN ----------
      const assetReturns = (editData.assets || [])
        .filter(asset => {
          const original = selectedEmployee.assets.find(
            a => a.id === asset.id
          );

          return (
            asset.id &&
            original &&
            original.status === "assigned" &&
            asset.status === "returned"
          );
        })
        .map(asset =>
          dispatch(
            returnAssetThunk({
              employeeId,
              assetId: asset.id
            })
          ).unwrap()
        );

      // ---------- ASSET UNDO RETURN ----------
      const assetUndo = (editData.assets || [])
        .filter(asset => {
          const original = selectedEmployee.assets.find(
            a => a.id === asset.id
          );

          return (
            asset.id &&
            original &&
            original.status === "returned" &&
            asset.status === "assigned"
          );
        })
        .map(asset =>
          dispatch(
            undoReturnAssetThunk({
              employeeId,
              assetId: asset.id
            })
          ).unwrap()
        );


      // ---------- DOCUMENT ADD ----------
      const docUpdates = (editData.documents || [])
        .filter(
          (doc) =>
            doc.fileObject &&
            doc.id &&
            /^[0-9a-fA-F]{24}$/.test(doc.id)
        )
        .map((doc) => {
          const formData = new FormData();
          formData.append("document", doc.fileObject);
          formData.append("documentName", doc.name);

          return dispatch(
            replaceDocumentThunk({
              employeeId,
              documentId: doc.id,
              formData,
            })
          ).unwrap();
        });



      await Promise.all([
        ...assetReturns,
        ...assetUndo,
        ...docUpdates,
      ]);


      await dispatch(getEmployeeByIdThunk(employeeId)).unwrap();
      await dispatch(getEmployeesThunk({ page, limit })).unwrap();
      toast.success("Employee updated successfully");
      setShowConfirmModal(false);
      setScreen("profile");

    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error || "Failed to update employee");
    } finally {
      setSaving(false);
    }
  };


  const handleDeleteEmployee = (id, name) => {
    toast(
      ({ closeToast }) => (
        <div>
          <div className="font-bold text-sm mb-2">
            Delete {name}?
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={async () => {
                try {
                  await dispatch(deleteEmployeeThunk(id)).unwrap();
                  await dispatch(getEmployeesThunk({ page, limit }));
                  toast.success("Employee deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete employee");
                }
                closeToast();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold"
            >
              Yes
            </button>

            <button
              onClick={closeToast}
              className="bg-gray-200 px-3 py-1 rounded text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };


  if (screen === "profile") {
    if (loading) return <div className="p-6">Loading...</div>;
    if (!selectedEmployee) return null;

    return (
      <ProfileScreen
        employee={selectedEmployee}
        onBack={goToList}
        onEdit={goToEdit}
      />
    );
  }

  if (screen === "add")
    return (
      <AddEmployeeScreen
        onSave={async (emp) => {
          try {
            await dispatch(createEmployeeThunk(emp)).unwrap();

            toast.success("Employee created successfully");

            await dispatch(getEmployeesThunk({ page, limit }));

            setScreen("list");

          } catch (error) {
            console.error("Create failed:", error);
            toast.error(error || "Failed to create employee");
          }
        }}
        onCancel={() => setScreen("list")}
      />
    );


  if (screen === "edit" && editData) return (
    <EditScreen
      employee={selectedEmployee}
      editData={editData}
      setEditData={setEditData}
      changes={changes}
      netMonthly={netMonthly}
      onBack={goBackToProfile}
      onDiscard={goBackToProfile}
      upd={upd}
      updSalary={updSalary}
      updSC={updSC}
      removeSC={removeSC}
      addSC={addSC}
      updDyn={updDyn}
      addDyn={addDyn}
      removeDyn={removeDyn}
      toggleReturn={toggleReturn}
      onSave={() => setShowConfirmModal(true)}
      showModal={showConfirmModal}
      onConfirm={handleConfirmSave}
      onCancelModal={() => setShowConfirmModal(false)}
      saved={saved}
    />
  );

  // ── LIST SCREEN ──
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      <ToastContainer position="top-right" />
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
                  <tr key={emp._id || emp.employeeNo} className={`border-b border-slate-50 hover:bg-blue-50/40 transition-colors cursor-pointer ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}
                    onClick={() => goToProfile(emp._id)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${DEPT_AVATAR_COLORS[emp.workDetails?.department] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white font-black text-sm flex-shrink-0`}>
                          {emp.employeeName?.charAt(0)?.toUpperCase() || ""}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{emp.employeeName}</div>
                          <div className="text-xs text-slate-500">{emp.workDetails?.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-mono text-slate-600 font-semibold">{emp.employeeNo}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${DEPT_COLORS[emp.workDetails?.department] || "bg-gray-100 text-gray-700"}`}>{emp.workDetails?.department}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{emp.officialEmail}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${emp.status === "active"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "resigned"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{emp.lastLoginAt
                      ? new Date(emp.lastLoginAt).toLocaleDateString()
                      : "Never"}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{new Date(emp.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => goToProfile(emp._id)} className="p-1.5 text-blue-500 hover:bg-blue-100 rounded-lg transition" title="Edit">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp._id, emp.employeeName)}
                          className="p-1.5 text-red-400 hover:bg-red-100 rounded-lg transition"
                          title="Delete"
                        >
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
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${DEPT_AVATAR_COLORS[emp.workDetails?.department] || "from-gray-400 to-gray-500"} flex items-center justify-center text-white font-black text-base flex-shrink-0`}>
                    {emp.employeeName?.charAt(0)?.toUpperCase() || ""}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{emp.employeeName}</span>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${emp.status === "active"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "resigned"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {emp.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">{emp.workDetails?.designation} · {emp.officialEmail}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">{emp.employeeNo}</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${DEPT_COLORS[emp.workDetails?.department] || "bg-gray-100 text-gray-700"}`}>{emp.workDetails?.department}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 font-medium">
            Showing {filteredEmployees.length} of {employees.length} employees
          </div>
        </div>
        {pagination && (
          <div className="flex items-center justify-between mt-4 px-2">

            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold
        ${page === 1
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              <FiChevronLeft className="w-4 h-4" />
              Prev
            </button>

            <span className="text-sm font-semibold text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              disabled={page === pagination.totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold
        ${page === pagination.totalPages
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              Next
              <FiChevronRight className="w-4 h-4" />
            </button>

          </div>
        )}
      </div>
      {saved && <Toast msg="Employee updated successfully!" />}
    </div>
  );
}

// ─── PROFILE SCREEN ────────────────────────────────────────────────────────────
function ProfileScreen({ employee: emp, onBack, onEdit }) {

  const safeEmp = {
    salary: {
      totalCtc: 0,
      components: [],
      basic: 0,
      hra: 0,
      conveyance: 0,
      specialAllowance: 0,
      deductions: {}
    },
    leaves: {
      casual: 0,
      sick: 0,
      earned: 0,
      lossOfPay: 0
    },
    assets: [],
    documents: [],
    qualifications: [],
    personalDetails: {},
    workDetails: {},
    ...emp
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 sm:p-6 lg:p-8">
      {/* <ToastContainer position="top-right" /> */}
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 transition">
          <FiChevronLeft className="w-4 h-4" /> Back to Employees
        </button>

        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-3xl">
            {safeEmp.personalDetails?.profileImage ? (
              <img
                src={safeEmp.personalDetails.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              safeEmp.employeeName?.charAt(0)?.toUpperCase()
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {safeEmp.employeeName}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {safeEmp.workDetails?.designation} ·{" "}
              {safeEmp.workDetails?.department}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <Chip label={safeEmp.employeeNo} className="bg-white/10 text-white" />
              <Chip
                label={safeEmp.workDetails?.employmentStatus}
                className={
                  safeEmp.workDetails?.employmentStatus === "active"
                    ? "bg-green-500/20 text-green-300"
                    : safeEmp.workDetails?.employmentStatus === "on leave"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                }
              />
              <Chip label={safeEmp.workDetails?.workType} className="bg-white/10 text-white" />
            </div>
          </div>

          <button
            onClick={onEdit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl"
          >
            <FiEdit2 className="w-4 h-4 inline mr-2" />
            Edit Employee
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Personal */}
          <InfoCard title="Personal Info" Icon={FiUser}>
            <InfoRow label="Email" value={safeEmp.officialEmail} />
            <InfoRow label="Phone" value={safeEmp.phoneNumber} />
            <InfoRow label="Blood Group" value={safeEmp.personalDetails?.bloodGroup} />
            <InfoRow label="Manager" value={safeEmp.workDetails?.reportingManager} />
            <InfoRow
              label="Address"
              value={`${safeEmp.personalDetails?.address || ""},
          ${safeEmp.personalDetails?.city || ""} -
          ${safeEmp.personalDetails?.pinCode || ""}`}
            />
          </InfoCard>

          {/* Work */}
          <InfoCard title="Work Details" Icon={FiBriefcase}>
            <InfoRow label="Location" value={safeEmp.workDetails?.workLocation} />
            <InfoRow label="Work Mode" value={safeEmp.workDetails?.workType} />
            <InfoRow label="Joined" value={safeEmp.workDetails?.dateOfJoining} />
            <InfoRow
              label="Employee Status"
              value={safeEmp.workDetails?.employmentStatus}
            />

            <InfoRow label="Headline" value={safeEmp.headline} />
          </InfoCard>

          {/* Salary */}
          <InfoCard title="Salary" Icon={FiDollarSign}>
            <InfoRow
              label="Annual CTC"
              value={fmt(safeEmp.salary?.totalCtc || 0)}
            />

            {(safeEmp.salary?.components || []).map((c) => (
              <InfoRow
                key={c.id}
                label={c.name}
                value={fmt(c.amount || 0)}
                tag={c.type === "deduction" ? "deduction" : "earning"}
              />
            ))}

            <div className="mt-3 pt-3 border-t border-slate-100">
              <InfoRow
                label="Net Monthly"
                value={fmt(
                  (safeEmp.salary?.components || []).reduce(
                    (s, c) =>
                      c.type === "earning"
                        ? s + (c.amount || 0)
                        : s - (c.amount || 0),
                    0
                  )
                )}
                highlight
              />
            </div>
          </InfoCard>

          {/* Assets + Leaves */}
          <InfoCard title="Assets & Leaves" Icon={FiMonitor}>
            {safeEmp.assets?.length > 0 ? (
              safeEmp.assets.map((a) => (
                <InfoRow
                  key={a.id}
                  label={a.name}
                  value={`${a.serial} (${a.status})`}
                />
              ))
            ) : (
              <p className="text-slate-400 text-xs italic">
                No assets assigned
              </p>
            )}

            <div className="mt-3 pt-3 border-t border-slate-100">
              <InfoRow
                label="Earned Leave"
                value={`${safeEmp.leaves?.earned || 0} days`}
              />

              <InfoRow
                label="Sick Leave"
                value={`${safeEmp.leaves?.sick || 0} days`}
              />

              <InfoRow
                label="Casual Leave"
                value={`${safeEmp.leaves?.casual || 0} days`}
              />

              <InfoRow label="Loss Of Pay Leave" value={`${safeEmp.leaves?.lossOfPay || 0} days`} />
               </div>
          </InfoCard>


          {/* Documents */}
          {safeEmp.documents?.length > 0 && (
            <InfoCard title="Documents" Icon={FiFileText}>
              {safeEmp.documents.map((d) => (
                <InfoRow
                  key={d._id || d.id || d.name}
                  label={d.name}
                  value={typeof d.fileName === "string" ? d.fileName : d.fileName?.name}
                />
              ))}
            </InfoCard>
          )}



          {safeEmp.customFields?.length > 0 && (
            <InfoCard title="Custom Fields" Icon={FiFile}>
              {safeEmp.customFields.map((f) => (
                <InfoRow
                  key={f.id}
                  label={f.fieldName}
                  value={String(f.value)}
                />
              ))}
            </InfoCard>
          )}

          {/* Qualifications */}
          {safeEmp.qualifications?.length > 0 && (
            <InfoCard title="Qualifications" Icon={FiAward}>
              {safeEmp.qualifications.map((q) => (
                <div key={q._id || q.id || q.degree} className="py-2 border-b border-slate-50 last:border-0">
                  <div className="font-bold text-slate-800 text-sm">
                    {q.degree}
                  </div>
                  <div className="text-xs text-slate-500">
                    {q.institution} · {q.year}
                  </div>
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

function EditScreen({
  employee,
  editData,
  setEditData,
  changes,
  netMonthly,
  onBack,
  onDiscard,
  upd,
  updSalary,
  updSC,
  removeSC,
  addSC,
  updDyn,
  addDyn,
  removeDyn,
  toggleReturn,
  onSave,
  showModal,
  onConfirm,
  onCancelModal,
  saved
}) {

  const safeEmployee = {
    salary: {
      totalCtc: employee?.salary?.totalCtc ?? 0,
      components: employee?.salary?.components ?? []
    },
    leaves: {
      casual: employee?.leaves?.casual ?? 0,
      sick: employee?.leaves?.sick ?? 0,
      earned: employee?.leaves?.earned ?? 0,
      lossOfPay: employee?.leaves?.lossOfPay ?? 0
    },
    assets: employee?.assets ?? [],
    documents: employee?.documents ?? [],
    workDetails: employee?.workDetails ?? {},
    personalDetails: employee?.personalDetails ?? {},
    ...employee
  };

  if (!editData || !safeEmployee) return null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sticky topbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-3 py-2 rounded-lg transition"
          >
            ← Back
          </button>


          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-blue-500 flex items-center justify-center text-white font-bold text-sm">

            {editData.personalDetails?.profileImageFile ? (
              <img
                src={URL.createObjectURL(editData.personalDetails.profileImageFile)}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : employee.personalDetails?.profileImage ? (
              <img
                src={employee.personalDetails.profileImage}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              employee.employeeName?.charAt(0)?.toUpperCase()
            )}

            <label className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer">
              <FiUpload className="text-white w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setEditData((prev) => ({
                      ...prev,
                      personalDetails: {
                        ...prev.personalDetails,
                        profileImageFile: e.target.files[0]
                      }
                    }));
                  }
                }}
              />
            </label>

          </div>

          <div>
            <div className="font-black text-slate-900 text-sm sm:text-base">
              {employee.employeeName}
            </div>
            <div className="text-blue-600 font-bold text-xs">
              ● Edit Mode Active
            </div>
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
            <EF label="Full Name" value={editData.employeeName || ""} orig={employee.employeeName} onChange={v => upd("employeeName", v)} />
            <EF label="Phone Number" value={editData.phoneNumber} orig={employee.phoneNumber} onChange={v => upd("phoneNumber", v)} />
            <EF
              label="Official Email"
              value={editData.officialEmail}
              orig={employee.officialEmail}
              onChange={v => upd("officialEmail", v)}
            />
            <EF
              label="Blood Group"
              value={editData.personalDetails?.bloodGroup || ""}
              orig={safeEmployee.personalDetails?.bloodGroup}
              onChange={v =>
                setEditData(prev => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    bloodGroup: v
                  }
                }))
              }
              type="select"
              opts={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            />

            <EF label="Professional Headline" value={editData.headline} orig={employee.headline} onChange={v => upd("headline", v)} />
          </div>
        </EditSection>

        {/* Work */}
        <EditSection title="Work Details" Icon={FiBriefcase}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EF label="Designation" value={editData.workDetails?.designation} orig={safeEmployee.workDetails?.designation} onChange={v => setEditData(p => ({
              ...p,
              workDetails: { ...p.workDetails, designation: v }
            }))} />
            <EF
              label="Department"
              value={editData.workDetails?.department}
              orig={safeEmployee.workDetails?.department}
              onChange={v =>
                setEditData(prev => ({
                  ...prev,
                  workDetails: {
                    ...prev.workDetails,
                    department: v
                  }
                }))
              }
            />
            <EF
              label="Reporting Manager"
              value={editData.workDetails?.reportingManager}
              orig={safeEmployee.workDetails?.reportingManager}
              onChange={v =>
                setEditData(p => ({
                  ...p,
                  workDetails: { ...p.workDetails, reportingManager: v }
                }))
              }
            />
            <EF label="Work Location" value={editData.workDetails?.workLocation}
              orig={safeEmployee.workDetails?.workLocation}
              onChange={v =>
                setEditData(p => ({
                  ...p,
                  workDetails: { ...p.workDetails, workLocation: v }
                }))
              } />

            <EF
              label="Work Type"
              value={editData.workDetails?.workType || ""}
              orig={safeEmployee.workDetails?.workType}
              onChange={v =>
                setEditData(p => ({
                  ...p,
                  workDetails: { ...p.workDetails, workType: v }
                }))
              }
              type="select"
              opts={["Onsite", "WFH", "Hybrid"]}
            />
            <EF
              label="Employment Status"
              value={editData.workDetails?.employmentStatus}
              orig={employee.workDetails?.employmentStatus}
              onChange={v =>
                setEditData(p => ({
                  ...p,
                  workDetails: {
                    ...p.workDetails,
                    employmentStatus: v
                  }
                }))
              }
              type="select"
              opts={["active", "on leave", "resigned"]}
            />

            <EF
              label="Date of Joining"
              value={editData.workDetails?.dateOfJoining || ""}
              orig={safeEmployee.workDetails?.dateOfJoining}
              onChange={v =>
                setEditData(p => ({
                  ...p,
                  workDetails: { ...p.workDetails, dateOfJoining: v }
                }))
              }
              type="date"
            />

          </div>
        </EditSection>

        {/* Salary */}

        {(editData.salary?.components || []).map((comp) => {
          const orig = (safeEmployee.salary?.components || []).find(
            (o) => o.id === comp.id
          );

          const isNew = !orig;
          const isEdited = orig && orig.amount !== comp.amount;

          return (
            <div
              key={comp.id}
              className="rounded-xl p-3 mb-3 border"
              style={{
                background: isNew ? "#fff" : "#e8f0fe",
                borderColor: isNew || isEdited ? "#4285f4" : "#c5d8fc"
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_1fr_auto] gap-3 items-center">

                {/* Component Name */}
                <input
                  value={comp.name}
                  onChange={(e) => updSC(comp.id, "name", e.target.value)}
                  className="border rounded px-3 py-2 text-sm font-semibold"
                />

                {/* Amount */}
                <input
                  type="number"
                  value={comp.amount}
                  onChange={(e) =>
                    updSC(comp.id, "amount", Number(e.target.value))
                  }
                  className="border rounded px-3 py-2 text-sm font-bold"
                />

                {/* Type */}
                <select
                  value={comp.type}
                  onChange={(e) =>
                    updSC(comp.id, "type", e.target.value)
                  }
                  className="border rounded px-3 py-2 text-xs font-bold"
                >
                  <option value="earning">Earning</option>
                  <option value="deduction">Deduction</option>
                </select>

                {/* Remove Button */}
                <button
                  onClick={() => removeSC(comp.id)}
                  className="bg-red-50 text-red-500 px-3 py-2 rounded text-xs font-bold"
                >
                  Remove
                </button>
              </div>

              {isEdited && orig && (
                <div className="text-xs text-red-500 mt-1">
                  Previous: {fmt(orig.amount)}
                </div>
              )}
            </div>
          );
        })}

        {/* Net Monthly */}
        <div className="mt-4 p-3 bg-slate-900 rounded-xl text-white font-bold">
          Net Monthly: {fmt(netMonthly)}
        </div>

        <button
          onClick={addSC}
          className="mt-3 border-2 border-dashed border-blue-400 text-blue-500 font-bold text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition"
        >
          + ADD COMPONENT
        </button>

        {/* Assets */}
        <EditSection title="Assigned Assets" Icon={FiMonitor}>
          {editData.assets.map(asset => {
            const isOrig = !!(safeEmployee.assets || []).find(
              a => a.id === asset.id
            );
            const isNew = !isOrig;
            const returned = asset.status === "returned";
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
                  <input
                    type="date"
                    value={asset.assignedDate?.slice(0, 10) || ""}
                    onChange={e =>
                      updDyn("assets", asset.id, "assignedDate", e.target.value)} disabled={isOrig}
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
          <button onClick={() => addDyn("assets", {
            id: genId(),
            name: "",
            serial: "",
            assignedDate: ""
          })} className="border-2 border-dashed border-blue-400 text-blue-500 font-black text-xs px-4 py-2 rounded-xl hover:bg-blue-50 transition">+ ASSIGN NEW ASSET</button>
        </EditSection>

        {/* Documents */}
        <EditSection title="Documents" Icon={FiFileText}>
          {editData.documents.map(doc => {
            const isOrig = !!(safeEmployee.documents || []).find(
              d => d.id === doc.id
            );
            const isNew = !isOrig;
            const origDoc = (safeEmployee.documents || []).find(
              d => d.id === doc.id
            );

            const isReplaced =
              isOrig && origDoc?.fileName !== doc.fileName;
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
                  REPLACE
                  <input
                    type="file"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files[0]) {
                        updDyn("documents", doc.id, "fileName", e.target.files[0].name);
                        updDyn("documents", doc.id, "fileObject", e.target.files[0]); // ADD THIS
                      }
                    }}
                  />
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

            <EF
              label="Address Line"
              value={editData.personalDetails?.address}
              orig={safeEmployee.personalDetails?.address}
              onChange={v =>
                setEditData(prev => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    address: v
                  }
                }))
              }
            />

            <EF
              label="City"
              value={editData.personalDetails?.city || ""}
              orig={safeEmployee.personalDetails?.city}
              onChange={v =>
                setEditData(prev => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    city: v
                  }
                }))
              }
            />

            <EF
              label="ZIP Code"
              value={editData.personalDetails?.pinCode}
              orig={safeEmployee.personalDetails?.pinCode}
              onChange={v =>
                setEditData(prev => ({
                  ...prev,
                  personalDetails: {
                    ...prev.personalDetails,
                    pinCode: v
                  }
                }))
              }
            />

          </div>
        </EditSection>

        {/* Leaves */}
        <EditSection title="Leave Allocation" Icon={FiUmbrella}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["casual", "sick", "earned", "lossOfPay"].map(lt => (
              <EF key={lt} label={`${lt.charAt(0).toUpperCase() + lt.slice(1)} Leave`} value={editData.leaves[lt]} orig={safeEmployee.leaves?.[lt] ?? 0}
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
                  {items.map((item) => (
                    <div
                      key={`${item.section}-${item.field}-${item.from}-${item.to}`}
                      className="bg-slate-50 rounded-lg px-3 py-2 mb-1.5"
                    >
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
  firstName: "", lastName: "", email: "", phone: "",
  password: "",
  bloodGroup: "", dob: "", gender: "", profilePhoto: null,
  employeeId: "EMP-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
  department: "", designation: "", joiningDate: "", workLocation: "Office", employmentStatus: "active",
  shiftStart: "09:00", shiftEnd: "18:00",
  salary: initSalaryState(),
  leaves: { casual: 12, sick: 12, earned: 18, lop: 0 },
  assets: [], workExperiences: [], otherDocuments: [], skills: [],
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

    if (s === 1) {
      if (!form.reportingManager) {
        e.reportingManager = "Select a reporting manager";
      }
    }

    if (s === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!form.firstName.trim()) e.firstName = "Required";
      if (!form.lastName.trim()) e.lastName = "Required";

      if (!form.password || !form.password.trim()) {
        e.password = "Password is required";
      } else {
        const strongPassword =
          /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

        if (!strongPassword.test(form.password.trim())) {
          e.password =
            "Password must be at least 8 characters and include uppercase, number, and special character";
        }
      }

      if (!form.bloodGroup) {
        e.bloodGroup = "Blood group is required";
      }

      if (!form.email.trim()) {
        e.email = "Email is required";
      } else if (!emailRegex.test(form.email.trim())) {
        e.email = "Enter a valid email (e.g. abc@gmail.com)";
      }

      if (!form.phone.trim()) {
        e.phoneNumber = "Phone number is required";
      } else if (!phoneRegex.test(form.phone.trim())) {
        e.phoneNumber = "Phone number must be exactly 10 digits";
      }

      if (!form.gender) e.gender = "Required";
    }

    if (s === 3) {
      if (!form.department) e.department = "Required";
      if (!form.designation.trim()) e.designation = "Required";
      if (!form.joiningDate) e.joiningDate = "Required";


      if (!form.employmentStatus) {
        e.employmentStatus = "Employment status is required";
      }
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

    const salaryComponents = form.salary.components;

    const extraComponents = salaryComponents
      .filter(c => !["basic", "hra", "conveyance", "special", "pf", "tax"].includes(c.id))
      .map(c => ({
        name: c.name,
        amount: Number(c.amount || 0),
        type: c.type
      }));

    const getAmount = (id) =>
      Number(salaryComponents.find(c => c.id === id)?.amount || 0);

    const totalEarn = salaryComponents
      .filter(c => c.type === "earning")
      .reduce((s, c) => s + Number(c.amount || 0), 0);

    const totalDed = salaryComponents
      .filter(c => c.type === "deduction")
      .reduce((s, c) => s + Number(c.amount || 0), 0);

    const netMo = totalEarn - totalDed;


    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!/^[0-9]{10}$/.test(form.emergencyPhone)) {
      setErrors(prev => ({
        ...prev,
        emergencyPhone: "Contact number must be exactly 10 digits"
      }));
      return;
    }

    const newEmp = {

      tenantId: loggedUser?.tenantId,
      createdBy: loggedUser?._id,
      createdByModel: loggedUser?.role || "hr",

      role: form.roleType?.toLowerCase() === "manager"
        ? "manager"
        : "employee",

      employeeName: `${form.firstName} ${form.lastName}`,
      employeeNo: form.employeeId,

      officialEmail: form.email?.toLowerCase().trim(),
      phoneNumber: form.phone?.trim(),
      password: form.password,

      status: "active",

      personalDetails: {
        profileImage: null,
        dob: form.dob ? new Date(form.dob) : null,
        bloodGroup: form.bloodGroup,
        personalEmail: "",
        alternateNumber: "",
        address: form.currentAddress?.line1 || "",
        city: form.currentAddress?.city || "",
        pinCode: form.currentAddress?.zip || ""
      },

      workDetails: {
        department: form.department || "",
        designation: form.designation || "",
        dateOfJoining: form.joiningDate ? new Date(form.joiningDate) : null,
        reportingManager: form.reportingManager || "",
        workLocation: form.workLocation || "",
        workType:
          form.workLocation === "Remote"
            ? "WFH"
            : form.workLocation === "Office"
              ? "Onsite"
              : "Hybrid",
        employmentStatus: form.employmentStatus
      },

      experiences: (form.workExperiences || []).map(exp => ({
        jobTitle: exp.role || "",
        companyName: exp.company || "",
        duration: exp.years || "",
        documentUrl: null
      })),

      documents: (form.otherDocuments || []).map(doc => ({
        documentName: doc.documentName || doc.name || "",
        documentUrl: doc.documentUrl || null
      })),

      assets: (form.assets || [])
        .filter(asset => asset.type)
        .map(asset => ({
          assetType: asset.type,
          serialNumber: asset.serial || "",
          assignedDate: asset.issueDate ? new Date(asset.issueDate) : null,
          documentUrl: null
        })),

      leaves: {
        casual: form.leaves.casual || 0,
        sick: form.leaves.sick || 0,
        earned: form.leaves.earned || 0,
        lossOfPay: form.leaves.lop || 0
      },

      skills: (form.skills || [])
        .filter(s => s.skillCategory && s.skillName)
        .map(s => ({
          skillCategory: s.skillCategory,
          skillName: s.skillName
        })),

      salary: {
        basic: getAmount("basic"),
        hra: getAmount("hra"),
        conveyance: getAmount("conveyance"),
        specialAllowance: getAmount("special"),

        extraComponents: extraComponents,

        deductions: {
          pfEmployee: getAmount("pf"),
          pfEmployer: 0,
          professionalTax: 0,
          medicalInsurance: 0
        },

        grossSalary: totalEarn,
        netPay: netMo,
        totalCtc: Number(form.salary.totalCTC || 0)
      },

      customFields: Object.entries(customVals).map(([key, value]) => ({
        fieldName: key,
        fieldType: "text",
        value: value
      }))
    };

    console.log("Submitting Employee:", newEmp);
    console.log(JSON.stringify(newEmp, null, 2));
    const formData = new FormData();

    // Append simple fields
    formData.append("tenantId", newEmp.tenantId);
    formData.append("createdBy", newEmp.createdBy);
    formData.append("createdByModel", newEmp.createdByModel);
    formData.append("role", newEmp.role);
    formData.append("employeeName", newEmp.employeeName);
    formData.append("employeeNo", newEmp.employeeNo);
    formData.append("officialEmail", newEmp.officialEmail);
    formData.append("phoneNumber", newEmp.phoneNumber);



    formData.append("password", newEmp.password);
    formData.append("status", newEmp.status);

    if (form.profilePhoto) {
      formData.append("profilePhoto", form.profilePhoto);
    }

    // Append nested objects as JSON string
    formData.append("personalDetails", JSON.stringify(newEmp.personalDetails));
    formData.append("workDetails", JSON.stringify(newEmp.workDetails));
    formData.append("leaves", JSON.stringify(newEmp.leaves));
    formData.append("salary", JSON.stringify(newEmp.salary));
    formData.append("skills", JSON.stringify(newEmp.skills));
    formData.append("experiences", JSON.stringify(newEmp.experiences));
    formData.append("assets", JSON.stringify(newEmp.assets));
    formData.append("customFields", JSON.stringify(newEmp.customFields));


    form.otherDocuments.forEach((doc) => {
      if (doc.fileObject) {
        formData.append("documents", doc.fileObject);
        formData.append("documentNames", doc.name);
      }
    });

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
                    <AF
                      label="Password"
                      type="password"
                      required
                      value={form.password}
                      onChange={(v) => setF("password", v)}
                      error={errors.password}
                      placeholder="Enter secure password"
                    />
                    <AF
                      label="Phone Number"
                      required
                      value={form.phone}
                      onChange={v => {
                        const onlyNums = v.replace(/\D/g, "").slice(0, 10);
                        setF("phone", onlyNums);
                      }}
                      error={errors.phoneNumber}
                      placeholder="Enter 10 digit number"
                    />
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
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Blood Group <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={form.bloodGroup}
                        onChange={(e) => setF("bloodGroup", e.target.value)}
                        className={`w-full h-11 px-3 rounded-xl border
      ${errors.bloodGroup ? "border-red-500" : "border-gray-300"}
      focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>

                      {errors.bloodGroup && (
                        <p className="text-xs text-red-500">{errors.bloodGroup}</p>
                      )}
                    </div>
                  </div>
                  <CFRenderer stepId={2} defs={customDefs[2]} vals={customVals} onChange={(k, v) => setCustomVals(p => ({ ...p, [k]: v }))} onRm={rmCFDef} />
                  <AddCFBtn onClick={() => openCFModal(2)} />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  {/* Skills Section */}
                  <div className="mt-4">
                    <div className="text-sm font-bold text-slate-700 mb-2">
                      Skills
                    </div>

                    {form.skills.map((skill, index) => (
                      <div key={skill.id} className="grid grid-cols-2 gap-2 mb-2">
                        <input
                          placeholder="Skill Category"
                          value={skill.skillCategory}
                          onChange={(e) =>
                            setForm(prev => ({
                              ...prev,
                              skills: prev.skills.map((s, i) =>
                                i === index ? { ...s, skillCategory: e.target.value } : s
                              )
                            }))
                          }
                          className="border rounded-lg px-3 py-2 text-sm"
                        />

                        <div className="flex gap-2">
                          <input
                            placeholder="Skill Name"
                            value={skill.skillName}
                            onChange={(e) =>
                              setForm(prev => ({
                                ...prev,
                                skills: prev.skills.map((s, i) =>
                                  i === index ? { ...s, skillName: e.target.value } : s
                                )
                              }))
                            }
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setForm(prev => ({
                                ...prev,
                                skills: prev.skills.filter((_, i) => i !== index)
                              }))
                            }
                            className="text-red-500 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setForm(prev => ({
                          ...prev,
                          skills: [
                            ...prev.skills,
                            { id: genId(), skillCategory: "", skillName: "" }
                          ]
                        }))
                      }
                      className="text-blue-600 text-xs font-bold mt-2"
                    >
                      + Add Skill
                    </button>
                  </div>
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
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">
                        Employment Status <span className="text-red-500">*</span>
                      </label>

                      <select
                        value={form.employmentStatus}
                        onChange={(e) => setF("employmentStatus", e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-gray-300
               focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="probation">Probation</option>
                        <option value="terminated">Terminated</option>
                      </select>
                    </div>
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
                            <input type="file" className="hidden" onChange={e => {
                              if (e.target.files[0]) {
                                const file = e.target.files[0];
                                const newId = genId();

                                setForm(p => ({
                                  ...p,
                                  otherDocuments: [
                                    ...p.otherDocuments,
                                    {
                                      id: newId,
                                      name: docName,
                                      fileName: file.name,
                                      fileObject: file
                                    }
                                  ]
                                }));
                              }
                            }} />
                          </label>
                        ))}
                      </div>
                    </div>
                    {form.otherDocuments.map(doc => (
                      <div key={doc.id} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-2">
                        <span className="text-lg">📄</span>
                        <input value={doc.name} onChange={e => updDoc(doc.id, "name", e.target.value)} placeholder="Document name" className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-slate-800 placeholder-slate-400" />
                        <span className="text-xs text-slate-400 font-medium max-w-[120px] truncate">{typeof doc.fileName === "string"
                          ? doc.fileName
                          : doc.fileName?.name || "No file"}</span>
                        <label className="bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-1 text-xs font-black text-blue-500 cursor-pointer transition">
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            onChange={e => {
                              if (e.target.files[0]) {
                                updDoc(doc.id, "fileObject", e.target.files[0]);
                                updDoc(doc.id, "fileName", e.target.files[0].name);
                              }
                            }}
                          />
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
                      <AF
                        label="Contact Number"
                        value={form.emergencyPhone}
                        onChange={v => {
                          const onlyNums = v.replace(/\D/g, "").slice(0, 10);
                          setF("emergencyPhone", onlyNums);
                        }}
                        error={
                          form.emergencyPhone &&
                            !/^[0-9]{10}$/.test(form.emergencyPhone)
                            ? "Contact number must be exactly 10 digits"
                            : ""
                        }
                        placeholder="Enter 10 digit number"
                      />
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
                  {[{ val: "text", label: "Text", icon: "Aa" }, { val: "number", label: "Number", icon: "123" }, { val: "date", label: "Date", icon: "📅" },
                  { val: "dropdown", label: "Dropdown", icon: "▾" }, { val: "file", label: "File", icon: "📎" }, { val: "textarea", label: "Long Text", icon: "¶" }].map(ft => (
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
  if (def.type === "dropdown") return <select value={value ?? ""} onChange={e => onChange(e.target.value)} className={cls}><option value="">Select...</option>{def.options.map(o => <option key={o}>{o}</option>)}</select>;
  if (def.type === "file") return <label className="flex items-center gap-2 bg-slate-50 border border-dashed border-blue-300 rounded-xl px-3 py-2.5 cursor-pointer hover:bg-blue-50 transition"><span className="text-blue-500 font-bold text-xs">{value ? `📄 ${value}` : "📎 Upload file"}</span>
    <input type="file" className="hidden" onChange={e => { if (e.target.files[0]) onChange(e.target.files[0].name); }} /></label>;
  if (def.type === "textarea") return <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls + " resize-none"} />;
  return <input type={def.type} value={value} onChange={e => onChange(e.target.value)} className={cls} />;
}
function AddCFBtn({ onClick }) {
  return <button onClick={onClick} className="flex items-center gap-2 text-xs font-black text-blue-500 border-2 border-dashed
   border-blue-200 hover:border-blue-400 hover:bg-blue-50 px-4 py-2.5 rounded-xl transition w-fit">＋ Add Custom Field</button>;
}
function AF({ label, required, value, onChange, type = "text", error, placeholder }) {
  return (
    <div>
      <AFLabel required={required}>{label}</AFLabel>
      <input type={type} value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={`w-full mt-1.5 bg-slate-50 border ${error ? "border-red-400 bg-red-50/30" : "border-slate-200"}
         rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition`} />
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
  const edited = JSON.stringify(value ?? "") !== JSON.stringify(orig ?? "");

  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-black text-slate-400 uppercase tracking-wider">
          {label}
        </label>
        {edited && (
          <span className="bg-blue-600 text-white text-xs font-black px-1.5 py-0.5 rounded">
            EDITED
          </span>
        )}
      </div>

      {type === "select" ? (
        <select
          value={value ?? ""}
          onChange={e => onChange(e.target.value)}
          style={{
            background: edited ? "#fff" : "#e8f0fe",
            border: edited
              ? "1.5px solid #4285f4"
              : "1.5px solid #c5d8fc"
          }}
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition"
        >
          {opts.map(o => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <input
            type={type}
            value={value ?? ""}
            onChange={e => onChange(e.target.value)}
            style={{
              background: edited ? "#fff" : "#e8f0fe",
              border: edited
                ? "1.5px solid #4285f4"
                : "1.5px solid #c5d8fc"
            }}
            className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none box-border transition"
          />
          {edited && (
            <div className="text-xs text-red-500 font-semibold mt-1 pl-1">
              Previous: {String(orig) || "—"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Toast({ msg }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-[9999]">
      {msg}
    </div>
  );
}