import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import managerViewMyProfileThunk from "../Redux/thunks/ManagerViewMyProfileThunk";
import ManagerViewProfileSkeleton from "./ManagerViewMyProfileSkeleton";

import {
  FiUpload,
  FiBriefcase,
  FiUser,
  FiCalendar,
  FiHome,
  FiKey,
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiMonitor,
} from "react-icons/fi";

import theme from "../../../assets/background.png";

const CURRENT_ROLE = "employee"; // employee | admin | hr

export default function EmployeeProfilePage() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state) => state.manager.viewMyProfile,
  );

  console.log("REDUX DATA:", data);

  const profile = data?.data;
  const header = profile?.header;
  const professional = profile?.professionalMatrix;
  const identity = profile?.identityInfo;
  const qualifications = profile?.qualifications || [];
  const experience = profile?.experience || [];
  const complianceDocs = profile?.complianceDocs || [];
  const assets = profile?.assets || [];

  useEffect(() => {
    dispatch(managerViewMyProfileThunk.viewMyProfile());
  }, [dispatch]);

  const canEdit = CURRENT_ROLE === "admin" || CURRENT_ROLE === "hr";

  const [avatar, setAvatar] = useState(localStorage.getItem("employee_avatar"));

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

  if (loading) return <ManagerViewProfileSkeleton />;
  if (error) return <div>Error: {error}</div>;

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
              src={avatar || profile?.profileImage || "/default-avatar.png"}
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

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h1 className="text-3xl font-extrabold">{header?.fullName}</h1>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-indigo-600 font-semibold flex items-center gap-1">
                <FiBriefcase /> {header?.role}
              </span>
              <span className="px-3 py-1 text-xs bg-slate-100 rounded-full">
                {header?.employeeNo}
              </span>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                {header?.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <FiMail /> {header?.officialEmail}
              </span>
              <span className="flex items-center gap-2">
                <FiPhone /> {header?.phoneNumber}
              </span>
              <span className="flex items-center gap-2">
                <FiMapPin /> {header?.workType}
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
                <Matrix
                  label="Department"
                  value={professional?.department || "-"}
                  icon={<FiBriefcase />}
                />

                <Matrix
                  label="Reporting Manager"
                  value={professional?.reportingManager || "-"}
                  icon={<FiUser />}
                />

                <Matrix
                  label="Date of Joining"
                  value={
                    professional?.dateOfJoining
                      ? professional.dateOfJoining.split("T")[0]
                      : "-"
                  }
                  icon={<FiCalendar />}
                />

                <Matrix
                  label="Work Location"
                  value={professional?.workLocation || "-"}
                  icon={<FiHome />}
                />
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

                {qualifications.map((item, index) => (
                  <div key={index} className="relative mb-8 flex gap-4">
                    <div className="w-4 h-4 rounded-full border-2 bg-white mt-1 border-indigo-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-base">{item.degree}</h4>
                      <p className="text-sm text-indigo-600 mt-1">
                        {item.institution}
                      </p>
                      <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
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

                  {experience.map((item, index) => (
                    <div key={index} className="relative mb-8 flex gap-4">
                      <div className="w-4 h-4 rounded-full border-2 bg-white mt-1 border-indigo-600" />

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-base">
                            {item.title}
                          </h4>
                          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                            {item.duration}
                          </span>
                        </div>

                        <p className="text-sm text-indigo-600 mt-1">
                          {item.company}
                        </p>

                        {item.description && (
                          <div className="mt-4 bg-slate-50 border rounded-xl px-5 py-4">
                            <p className="text-sm text-slate-700">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <Card title="Identity Info" icon={<FiKey />}>
              <Info label="Full Legal Name" value={identity?.fullLegalName} />
              <Info label="Blood Group" value={identity?.bloodGroup} />
              <Info label="Personal Email" value={identity?.personalEmail} />
              <Info label="Permanent Address" value={identity?.address} />
            </Card>

            <Card title="Compliance Docs" icon={<FiFileText />}>
              {complianceDocs.map((doc, index) => (
                <div
                  key={index}
                  className="mb-4 text-sm border rounded-xl p-3 bg-slate-50"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{doc.name}</span>

                    <span className="text-green-600 text-xs">
                      {doc.verified ? "Verified" : "Not Verified"}
                    </span>
                  </div>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 text-xs mt-2 inline-block"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </Card>

            <Card title="Assigned Assets" icon={<FiMonitor />}>
              <div className="space-y-4 text-sm">
                {assets.map((asset, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 border rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="font-semibold">{asset.name}</p>
                      <p className="text-xs text-slate-400">{asset.code}</p>
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
        <span className={red ? "text-red-500" : "font-medium"}>{value}</span>
      </div>
    );
  }
}
