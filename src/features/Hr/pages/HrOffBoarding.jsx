import { useState } from "react";
import {
  FiUser,
  FiMapPin,
  FiCheckSquare,
  FiFileText,
  FiPlus,
  FiUpload,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import theme from "../../../assets/background.png";
 
const MyProfile = () => {
  const [completed, setCompleted] = useState(false);
  const [documents, setDocuments] = useState([{ id: Date.now() }]);
 
  const [form, setForm] = useState({
    name: "Ravi Kumar",
    employeeId: "E102",
    department: "Human Resources",
    lastWorkingDay: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",
    checklist: {
      laptop: false,
      access: false,
      idCard: false,
      finance: false,
    },
    handover: "",
    documentation: "",
    knowledgeTransfer: "",
  });
 
  const update = (key, value) =>
    setForm((p) => ({ ...p, [key]: value }));
 
  const toggleChecklist = (key) =>
    setForm((p) => ({
      ...p,
      checklist: { ...p.checklist, [key]: !p.checklist[key] },
    }));
 
  const addNewSection = () =>
    setDocuments((p) => [...p, { id: Date.now() }]);
 
  const cancelOffboarding = () => {
    if (window.confirm("Cancel offboarding process?")) {
      window.location.reload();
    }
  };
 
  const completeOffboarding = () => {
    console.log("Saved Data:", form, documents);
    setCompleted(true);
  };
 
  if (completed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${theme})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <FiCheckCircle className="text-green-600 text-5xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold">
            Offboarding Completed Successfully
          </h2>
        </div>
      </div>
    );
  }
 
  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundImage: `url(${theme})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
 
        {/* HEADER */}
        <div className="bg-white/90 p-4 rounded-lg">
          <h1 className="text-xl font-semibold">
            Standard Employee Offboarding Form
          </h1>
          <p className="text-sm text-gray-500">
            Please complete all required sections to finalize the employee exit process.
          </p>
        </div>
 
        {/* EMPLOYEE DETAILS */}
        <Section title="Employee Details" icon={<FiUser />}>
          <Grid>
            <Input label="Full Name" value={form.name} disabled />
            <Input label="Employee ID" value={form.employeeId} disabled />
            <Input label="Department" value={form.department} disabled />
            <Input
              label="Last Working Day"
              type="date"
              value={form.lastWorkingDay}
              onChange={(e) => update("lastWorkingDay", e.target.value)}
            />
          </Grid>
        </Section>
 
        {/* COMMUNICATION */}
        <Section title="Communication & Address" icon={<FiMapPin />}>
          <Input
            label="Permanent Address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
          <Grid>
            <Input label="City" value={form.city} onChange={(e) => update("city", e.target.value)} />
            <Input label="Zip Code" value={form.zip} onChange={(e) => update("zip", e.target.value)} />
            <Input label="Personal Contact Number" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            <Input label="Personal Email Address" value={form.email} onChange={(e) => update("email", e.target.value)} />
          </Grid>
        </Section>
 
        {/* CHECKLIST */}
        <Section title="Offboarding Checklist" icon={<FiCheckSquare />}>
          <Checkbox label="Laptop & Peripherals Returned" checked={form.checklist.laptop} onChange={() => toggleChecklist("laptop")} />
          <Checkbox label="System Access Revoked" checked={form.checklist.access} onChange={() => toggleChecklist("access")} />
          <Checkbox label="ID Card & Keys Handed In" checked={form.checklist.idCard} onChange={() => toggleChecklist("idCard")} />
          <Checkbox label="Clearance from Finance" checked={form.checklist.finance} onChange={() => toggleChecklist("finance")} />
        </Section>
 
        {/* PENDING WORK */}
        <Section title="Pending Work" icon={<FiFileText />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              label="Handover Status"
              value={form.handover}
              onChange={(e) => update("handover", e.target.value)}
            />
            <Textarea
              label="Project Documentation"
              value={form.documentation}
              onChange={(e) => update("documentation", e.target.value)}
            />
          </div>
          <Textarea
            label="Knowledge Transfer Sessions"
            value={form.knowledgeTransfer}
            onChange={(e) => update("knowledgeTransfer", e.target.value)}
          />
        </Section>
 
        {/* DOCUMENT UPLOAD */}
        {documents.map((doc, i) => (
          <Section key={doc.id} title="Exit Interview Document" icon={<FiUpload />}>
            <UploadBox id={`exit-doc-${i}`} />
          </Section>
        ))}
 
        <button
          onClick={addNewSection}
          className="w-full border-2 border-dashed py-3 rounded-lg text-sm bg-white/80 text-gray-700 flex items-center justify-center gap-2 hover:bg-white"
        >
          <FiPlus /> Add New Section
        </button>
 
        <div className="flex justify-end gap-4">
          <button onClick={cancelOffboarding} className="text-sm text-gray-700 flex items-center gap-1 bg-white/80 px-3 py-1 rounded">
            <FiX /> Cancel
          </button>
          <button onClick={completeOffboarding} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm">
            Complete Offboarding
          </button>
        </div>
 
      </div>
    </div>
  );
};
 
/* ---------------- COMPONENTS ---------------- */
 
const Section = ({ title, icon, children }) => (
  <div className="bg-white/90 rounded-xl p-6 shadow-sm space-y-4">
    <div className="flex items-center gap-2 text-sm font-semibold">
      {icon} {title}
    </div>
    {children}
  </div>
);
 
const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);
 
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input {...props} className="mt-1 w-full border rounded-md px-3 py-2 text-sm" />
  </div>
);
 
const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <textarea {...props} rows={3} className="mt-1 w-full border rounded-md px-3 py-2 text-sm" />
  </div>
);
 
const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);
 
const UploadBox = ({ id }) => (
  <div className="border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
    <label htmlFor={id} className="cursor-pointer block">
      <FiUpload className="mx-auto mb-2" />
      Upload a file or drag and drop
      <input id={id} type="file" className="hidden" />
    </label>
    <div className="text-xs mt-1">PDF, DOCX up to 10MB</div>
  </div>
);
 
export default MyProfile;