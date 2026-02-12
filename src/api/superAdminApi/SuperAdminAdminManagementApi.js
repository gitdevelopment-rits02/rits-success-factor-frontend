import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DummySkeleton from "../../SuperAdmin/pages/DummySkeleton";

import superAdminAdminManagementThunk
  from "..//Redux/thunks/superAdminAdminManagementThunk";

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
  FiCalendar,
  FiMapPin,
  FiHome,
  FiHash,
  FiBriefcase,
  FiUserCheck,
  FiUsers,
  FiLayers,
  FiBook,
  FiAward,
} from "react-icons/fi";

const initialAdmins = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Ashwini Patil",
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

const mapAdminToForm = (admin) => ({
  role: admin.role || "admin",
  employeeName: admin.employeeName || admin.name || "",
  officialEmail: admin.officialEmail || admin.email || "",
  phoneNumber: admin.phoneNumber || "",
  password: "",
  status: ["active", "disabled"].includes(
    admin.status?.toLowerCase()
  )
    ? admin.status.toLowerCase()
    : "active",



  personalDetails: {
    dob: admin.personalDetails?.dob
      ? admin.personalDetails.dob.split("T")[0]
      : "",
    bloodGroup: admin.personalDetails?.bloodGroup || "",
    personalEmail: admin.personalDetails?.personalEmail || "",
    alternateNumber: admin.personalDetails?.alternateNumber || "",
    address: admin.personalDetails?.address || "",
    city: admin.personalDetails?.city || "",
    pinCode: admin.personalDetails?.pinCode || "",
  },

  workDetails: {
    department: admin.workDetails?.department || "",
    designation: admin.workDetails?.designation || "",
    dateOfJoining: admin.workDetails?.dateOfJoining
      ? admin.workDetails.dateOfJoining.split("T")[0]
      : "",
    reportingManager: admin.workDetails?.reportingManager || "",
    workLocation: admin.workDetails?.workLocation || "",
    workType: admin.workDetails?.workType || "",
    employmentStatus: admin.workDetails?.employmentStatus || "active",
  },

  skills: admin.skills?.length
    ? admin.skills.map(s => ({
      skillCategory: s.skillCategory || "",
      skillName: s.skillName || "",
    }))
    : [{ skillCategory: "", skillName: "" }],

  qualification: {
    degree: admin.qualification?.degree || "",
    institution: admin.qualification?.institution || "",
    yearOfCompletion: admin.qualification?.yearOfCompletion || "",
  },

  experiences: admin.experiences?.length
    ? admin.experiences.map(e => ({
      jobTitle: e.jobTitle || "",
      companyName: e.companyName || "",
      duration: e.duration || "",
      documentUrl: e.documentUrl || null,
    }))
    : [{ jobTitle: "", companyName: "", duration: "", documentUrl: null }],

  documents: admin.documents?.length
    ? admin.documents.map(d => ({
      documentName: d.documentName || "",
      documentUrl: d.documentUrl || null,
    }))
    : [{ documentName: "", documentUrl: null }],


  assets: admin.assets?.length
    ? admin.assets.map(a => ({
      assetName: a.assetName || "",
      serialNumber: a.serialNumber || "",
      assignedDate: a.assignedDate
        ? a.assignedDate.split("T")[0]
        : "",
      documentUrl: a.documentUrl || null,
    }))
    : [{ assetName: "", serialNumber: "", assignedDate: "", documentUrl: null }],


  salary: {
    basic: admin.salary?.basic || "",
    hra: admin.salary?.hra || "",
    conveyance: admin.salary?.conveyance || "",
    specialAllowance: admin.salary?.specialAllowance || "",
    grossSalary: admin.salary?.grossSalary || "",
    netPay: admin.salary?.netPay || "",
  },
});


