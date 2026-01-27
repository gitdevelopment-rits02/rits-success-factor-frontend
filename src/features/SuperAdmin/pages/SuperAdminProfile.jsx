import { useState, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaEdit,
  FaEnvelope,
  FaPhoneAlt,
  FaDoorOpen,
  FaCalendarAlt,
  FaTimes,
  FaCamera,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function SuperAdminProfile() {
  /*  PROFILE STATE  */
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    designation: "Chief Executive Officer",
    city: "Bengaluru, Karnataka",
    office: "RITS",
    photo: "./images/man.png",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState(profile);
  const fileRef = useRef(null);

  /* SUMMARY STATE  */
  const [summaryData, setSummaryData] = useState({
    text: "Visionary leader with 20+ years of experience scaling global operations and driving innovation. Led multiple funding rounds and expanded organizational capacity.",
    competencies: ["Strategic Vision", "Operational Excellence", "Crisis Management"],
  });
  const [isSummaryEditOpen, setIsSummaryEditOpen] = useState(false);
  const [summaryForm, setSummaryForm] = useState(summaryData);

  /*  CONTACT INFO STATE  */
  const [contact, setContact] = useState({
    email: "alex.johnson@successfactor.com",
    phone: "+1 (555) 012-3456",
    officeLocation: "Executive Suite A-101",
    tenure: "8 Years, 4 Months",
  });

  const [isContactEditOpen, setIsContactEditOpen] = useState(false);
  const [contactForm, setContactForm] = useState(contact);

  /*  DIRECT REPORTEES STATE  */
  const [reportees, setReportees] = useState([
    { id: 1, name: "Sarah Chen", role: "Chief Operating Officer" },
    { id: 2, name: "Marcus Miller", role: "Chief Technology Officer" },
    { id: 3, name: "Elena Rodriguez", role: "VP of Human Resources" },
    { id: 4, name: "David Kim", role: "Chief Financial Officer" },
  ]);

  const [isReporteeOpen, setIsReporteeOpen] = useState(false);
  const [editingReportee, setEditingReportee] = useState(null);
  const [reporteeForm, setReporteeForm] = useState({ name: "", role: "" });

  /* ===== HANDLERS ===== */
  const openEdit = () => {
    setFormData(profile);
    setIsEditOpen(true);
  };

  const saveProfile = () => {
    setProfile(formData);
    setIsEditOpen(false);
  };

  const openSummaryEdit = () => {
    setSummaryForm(summaryData);
    setIsSummaryEditOpen(true);
  };

  const saveSummary = () => {
    setSummaryData(summaryForm);
    setIsSummaryEditOpen(false);
  };

  const openContactEdit = () => {
    setContactForm(contact);
    setIsContactEditOpen(true);
  };

  const saveContact = () => {
    setContact(contactForm);
    setIsContactEditOpen(false);
  };

  const openAddReportee = () => {
    setEditingReportee(null);
    setReporteeForm({ name: "", role: "" });
    setIsReporteeOpen(true);
  };

  const openEditReportee = (r) => {
    setEditingReportee(r);
    setReporteeForm({ name: r.name, role: r.role });
    setIsReporteeOpen(true);
  };

  const saveReportee = () => {
    if (editingReportee) {
      setReportees((prev) =>
        prev.map((r) =>
          r.id === editingReportee.id ? { ...r, ...reporteeForm } : r
        )
      );
    } else {
      setReportees((prev) => [...prev, { id: Date.now(), ...reporteeForm }]);
    }
    setIsReporteeOpen(false);
  };

  const deleteReportee = (id) => {
    setReportees((prev) => prev.filter((r) => r.id !== id));
  };

  const handlePhotoChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData({ ...formData, photo: reader.result });
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-wave.png')" }}>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

        {/*  PROFILE HEADER  */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-black/5 border border-white/40 p-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profile.photo}
                  alt="profile"
                  className="w-28 h-28 rounded-3xl object-cover ring-4 ring-white shadow-lg"
                />
                <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {profile.name}
                  </h1>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold">
                    Super Admin
                  </span>
                </div>
                <p className="text-gray-600 font-medium mt-1">
                  {profile.designation}
                </p>
                <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt /> {profile.city}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaBuilding /> {profile.office}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={openEdit}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/*  SUMMARY + OVERSIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="relative lg:col-span-2 bg-white/85 backdrop-blur rounded-2xl shadow-lg p-8 flex flex-col">
            <button
              onClick={openSummaryEdit}
              className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              <FaEdit className="text-gray-600 text-sm" />
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {summaryData.text}
            </p>

            <div className="mt-auto pt-6">
              <h4 className="text-xs font-semibold text-gray-500 mb-2">
                CORE COMPETENCIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {summaryData.competencies.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-8">
            <h2 className="text-lg font-semibold mb-4">
              Executive Oversight
            </h2>
            <div className="flex flex-col gap-4">
              <StatCard title="Total Employees" value="1,248" footer="+12% vs last Q" color="blue" />
              <StatCard title="Retention" value="94.2%" footer="Top Tier" color="green" />
              <StatCard title="Company Growth" value="24.8%" footer="YoY Revenue Growth" color="purple" />
            </div>
          </div>
        </div>

        {/*  CONTACT INFO  */}
        <div className="relative bg-white/85 backdrop-blur rounded-2xl shadow-lg p-8">
          <button
            onClick={openContactEdit}
            className="absolute top-5 right-5 p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            <FaEdit className="text-gray-600 text-sm" />
          </button>
            <h2 className="text-lg font-semibold mb-4">
              Contact Information
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 hover:bg-gray-50">
            
            <InfoItem icon={<FaEnvelope />} label="Business Email" value={contact.email} />
            <InfoItem icon={<FaPhoneAlt />} label="Direct Line" value={contact.phone} />
            <InfoItem icon={<FaDoorOpen />} label="Office Location" value={contact.officeLocation} />
            <InfoItem icon={<FaCalendarAlt />} label="Tenure" value={contact.tenure} />
          </div>
        </div>

        {/*  DIRECT REPORTEES  */}
        <div className="bg-white/85 backdrop-blur rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold">Direct Reportees</h2>
            <button
              onClick={openAddReportee}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm shadow-md" >
              <FaPlus /> Add Reportee
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportees.map((person) => (
              <div
                key={person.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.role}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => openEditReportee(person)} className="text-gray-400 hover:text-blue-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteReportee(person.id)} className="text-gray-400 hover:text-red-500">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS  */}
      {isEditOpen && (
        <Modal title="Edit Profile" onClose={() => setIsEditOpen(false)}>
          <div className="flex flex-col items-center gap-3 mb-6">
            <img src={formData.photo} className="w-20 h-20 rounded-2xl object-cover shadow" alt="" />
            <button onClick={() => fileRef.current.click()} className="flex items-center gap-2 text-sm text-blue-600">
              <FaCamera /> Change Photo
            </button>
            <input ref={fileRef} type="file" hidden accept="image/*" onChange={(e) => handlePhotoChange(e.target.files[0])} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
            <Input label="Designation" value={formData.designation} onChange={(v) => setFormData({ ...formData, designation: v })} />
            <Input label="City" value={formData.city} onChange={(v) => setFormData({ ...formData, city: v })} />
            <Input label="Office" value={formData.office} onChange={(v) => setFormData({ ...formData, office: v })} />
          </div>
          <ModalActions onCancel={() => setIsEditOpen(false)} onSave={saveProfile} />
        </Modal>
      )}

      {isSummaryEditOpen && (
        <Modal title="Edit Professional Summary" onClose={() => setIsSummaryEditOpen(false)}>
          <textarea
            className="w-full border rounded-xl p-3 text-sm min-h-[120px]"
            value={summaryForm.text}
            onChange={(e) => setSummaryForm({ ...summaryForm, text: e.target.value })} />
          <Input
            label="Core Competencies (comma separated)"
            value={summaryForm.competencies.join(", ")}
            onChange={(v) =>
              setSummaryForm({ ...summaryForm, competencies: v.split(",").map(s => s.trim()) })
            } />
          <ModalActions onCancel={() => setIsSummaryEditOpen(false)} onSave={saveSummary} />
        </Modal>
      )}

      {isContactEditOpen && (
        <Modal title="Edit Contact Info" onClose={() => setIsContactEditOpen(false)}>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Business Email" value={contactForm.email} onChange={(v) => setContactForm({ ...contactForm, email: v })} />
            <Input label="Direct Line" value={contactForm.phone} onChange={(v) => setContactForm({ ...contactForm, phone: v })} />
            <Input label="Office Location" value={contactForm.officeLocation} onChange={(v) => setContactForm({ ...contactForm, officeLocation: v })} />
            <Input label="Tenure" value={contactForm.tenure} onChange={(v) => setContactForm({ ...contactForm, tenure: v })} />
          </div>
          <ModalActions onCancel={() => setIsContactEditOpen(false)} onSave={saveContact} />
        </Modal>
      )}

      {isReporteeOpen && (
        <Modal title={editingReportee ? "Edit Reportee" : "Add Reportee"} onClose={() => setIsReporteeOpen(false)}>
          <Input label="Name" value={reporteeForm.name} onChange={(v) => setReporteeForm({ ...reporteeForm, name: v })} />
          <Input label="Role" value={reporteeForm.role} onChange={(v) => setReporteeForm({ ...reporteeForm, role: v })} />
          <ModalActions onCancel={() => setIsReporteeOpen(false)} onSave={saveReportee} />
        </Modal>
      )}
    </div>
  );
}

/*  REUSABLE COMPONENTS  */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}><FaTimes /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onSave }) {
  return (
    <div className="flex justify-end gap-3 mt-6">
      <button onClick={onCancel} className="px-4 py-2 bg-gray-100 rounded-xl text-sm">
        Cancel
      </button>
      <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">
        Save
      </button>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-gray-500 uppercase font-bold">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, footer, color }) {
  const colors = {
    blue: "from-blue-400 to-indigo-400",
    green: "from-green-400 to-emerald-400",
    purple: "from-purple-400 to-pink-400",
  };
  return (
    <div className={`rounded-xl p-5 text-white bg-gradient-to-r ${colors[color]} shadow-md`}>
      <p className="text-xs opacity-80">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-[11px] opacity-80">{footer}</p>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="w-full">
      <label className="text-xs font-semibold text-gray-500 uppercase">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 border rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"/>
    </div>
  );
}

