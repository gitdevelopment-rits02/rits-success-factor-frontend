import { useState } from "react";
import {
  FiUpload,
  FiCheckCircle,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiHome,
  FiKey,
  FiAward,
  FiFileText,
  FiDollarSign,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEye,
  FiEyeOff,
  FiBookOpen,
  FiInfo,
  FiMonitor,
} from "react-icons/fi";
import theme from "../../../assets/background.png"

const CURRENT_ROLE = "employee"; // employee | admin | hr

export default function EmployeeProfilePage() {
  const canEdit = CURRENT_ROLE === "admin" || CURRENT_ROLE === "hr";

  const [avatar, setAvatar] = useState(
    localStorage.getItem("employee_avatar")
  );

  const [documents, setDocuments] = useState({
    certificate: localStorage.getItem("employee_certificate"),
    idProof: localStorage.getItem("employee_idProof"),
  });

  const [viewDoc, setViewDoc] = useState({
  certificate: !!localStorage.getItem("employee_certificate"),
  idProof: !!localStorage.getItem("employee_idProof"),
});

const [fullscreenDoc, setFullscreenDoc] = useState(null);


  const profile = {
    name: "Daniel Smith",
    role: "HR Lead",
    empId: "EMP001",
    status: "Active",
    email: "daniel.smith@ritshr.com",
    phone: "8123456789",
    location: "Remote / Unspecified",
    department: "Software Engineer",
    manager: "Chaitanya",
    joinDate: "2025-10-10",
    workLocation: "Corporate HQ",
    annualCTC: "₹18.00 LPA",
  };

  const handleImageUpload = (e) => {
    if (!canEdit) return;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
      localStorage.setItem("employee_avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDocUpload = (type, e) => {
    if (!canEdit) return;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDocuments((prev) => ({
        ...prev,
        [type]: reader.result,
      }));
      localStorage.setItem(`employee_${type}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const toggleView = (type) => {
    setViewDoc((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${theme})` }}
    >
      <div className="min-h-screen p-6">

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white rounded-3xl shadow-sm p-6 flex gap-8 items-center">
          <div className="relative w-fit">
            <img
              src={avatar || "https://via.placeholder.com/140"}
              alt="Profile"
              className="w-36 h-36 rounded-2xl object-cover"
            />
            {canEdit && (
              <label className="absolute -top-2 -right-2 bg-emerald-500 p-2 rounded-lg cursor-pointer text-white shadow-md">
                <FiUpload size={14} />
                <input hidden type="file" onChange={handleImageUpload} />
              </label>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-extrabold">{profile.name}</h1>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-indigo-600 font-semibold flex items-center gap-1">
                <FiBriefcase /> {profile.role}
              </span>
              <span className="px-3 py-1 text-xs bg-slate-100 rounded-full">
                {profile.empId}
              </span>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                {profile.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <FiMail /> {profile.email}
              </span>
              <span className="flex items-center gap-2">
                <FiPhone /> {profile.phone}
              </span>
              <span className="flex items-center gap-2">
                <FiMapPin /> {profile.location}
              </span>
            </div>
          </div>
        </div>

        {/* ================= CONTENT GRID ================= */}
        <div className="grid grid-cols-12 gap-6 mt-6">

          {/* LEFT SECTION */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Card title="Professional Matrix" icon={<FiUser />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Matrix label="Department" value={profile.department} icon={<FiBriefcase />} />
                <Matrix label="Reporting Manager" value={profile.manager} icon={<FiUser />} />
                <Matrix label="Date of Joining" value={profile.joinDate} icon={<FiCalendar />} />
                <Matrix label="Work Location" value={profile.workLocation} icon={<FiHome />} />
              </div>
            </Card>

            <Card
              title="Compensation Structure"
              icon={<FiDollarSign />}
              right={`Annual CTC: ${profile.annualCTC}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm">
                <div>
                  <p className="font-semibold mb-3">Earnings (Monthly)</p>
                  <Row label="Basic Pay" value="₹75,000" />
                  <Row label="HRA" value="₹37,500" />
                  <Row label="Special Allowance" value="₹25,000" />
                  <Row label="Medical" value="₹4,000" />
                  <Row label="Conveyance" value="₹4,000" />
                </div>
                <div>
                  <p className="font-semibold mb-3">Deductions</p>
                  <Row label="Provident Fund" value="-₹9,000" red />
                  <Row label="Professional Tax" value="-₹200" red />
                  <Row label="TDS (Tax)" value="-₹15,000" red />
                </div>
              </div>
            </Card>

            {/* ================= QUALIFICATIONS (ADDED HERE) ================= */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <FiBookOpen className="text-indigo-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Qualifications
                </h3>
              </div>

              <div className="relative pl-6">
                <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gray-200" />

                {[
                  {
                    degree: "MBA in Human Resources",
                    institute: "London School of Economics",
                    duration: "2026 - 2028",
                    subjects: "Org. Psychology, Ethics",
                    cgpa: "3.9 / 4.0",
                    active: true,
                  },
                  {
                    degree: "Bachelor of Business Admin",
                    institute: "University of Manchester",
                    duration: "2021 - 2025",
                    subjects: "Accounting, Management",
                    cgpa: "3.75 / 4.0",
                    active: true,
                  },
                ].map((item, index) => (
                  <div key={index} className="relative mb-8 flex gap-4">
                    <div
                      className={`w-4 h-4 rounded-full border-2 bg-white mt-1 ${
                        item.active ? "border-indigo-600" : "border-gray-300"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-base">
                          {item.degree}
                        </h4>

                        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-sm text-indigo-600 mt-1">
                        {item.institute}
                      </p>
                      <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                        <div className="grid grid-cols-3 gap-6 items-center">
    
                          {/* Major Subjects */}
                          <div className="col-span-2">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase mb-1">
                              Major Subjects
                            </p>
                            <p className="text-sm text-slate-700">
                              {item.subjects}
                            </p>
                          </div>

                          {/* Academic Score */}
                          <div className="text-right">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase mb-1">
                              Academic Score
                            </p>
                            <p className="text-sm">
                              <span className="text-indigo-600 font-bold text-lg">
                                {item.cgpa.split(" / ")[0]}
                              </span>
                              <span className="text-slate-400 ml-1">
                                / 4.0 CGPA
                              </span>
                            </p>
                          </div>
                        </div>
                     </div>  
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
             <div className="bg-white rounded-2xl shadow-sm p-6">
  <div className="flex items-center gap-2 mb-6">
    <FiBookOpen className="text-indigo-600" />
    <h3 className="text-sm font-semibold uppercase tracking-wide">
      Experience
    </h3>
  </div>

  <div className="relative pl-6">
    {/* Vertical line */}
    <div className="absolute left-[9px] top-0 bottom-0 w-px bg-gray-200" />

    {[
      {
        company: "ABC Technologies Pvt. Ltd.",
        designation: "Software Engineer",
        duration: "2026 - 2028",
        description:
          "Worked on Hospital Management System. Built modules for patient records, appointments, and billing using React and REST APIs.",
        active: true,
      },
      {
        company: "XYZ Solutions",
        designation: "Junior Developer",
        duration: "2025 - 2026",
        description:
          "Assisted in developing internal dashboards, fixed bugs, and collaborated with senior developers on feature enhancements.",
        active: false,
      },
    ].map((item, index) => (
      <div key={index} className="relative mb-8 flex gap-4">
        {/* Timeline dot */}
        <div
          className={`w-4 h-4 rounded-full border-2 bg-white mt-1 ${
            item.active ? "border-indigo-600" : "border-gray-300"
          }`}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-base">
              {item.designation}
            </h4>

            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              {item.duration}
            </span>
          </div>

          <p className="text-sm text-indigo-600 mt-1">
            {item.company}
          </p>

          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase mb-1">
              Description
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

            </div></div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card title="Identity Info" icon={<FiKey />}>
              <Info label="Full Legal Name" value={profile.name} />
              <Info label="Blood Group" value="O+ve" />
              <Info label="Personal Email" value={profile.email} />
              <Info
                label="Permanent Address"
                value="Regional Office Unit no-2201A, 22nd floor, WTC Bangalore, Brigade Gateway, Bangalore-560055"
              />
            </Card>

            <Card title="Skills & Qualifications" icon={<FiAward />}>
              <div className="flex flex-wrap gap-2">
                {["Recruitment", "Employee Relations", "Policy Design", "SHRM-CP"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </Card>


            <Card title="Compliance Docs" icon={<FiFileText />}>
              {[
                { key: "certificate", label: "Certificate" },
                { key: "idProof", label: "ID Proof" },
              ].map((doc) => (
                <div key={doc.key} className="mb-5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-500" />
                      {doc.label}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleView(doc.key)}
                        className="text-indigo-600 flex items-center gap-1"
                      >
                        {viewDoc[doc.key] ? <FiEyeOff /> : <FiEye />}
                        {viewDoc[doc.key] ? "Hide" : "View"}
                      </button>

                      <button
  onClick={() =>
    setFullscreenDoc({
      src: documents[doc.key],
      label: doc.label,
    })
  }
  disabled={!documents[doc.key]}
  className="text-slate-600 hover:text-indigo-600"
  title="Maximize"
>
  ⛶
</button>
                      {canEdit && (
                        <label className="cursor-pointer text-emerald-600">
                          <FiUpload />
                          <input
                            hidden
                            type="file"
                            onChange={(e) => handleDocUpload(doc.key, e)}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {viewDoc[doc.key] && documents[doc.key] && (
                    <div className="mt-3 border rounded-xl p-2 bg-slate-50">
                      <img
                        src={documents[doc.key]}
                        alt={doc.label}
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* VERIFICATION */}
              <div className="mt-4 p-3 border rounded-xl bg-slate-100 text-sm text-indigo-700 flex gap-2">
                <FiInfo className="mt-0.5" />
                <div>
                  <span className="font-semibold uppercase text-xs">
                    Verification Status
                  </span>
                  <p className="mt-1 text-xs text-slate-600">
                    All documents have been verified by the HR compliance team on Oct 24, 2025.
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Assigned Assets" icon={<FiMonitor />}>
              <div className="space-y-4 text-sm">
                {[
                { name: "Laptop", id: "ASSET-LAP-1023", status: "Assigned" },
                { name: "Mouse", id: "ASSET-MOU-2045", status: "Assigned" },
                { name: "Keyboard", id: "ASSET-KEY-3321", status: "Assigned" },
                { name: "CPU", id: "ASSET-CPU-7789", status: "Assigned" },
                { name: "Headset", id: "ASSET-HDS-1190", status: "Assigned" },
                 ].map((asset, index) => (
              <div
                key={index}
                  className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3"
              >
              <div>
                <p className="font-semibold">{asset.name}</p>
                <p className="text-xs text-slate-400">{asset.id}</p>
              </div>

                   <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600">
                     {asset.status}
                   </span>
               </div>
                ))}
              </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );

/*  REUSABLE COMPONENTS  */

function Card({ title, icon, right, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide">
          <span className="text-indigo-600">{icon}</span>
          {title}
        </h3>
        {right && (
          <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
            {right}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Matrix({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 uppercase">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="mb-4 text-sm">
      <p className="text-xs uppercase text-slate-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Row({ label, value, red }) {
  return (
    <div className="flex justify-between py-1">
      <span>{label}</span>
      <span className={red ? "text-red-500" : "font-medium"}>
        {value}
      </span>
      {fullscreenDoc && (
  <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-6">
    {/* Close Button */}
    <button
      onClick={() => setFullscreenDoc(null)}
      className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-lg"
    >
      <FiEyeOff size={20} />
    </button>

    {/* Fullscreen Image */}
    <img
      src={fullscreenDoc.src}
      alt={fullscreenDoc.label}
      className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl bg-white p-4"
    />
  </div>
)}

    </div>
  );
}
}