export default function SuperAdminAdminManagement() {
  //  const [admins, setAdmins] = useState(initialAdmins);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("All");
  const [creatorFilter, setCreatorFilter] = useState("All Creators");
  const [showFilters, setShowFilters] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    role: "admin",
    employeeName: "",
    officialEmail: "",
    phoneNumber: "",
    password: "",
    status: "active",

    personalDetails: {
      dob: "",
      bloodGroup: "",
      personalEmail: "",
      alternateNumber: "",
      address: "",
      city: "",
      pinCode: "",
    },

    workDetails: {
      department: "",
      designation: "",
      dateOfJoining: "",
      reportingManager: "",
      workLocation: "",
      workType: "",
      employmentStatus: "active",
    },

    skills: [{ skillCategory: "", skillName: "" }],

    qualification: {
      degree: "",
      institution: "",
      yearOfCompletion: "",
    },

    experiences: [
      {
        jobTitle: "",
        companyName: "",
        duration: "",
        documentUrl: "",
      },
    ],

    documents: [
      {
        documentName: "",
        documentUrl: "",
      },
    ],

    assets: [
      {
        assetName: "",
        serialNumber: "",
        assignedDate: "",
        documentUrl: "",
      },
    ],

    salary: {
      basic: "",
      hra: "",
      conveyance: "",
      specialAllowance: "",
      grossSalary: "",
      netPay: "",
    },
  });



  const dispatch = useDispatch();


  const { data: admins = [], loading, error } = useSelector(
    (state) => state.superAdmin.adminManagement
  );


  useEffect(() => {
    dispatch(superAdminAdminManagementThunk.getAdmins());
  }, [dispatch]);


  const filtered = useMemo(() => {
    if (!Array.isArray(admins)) return [];
    return admins.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        (a.name || "").toLowerCase().includes(q) ||
        (a.email || "").toLowerCase().includes(q) ||
        (a.employeeNo || "").toLowerCase().includes(q);

      const matchStatus =
        statusFilter === "All Status" ||
        a.status === statusFilter;



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
    () => admins.filter((a) => a.status === "active").length,
    [admins]
  );

  const disabledCount = useMemo(
    () => admins.filter((a) => a.status === "inactive").length,
    [admins]
  );



  const createdThisMonth = useMemo(() => {
    const now = new Date();

    return admins.filter((a) => {
      const d = a.created ? new Date(a.created) : null;
      if (!d || isNaN(d)) return false;

      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [admins]);


  const resetForm = () => {
    setForm({
      role: "admin",
      employeeName: "",
      officialEmail: "",
      phoneNumber: "",
      password: "",
      status: "active",

      personalDetails: {
        dob: "",
        bloodGroup: "",
        personalEmail: "",
        alternateNumber: "",
        address: "",
        city: "",
        pinCode: "",
      },

      workDetails: {
        department: "",
        designation: "",
        dateOfJoining: "",
        reportingManager: "",
        workLocation: "",
        workType: "",
        employmentStatus: "active",
      },

      skills: [{ skillCategory: "", skillName: "" }],

      qualification: {
        degree: "",
        institution: "",
        yearOfCompletion: "",
      },

      experiences: [
        { jobTitle: "", companyName: "", duration: "", documentUrl: "" },
      ],

      documents: [
        { documentName: "", documentUrl: "" },
      ],

      assets: [
        { assetName: "", serialNumber: "", assignedDate: "", documentUrl: "" },
      ],

      salary: {
        basic: "",
        hra: "",
        conveyance: "",
        specialAllowance: "",
        grossSalary: "",
        netPay: "",
      },
    });
  };

  const validateBasicDetails = () => {
  const e = {};

  if (!form.employeeName.trim())
    e.employeeName = "Employee Name is required";

  if (!form.officialEmail.trim()) {
    e.officialEmail = "Official Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.officialEmail)
  ) {
    e.officialEmail = "Invalid email format";
  }

  if (!form.phoneNumber) {
    e.phoneNumber = "Phone Number is required";
  } else if (form.phoneNumber.length !== 10) {
    e.phoneNumber = "Phone Number must be 10 digits";
  }

  if (!form.password && !selected)
    e.password = "Password is required";

  if (!form.status)
    e.status = "Status is required";

  return e;
};



 const validatePersonalDetails = () => {
  const e = {};
  const p = form.personalDetails;

  if (!p.dob)
    e["personalDetails.dob"] = "DOB is required";

  if (!p.bloodGroup.trim())
    e["personalDetails.bloodGroup"] = "Blood group is required";

  if (!p.personalEmail.trim()) {
    e["personalDetails.personalEmail"] = "Personal email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(p.personalEmail)
  ) {
    e["personalDetails.personalEmail"] = "Invalid email format";
  }

  if (!p.alternateNumber) {
    e["personalDetails.alternateNumber"] = "Alternate number is required";
  } else if (p.alternateNumber.length !== 10) {
    e["personalDetails.alternateNumber"] =
      "Alternate number must be 10 digits";
  }

  if (!p.city.trim())
    e["personalDetails.city"] = "City is required";

  if (!p.pinCode.trim()) {
    e["personalDetails.pinCode"] = "Pin Code is required";
  } else if (!/^\d{6}$/.test(p.pinCode)) {
    e["personalDetails.pinCode"] = "Pin Code must be 6 digits";
  }

  if (!p.address.trim())
    e["personalDetails.address"] = "Address is required";

  return e;
};

const validateWorkDetails = () => {
  const e = {};
  const w = form.workDetails;

  if (!w.department.trim())
    e["workDetails.department"] = "Department is required";

  if (!w.designation.trim())
    e["workDetails.designation"] = "Designation is required";

  if (!w.dateOfJoining)
    e["workDetails.dateOfJoining"] = "Joining date is required";

  if (!w.reportingManager.trim())
    e["workDetails.reportingManager"] = "Reporting manager required";

  if (!w.workLocation.trim())
    e["workDetails.workLocation"] = "Work location required";

  if (!w.workType.trim())
    e["workDetails.workType"] = "Work type required";

  if (!w.employmentStatus)
    e["workDetails.employmentStatus"] = "Employment status required";

  return e;
};


  const validateSkills = () => {
  const e = {};

  form.skills.forEach((s, i) => {
    if (!s.skillCategory.trim())
      e[`skills.${i}.skillCategory`] = "Skill category required";

    if (!s.skillName.trim())
      e[`skills.${i}.skillName`] = "Skill name required";
  });

  return e;
};


  // 5. Qualification
  const validateQualification = () => {
  const e = {};
  const q = form.qualification;

  if (!q.degree.trim())
    e["qualification.degree"] = "Degree required";

  if (!q.institution.trim())
    e["qualification.institution"] = "Institution required";

  if (!q.yearOfCompletion) {
    e["qualification.yearOfCompletion"] = "Year required";
  } else if (q.yearOfCompletion < 1950 || q.yearOfCompletion > new Date().getFullYear()) {
    e["qualification.yearOfCompletion"] = "Invalid year";
  }

  return e;
};

 const validateExperiences = () => {
  const e = {};

  form.experiences.forEach((ex, i) => {
    if (!ex.jobTitle.trim())
      e[`experiences.${i}.jobTitle`] = "Job title required";

    if (!ex.companyName.trim())
      e[`experiences.${i}.companyName`] = "Company name required";

    if (!ex.duration.trim())
      e[`experiences.${i}.duration`] = "Duration required";

    if (!ex.documentUrl)
      e[`experiences.${i}.documentUrl`] = "Experience document required";
  });

  return e;
};


const validateDocuments = () => {
  const e = {};

  form.documents.forEach((d, i) => {
    if (!d.documentName.trim())
      e[`documents.${i}.documentName`] = "Document name is required";

    if (!d.documentUrl)
      e[`documents.${i}.documentUrl`] = "Document file is required";
  });

  return e;
};



 const validateAssets = () => {
  const e = {};

  form.assets.forEach((a, i) => {
    if (!a.assetName.trim())
      e[`assets.${i}.assetName`] = "Asset name required";

    if (!a.serialNumber.trim())
      e[`assets.${i}.serialNumber`] = "Serial number required";

    if (!a.assignedDate)
      e[`assets.${i}.assignedDate`] = "Assigned date required";
  });

  return e;
};


 const validateSalary = () => {
  const e = {};
  const s = form.salary;

  const isValidNumber = (val) =>
    val !== "" && !isNaN(val) && Number(val) >= 0;

  if (!isValidNumber(s.basic))
    e["salary.basic"] = "Basic salary is required";

  if (!isValidNumber(s.hra))
    e["salary.hra"] = "HRA is required";

  if (!isValidNumber(s.conveyance))
    e["salary.conveyance"] = "Conveyance is required";

  if (!isValidNumber(s.specialAllowance))
    e["salary.specialAllowance"] = "Special Allowance is required";

  if (!isValidNumber(s.grossSalary))
    e["salary.grossSalary"] = "Gross salary is required";

  if (!isValidNumber(s.netPay))
    e["salary.netPay"] = "Net pay is required";

  return e;
};

  
  const validateAllSections = () => {
  const allErrors = {
    ...validateBasicDetails(),
    ...validatePersonalDetails(),
    ...validateWorkDetails(),
    ...validateSkills(),
    ...validateQualification(),
    ...validateExperiences(),
    ...validateDocuments(),
    ...validateAssets(),
    ...validateSalary(),
  };

  setErrors(allErrors);
  return Object.keys(allErrors).length === 0;
};

  const handleCreate = async () => {
    if (!validateAllSections()) return;

    const formData = new FormData();

    // BASIC
    formData.append("employeeName", form.employeeName);
    formData.append("officialEmail", form.officialEmail);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("password", form.password);
    formData.append("status", form.status);
    formData.append("role", form.role);

    // JSON DATA
    formData.append("personalDetails", JSON.stringify(form.personalDetails));
    formData.append("workDetails", JSON.stringify(form.workDetails));
    formData.append("skills", JSON.stringify(form.skills));
    formData.append("qualification", JSON.stringify(form.qualification));

    // EXPERIENCES
    formData.append(
      "experiences",
      JSON.stringify(
        form.experiences.map(({ jobTitle, companyName, duration }) => ({
          jobTitle,
          companyName,
          duration,
        }))
      )
    );

    // DOCUMENTS
    formData.append(
      "documents",
      JSON.stringify(
        form.documents.map(({ documentName }) => ({ documentName }))
      )
    );

    // ASSETS
    formData.append(
      "assets",
      JSON.stringify(
        form.assets.map(({ assetName, serialNumber, assignedDate }) => ({
          assetName,
          serialNumber,
          assignedDate,
        }))
      )
    );

    // SALARY
    formData.append("salary", JSON.stringify(form.salary));

    // FILES — ONLY ONCE
    form.experiences.forEach((e) => {
      if (e.documentUrl instanceof File) {
        formData.append("experienceFiles", e.documentUrl);
      }
    });

    form.documents.forEach((d) => {
      if (d.documentUrl instanceof File) {
        formData.append("documentFiles", d.documentUrl);
      }
    });

    form.assets.forEach((a) => {
      if (a.documentUrl instanceof File) {
        formData.append("assetFiles", a.documentUrl);
      }
    });

    try {
      await dispatch(
        superAdminAdminManagementThunk.createAdmin(formData)
      ).unwrap();

      toast.success("Admin created successfully");
      setOpenCreate(false);
      resetForm();
    } catch (err) {
      toast.error(err || "Failed to create admin");
    }
  };

  const handleEdit = async () => {
    if (!selected) return;

    const formData = new FormData();

    formData.append("employeeName", form.employeeName);
    formData.append("officialEmail", form.officialEmail);
    formData.append("phoneNumber", form.phoneNumber);
    formData.append("status", form.status);

    if (form.password) {
      formData.append("password", form.password);
    }

    formData.append("personalDetails", JSON.stringify(form.personalDetails));
    formData.append("workDetails", JSON.stringify(form.workDetails));
    formData.append("skills", JSON.stringify(form.skills));
    formData.append("qualification", JSON.stringify(form.qualification));
    form.experiences.forEach((e) => {
      if (e.documentUrl instanceof File) {
        formData.append("experienceFiles", e.documentUrl);
      }
    });
    form.documents.forEach((d) => {
      if (d.documentUrl instanceof File) {
        formData.append("documentFiles", d.documentUrl);
      }
    });
    form.assets.forEach((a) => {
      if (a.documentUrl instanceof File) {
        formData.append("assetFiles", a.documentUrl);
      }
    });
    formData.append("salary", JSON.stringify(form.salary));

    try {
      await dispatch(
        superAdminAdminManagementThunk.updateAdmin({
          id: selected._id,
          data: formData,
        })
      ).unwrap();

      toast.success("Admin updated successfully");
      setOpenEdit(false);
      resetForm();
    } catch (err) {
      toast.error(err || "Failed to update admin");
    }
  };

  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-medium text-slate-800">
            Are you sure you want to delete this admin?
          </p>

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={closeToast}
              className="rounded px-3 py-1 text-sm border"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                try {
                  await dispatch(
                    superAdminAdminManagementThunk.deleteAdmin(id)
                  ).unwrap();

                  toast.success("Admin deleted successfully");
                } catch (err) {
                  toast.error(err?.message || "Failed to delete admin");
                }
                closeToast();
              }}
              className="rounded bg-red-600 px-3 py-1 text-sm text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 flex-1 cursor-pointer rounded-xl border-2 border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 sm:h-11 sm:px-4"
                >
                  <option value="All Status">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/*  Loading  */}
          {loading && !error && <DummySkeleton />}

          {/* Error */}
          {error && (
            <div className="py-16 text-center text-red-600">
              <p className="text-lg font-semibold">Something went wrong</p>
              <p className="mt-1 text-sm">
                {typeof error === "string"
                  ? error
                  : error?.message || "Unauthorized"}
              </p>
            </div>
          )}

          {!loading && !error && (
            <>
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
                        key={a._id}
                        className="transition-colors duration-150 hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {a.name}
                        </td>
                        <td className="font-medium text-slate-600">{a.employeeNo}</td>
                        <td className="max-w-[250px] truncate text-sm text-slate-500">
                          {a.email}
                        </td>
                        <td className="text-center">
                          <span
                            className={`inline-flex min-w-[90px] items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold ${a.status === "active"
                              ? "bg-green-100 text-green-700 ring-2 ring-green-200"
                              : "bg-red-100 text-red-700 ring-2 ring-red-200"
                              }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="text-center text-sm text-slate-600">{a.lastLogin}</td>
                        <td className="text-center text-sm text-slate-600">{a.created ? new Date(a.created).toLocaleDateString() : "-"}</td>
                        <td className="pr-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={async () => {
                                try {
                                  const res = await dispatch(
                                    superAdminAdminManagementThunk.getAdminById(a._id)
                                  ).unwrap();

                                  setSelected(res);
                                  setForm(mapAdminToForm(res));
                                  setOpenEdit(true);
                                } catch (err) {
                                  toast.error(err || "Failed to load admin details");
                                }
                              }}
                              className="rounded-lg p-2 text-blue-600 transition-all duration-200 hover:scale-110 hover:bg-blue-50"
                              title="Edit admin"
                            >
                              <FiEdit3 size={18} />
                            </button>


                            <button
                              onClick={() => handleDelete(a._id)}
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
                  <div key={a._id} className="p-4 transition-colors hover:bg-slate-50">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="mb-1 text-base font-semibold text-slate-900">
                          {a.name}
                        </h3>
                        <p className="mb-1 text-sm text-slate-500">{a.email}</p>
                        <p className="text-xs font-medium text-slate-400">{a.employeeNo}</p>
                      </div>

                      <span
                        className={`ml-2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${a.status?.toLowerCase() === "active"

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
                        <p className="mt-0.5 font-medium text-slate-700">{a.created ? new Date(a.created).toLocaleDateString() : "-"}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 border-t border-slate-100 pt-3">
                      <button
                        onClick={async () => {
                          try {
                            const res = await dispatch(
                              superAdminAdminManagementThunk.getAdminById(a._id)
                            ).unwrap();

                            setSelected(res);
                            setForm(mapAdminToForm(res));
                            setOpenEdit(true);
                          } catch (err) {
                            toast.error(err || "Failed to load admin details");
                          }
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                      >
                        <FiEdit3 size={16} />
                        Edit
                      </button>


                      <button
                        onClick={() => handleDelete(a._id)}
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
            </>
          )}
        </div>

      </div>


      {openCreate && (
        <Modal
          title="Create Admin"
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
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
          errors={errors}        // 🔥 ADD THIS
          setErrors={setErrors}
          onClose={() => {
            setOpenEdit(false);
            setSelected(null);
          }}

          onSubmit={handleEdit}
          submitText="Save Changes"
        />
      )}
    </div>
  );
}

function Modal({ title, form, setForm, errors, setErrors, onClose, onSubmit, submitText }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-screen-lg transform rounded-2xl bg-white shadow-2xl transition-all">
        <div  className="flex items-center bg-slate-100 justify-between rounded-2xl border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6">
          <h2 className="text-xl font-bold  text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-200px)]  overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-8  lg:grid-cols-2">

            {/*  BASIC DETAILS  */}

            <section className="lg:col-span-2  bg-slate-100 space-y-4 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Basic Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <Field
                  label="Employee Name"
                  name="employeeName"
                  placeholder="Enter employee full name"
                  value={form.employeeName}
                  onChange={(v) => {
                    setForm({ ...form, employeeName: v });
                    setErrors({ ...errors, employeeName: "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Official Email"
                  name="officialEmail"
                  placeholder="Enter official email address"
                  value={form.officialEmail}
                  onChange={(v) => {
                    setForm({ ...form, officialEmail: v });
                    setErrors({ ...errors, officialEmail: "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={(v) => {
                    const onlyNumbers = v.replace(/\D/g, "").slice(0, 10); // allow only digits, max 10

                    setForm({ ...form, phoneNumber: onlyNumbers });
                    setErrors({ ...errors, phoneNumber: "" });
                  }}
                  errors={errors}
                />


                <Field
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(v) => {
                    setForm({ ...form, password: v });
                    setErrors({ ...errors, password: "" });
                  }}
                  errors={errors}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(e) => {
                      setForm({ ...form, status: e.target.value });
                      setErrors({ ...errors, status: "" });
                    }}
                    className={`w-full rounded-xl border bg-white pl-4 pr-8 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200
    ${errors.status
                        ? "border-red-400 focus:ring-4 focus:ring-red-100 focus:border-red-400"
                        : "border-slate-300 hover:border-slate-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                      }
    focus:outline-none cursor-pointer`}
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>



                  {errors.status && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors.status}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* PERSONAL DETAILS */}

            <section className="space-y-4 bg-slate-100 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Personal Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <Field
                  label="DOB"
                  name="personalDetails.dob"
                  type="date"
                  value={form.personalDetails.dob}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      personalDetails: { ...form.personalDetails, dob: v },
                    });
                    setErrors({ ...errors, "personalDetails.dob": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Blood Group"
                  name="personalDetails.bloodGroup"
                  placeholder="e.g. O+, A+"
                  value={form.personalDetails.bloodGroup}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      personalDetails: { ...form.personalDetails, bloodGroup: v },
                    });
                    setErrors({ ...errors, "personalDetails.bloodGroup": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Personal Email"
                  name="personalDetails.personalEmail"
                  placeholder="Enter personal email"
                  value={form.personalDetails.personalEmail}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      personalDetails: { ...form.personalDetails, personalEmail: v },
                    });
                    setErrors({ ...errors, "personalDetails.personalEmail": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Alternate Number"
                  name="personalDetails.alternateNumber"
                  placeholder="Enter alternate phone number"
                  value={form.personalDetails.alternateNumber}
                  onChange={(v) => {
                    const onlyNumbers = v.replace(/\D/g, "").slice(0, 10); // only digits, max 10

                    setForm({
                      ...form,
                      personalDetails: {
                        ...form.personalDetails,
                        alternateNumber: onlyNumbers,
                      },
                    });

                    setErrors({ ...errors, "personalDetails.alternateNumber": "" });
                  }}
                  errors={errors}
                />


                <Field
                  label="City"
                  name="personalDetails.city"
                  placeholder="Enter city"
                  value={form.personalDetails.city}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      personalDetails: { ...form.personalDetails, city: v },
                    });
                    setErrors({ ...errors, "personalDetails.city": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Pin Code"
                  name="personalDetails.pinCode"
                  placeholder="Enter pin code"
                  value={form.personalDetails.pinCode}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      personalDetails: { ...form.personalDetails, pinCode: v },
                    });
                    setErrors({ ...errors, "personalDetails.pinCode": "" });
                  }}
                  errors={errors}
                />
              </div>

              <Field
                label="Address"
                name="personalDetails.address"
                placeholder="Enter full address"
                value={form.personalDetails.address}
                onChange={(v) => {
                  setForm({
                    ...form,
                    personalDetails: { ...form.personalDetails, address: v },
                  });
                  setErrors({ ...errors, "personalDetails.address": "" });
                }}
                errors={errors}
              />
            </section>

            {/* WORK DETAILS  */}

            <section className="space-y-4 bg-slate-100 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Work Details</h3>

              <div className="grid sm:grid-cols-2 gap-4">

                <Field
                  label="Department"
                  name="workDetails.department"
                  placeholder="e.g. Engineering / HR"
                  value={form.workDetails.department}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      workDetails: { ...form.workDetails, department: v },
                    });
                    setErrors({ ...errors, "workDetails.department": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Designation"
                  name="workDetails.designation"
                  placeholder="e.g. Software Engineer"
                  value={form.workDetails.designation}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      workDetails: { ...form.workDetails, designation: v },
                    });
                    setErrors({ ...errors, "workDetails.designation": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Date of Joining"
                  name="workDetails.dateOfJoining"
                  type="date"
                  value={form.workDetails.dateOfJoining}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      workDetails: { ...form.workDetails, dateOfJoining: v },
                    });
                    setErrors({ ...errors, "workDetails.dateOfJoining": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Reporting Manager"
                  name="workDetails.reportingManager"
                  placeholder="Manager employee ID / name"
                  value={form.workDetails.reportingManager}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      workDetails: {
                        ...form.workDetails,
                        reportingManager: v,
                      },
                    });
                    setErrors({ ...errors, "workDetails.reportingManager": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Work Location"
                  name="workDetails.workLocation"
                  placeholder="e.g. Bengaluru"
                  value={form.workDetails.workLocation}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      workDetails: { ...form.workDetails, workLocation: v },
                    });
                    setErrors({ ...errors, "workDetails.workLocation": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Work Type"
                  name="workDetails.workType"
                  placeholder="Hybrid / Remote / Onsite"
                  value={form.workDetails.workType}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      workDetails: { ...form.workDetails, workType: v },
                    });
                    setErrors({ ...errors, "workDetails.workType": "" });
                  }}
                  errors={errors}
                />

                <div>
                  <label className="mb-2 block  text-sm font-medium text-slate-700">
                    Employment Status
                  </label>

                  <select
                    value={form.workDetails.employmentStatus}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        workDetails: {
                          ...form.workDetails,
                          employmentStatus: e.target.value,
                        },
                      });
                      setErrors({ ...errors, "workDetails.employmentStatus": "" });
                    }}
                    className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm transition-all duration-200
          ${errors["workDetails.employmentStatus"]
                        ? "border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                      }
          focus:outline-none focus:ring-4`}
                  >
                    <option value="">Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  {errors["workDetails.employmentStatus"] && (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      {errors["workDetails.employmentStatus"]}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/*  SKILLS  */}
            <section className="lg:col-span-2 bg-slate-100 space-y-4 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Skills</h3>

              {form.skills.map((s, i) => (
                <div key={i} className="grid sm:grid-cols-2 gap-4">

                  <Field
                    label="Skill Category"
                    name={`skills.${i}.skillCategory`}
                    placeholder="e.g. Backend / Frontend"
                    value={s.skillCategory}
                    onChange={(v) => {
                      const skills = [...form.skills];
                      skills[i].skillCategory = v;
                      setForm({ ...form, skills });
                      setErrors({ ...errors, [`skills.${i}.skillCategory`]: "" });
                    }}
                    errors={errors}
                  />

                  <Field
                    label="Skill Name"
                    name={`skills.${i}.skillName`}
                    placeholder="e.g. Java, React"
                    value={s.skillName}
                    onChange={(v) => {
                      const skills = [...form.skills];
                      skills[i].skillName = v;
                      setForm({ ...form, skills });
                      setErrors({ ...errors, [`skills.${i}.skillName`]: "" });
                    }}
                    errors={errors}
                  />
                </div>
              ))}


              <button
                onClick={() =>
                  setForm({
                    ...form,
                    skills: [...form.skills, { skillCategory: "", skillName: "" }],
                  })
                }
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                + Add Skill
              </button>
            </section>

            {/*  QUALIFICATION  */}

            <section className="lg:col-span-2 space-y-4 bg-slate-100 rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold">Qualification</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <Field
                  label="Degree"
                  name="qualification.degree"
                  placeholder="e.g. B.E / B.Tech"
                  value={form.qualification.degree}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      qualification: {
                        ...form.qualification,
                        degree: v,
                      },
                    });
                    setErrors({ ...errors, "qualification.degree": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Institution"
                  name="qualification.institution"
                  placeholder="University / College"
                  value={form.qualification.institution}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      qualification: {
                        ...form.qualification,
                        institution: v,
                      },
                    });
                    setErrors({ ...errors, "qualification.institution": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Year of Completion"
                  name="qualification.yearOfCompletion"
                  type="number"
                  placeholder="2022"
                  value={form.qualification.yearOfCompletion}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      qualification: {
                        ...form.qualification,
                        yearOfCompletion: v,
                      },
                    });
                    setErrors({ ...errors, "qualification.yearOfCompletion": "" });
                  }}
                  errors={errors}
                />
              </div>
            </section>

            {/*  EXPERIENCE  */}
            <section className="lg:col-span-2 bg-slate-100 space-y-4 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Experience</h3>

              {form.experiences.map((e, i) => (
                <div key={i} className="grid sm:grid-cols-2 gap-4">

                  <Field
                    label="Job Title"
                    name={`experiences.${i}.jobTitle`}
                    placeholder="e.g. Software Engineer"
                    value={e.jobTitle}
                    onChange={(v) => {
                      const exps = [...form.experiences];
                      exps[i].jobTitle = v;
                      setForm({ ...form, experiences: exps });
                      setErrors({ ...errors, [`experiences.${i}.jobTitle`]: "" });
                    }}
                    errors={errors}
                  />

                  <Field
                    label="Company Name"
                    name={`experiences.${i}.companyName`}
                    placeholder="e.g. ABC Technologies"
                    value={e.companyName}
                    onChange={(v) => {
                      const exps = [...form.experiences];
                      exps[i].companyName = v;
                      setForm({ ...form, experiences: exps });
                      setErrors({ ...errors, [`experiences.${i}.companyName`]: "" });
                    }}
                    errors={errors}
                  />

                  <Field
                    label="Duration"
                    name={`experiences.${i}.duration`}
                    placeholder="e.g. 2 Years"
                    value={e.duration}
                    onChange={(v) => {
                      const exps = [...form.experiences];
                      exps[i].duration = v;
                      setForm({ ...form, experiences: exps });
                    }}
                    errors={errors}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Experience Document
                    </label>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(ev) => {
                        const file = ev.target.files[0];
                        if (!file) return;

                        const exps = [...form.experiences];
                        exps[i].documentUrl = file;
                        setForm({ ...form, experiences: exps });
                      }}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm
            file:mr-4 file:rounded-lg file:border-0
            file:bg-blue-600 file:px-4 file:py-2
            file:text-white hover:file:bg-blue-700"
                    />

                    {typeof e.documentUrl === "string" && e.documentUrl && (
                      <p className="mt-1 text-xs text-slate-600">Existing file :{" "}

                        <a
                          href={e.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {e.documentUrl.split("/").pop()}
                        </a>
                      </p>
                    )}
                    {e.documentUrl instanceof File && (
                      <p className="mt-1 text-xs text-slate-500">
                        Selected file: {e.documentUrl.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    experiences: [
                      ...form.experiences,
                      {
                        jobTitle: "",
                        companyName: "",
                        duration: "",
                        documentUrl: null,
                      },
                    ],
                  })
                }
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                + Add Experience
              </button>
            </section>

            {/*  DOCUMENTS */}
            <section className="lg:col-span-2 bg-slate-100 space-y-4 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Documents</h3>

              {form.documents.map((d, i) => (
                <div key={i} className="grid sm:grid-cols-2 gap-4">

                  <Field
                    label="Document Name"
                    name={`documents.${i}.documentName`}
                    placeholder="e.g. Aadhaar / PAN"
                    value={d.documentName}
                    onChange={(v) => {
                      const docs = [...form.documents];
                      docs[i].documentName = v;
                      setForm({ ...form, documents: docs });
                      setErrors({ ...errors, [`documents.${i}.documentName`]: "" });
                    }}
                    errors={errors}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Document File
                    </label>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const docs = [...form.documents];
                        docs[i].documentUrl = file;
                        setForm({ ...form, documents: docs });
                      }}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm
                          file:mr-4 file:rounded-lg file:border-0
                             file:bg-blue-600 file:px-4 file:py-2
                            file:text-white hover:file:bg-blue-700"
                     />

                     {typeof d.documentUrl === "string" && d.documentUrl && (
                      <p className="mt-1 text-xs text-slate-600">
                        Existing file:{" "}
                        <a
                          href={d.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 underline"
                        >
                          {d.documentUrl.split("/").pop()}
                        </a>
                      </p>
                    )}

                    {d.documentUrl instanceof File && (
                      <p className="mt-1 text-xs text-slate-500">
                        Selected file: {d.documentUrl.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    documents: [
                      ...form.documents,
                      { documentName: "", documentUrl: null },
                    ],
                  })
                }
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                + Add Document
              </button>
            </section>

            {/* SALARY  */}
            <section className="lg:col-span-2 bg-slate-100 space-y-4 rounded-xl border border-slate-200 p-5">
              <h3 className="text-sm font-semibold">Salary</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <Field
                  label="Basic Salary"
                  name="salary.basic"
                  type="number"
                  placeholder="70000"
                  value={form.salary.basic}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      salary: { ...form.salary, basic: v },
                    });
                    setErrors({ ...errors, "salary.basic": "" });
                  }}
                  errors={errors}
                />


                <Field
                  label="HRA"
                  name="salary.hra"
                  type="number"
                  placeholder="15000"
                  value={form.salary.hra}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      salary: { ...form.salary, hra: v },
                    });
                    setErrors({ ...errors, "salary.hra": "" });
                  }}
                  errors={errors}
                />


                <Field
                  label="Conveyance"
                  name="salary.conveyance"
                  type="number"
                  placeholder="5000"
                  value={form.salary.conveyance}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      salary: { ...form.salary, conveyance: v },
                    });
                    setErrors({ ...errors, "salary.conveyance": "" });
                  }}
                  errors={errors}
                />


                <Field
                  label="Special Allowance"
                  name="salary.specialAllowance"
                  type="number"
                  placeholder="10000"
                  value={form.salary.specialAllowance}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      salary: { ...form.salary, specialAllowance: v },
                    });
                    setErrors({ ...errors, "salary.specialAllowance": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Gross Salary"
                  name="salary.grossSalary"
                  type="number"
                  placeholder="60000"
                  value={form.salary.grossSalary}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      salary: { ...form.salary, grossSalary: v },
                    });
                    setErrors({ ...errors, "salary.grossSalary": "" });
                  }}
                  errors={errors}
                />

                <Field
                  label="Net Pay"
                  name="salary.netPay"
                  type="number"
                  placeholder="53500"
                  value={form.salary.netPay}
                  onChange={(v) => {
                    setForm({
                      ...form,
                      salary: { ...form.salary, netPay: v },
                    });
                    setErrors({ ...errors, "salary.netPay": "" });
                  }}
                  errors={errors}
                />
              </div>
            </section>

            {/*  ASSETS */}
            <section className="lg:col-span-2 space-y-4 bg-slate-100 rounded-xl border p-5">
              <h3 className="text-sm font-semibold">Assets</h3>

              {form.assets.map((a, i) => (
                <div key={i} className="grid sm:grid-cols-2 gap-4">

                  <Field
                    label="Asset Name"
                    name={`assets.${i}.assetName`}
                    placeholder="e.g. Laptop"
                    value={a.assetName}
                    onChange={(v) => {
                      const assets = [...form.assets];
                      assets[i].assetName = v;
                      setForm({ ...form, assets });
                      setErrors({ ...errors, [`assets.${i}.assetName`]: "" });
                    }}
                    errors={errors}
                  />

                  <Field
                    label="Serial Number"
                    name={`assets.${i}.serialNumber`}
                    placeholder="e.g. LAP-12345"
                    value={a.serialNumber}
                    onChange={(v) => {
                      const assets = [...form.assets];
                      assets[i].serialNumber = v;
                      setForm({ ...form, assets });
                      setErrors({ ...errors, [`assets.${i}.serialNumber`]: "" });
                    }}
                    errors={errors}
                  />

                  <Field
                    label="Assigned Date"
                    name={`assets.${i}.assignedDate`}
                    type="date"
                    value={a.assignedDate}
                    onChange={(v) => {
                      const assets = [...form.assets];
                      assets[i].assignedDate = v;
                      setForm({ ...form, assets });
                    }}
                    errors={errors}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Asset Document
                    </label>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        const assets = [...form.assets];
                        assets[i].documentUrl = file;
                        setForm({ ...form, assets });
                      }}
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm
            file:mr-4 file:rounded-lg file:border-0
            file:bg-blue-600 file:px-4 file:py-2
            file:text-white hover:file:bg-blue-700"
                    />

                    {typeof a.documentUrl === "string" && a.documentUrl && (
                      <p className="mt-1 text-xs text-slate-600">
                        Existing file:{" "}
                        <a
                          href={a.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 underline"
                        >
                          {a.documentUrl.split("/").pop()}
                        </a>
                      </p>
                    )}

                    {a.documentUrl instanceof File && (
                      <p className="mt-1 text-xs text-slate-500">
                        Selected file: {a.documentUrl.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setForm({
                    ...form,
                    assets: [
                      ...form.assets,
                      {
                        assetName: "",
                        serialNumber: "",
                        assignedDate: "",
                        documentUrl: null,
                      },
                    ],
                  })
                }
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                + Add Asset
              </button>
            </section>



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

function Field({
  label,
  name,
  icon,
  value,
  onChange,
  placeholder,
  type = "text",
  errors = {},
}) {
  const [isFocused, setIsFocused] = useState(false);
  const error = errors[name];

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors
              ${isFocused ? "text-blue-500" : "text-slate-400"}
            `}
          >
            {icon}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full rounded-xl border-2 py-3 pr-4 transition-all duration-200
            ${icon ? "pl-10" : "pl-4"}
            
            ${error
              ? "border-red-400 focus:ring-red-100"
              : isFocused
              ? "border-blue-500 ring-4 ring-blue-100"
              : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
            }

            focus:outline-none`}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
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