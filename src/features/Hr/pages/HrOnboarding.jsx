import { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiZap,
  FiBook,
  FiAward,
  FiBox,
  FiTrash2,
  FiPlus,
  FiUpload,
  FiShield,
} from "react-icons/fi";
import theme from "../../../assets/background.png";
 
/*  Constants  */
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const WORK_TYPES = ["On-site", "Remote", "Hybrid"];
const STATUS = ["Active", "Inactive"];
 
/*  Defaults  */
const DEFAULT_FORM = {
  profileImage: "",
  fullName: "",
  employeeId: "",
  email: "",
  phone: "",
  bloodGroup: "",
  department: "",
  manager: "",
  doj: "",
  location: "",
  workType: "",
  status: "",
  skills: [],
  qualification: "",
  experiences: [{ title: "", company: "", duration: "" }],
  assets: [{ name: "", serial: "", date: "" }],
  insurance: {
    provider: "",
    policyNumber: "",
    coverage: "",
    expiryDate: "",
  },
  policies: [
  {
    title: "",
    category: "",
    file: null,
    sections: [
      {
        sectionTitle: "",
        type: "paragraph",
        content: "",
      },
    ],
  },
],
};
 
export default function EmployeeProfileForm() {
  const [form, setForm] = useState(DEFAULT_FORM);
 
  useEffect(() => {
    const saved = localStorage.getItem("employee-profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setForm({
        ...DEFAULT_FORM,
        ...parsed,
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        experiences: Array.isArray(parsed.experiences)
          ? parsed.experiences
          : DEFAULT_FORM.experiences,
        assets: Array.isArray(parsed.assets)
          ? parsed.assets
          : DEFAULT_FORM.assets,
      });
    }
  }, []);
 
  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));
 
  const updateNested = (section, index, key, value) => {
    setForm((prev) => {
      const updated = [...prev[section]];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, [section]: updated };
    });
  };
 
  const updateInsurance = (key, value) =>
    setForm((prev) => ({
      ...prev,
      insurance: { ...prev.insurance, [key]: value },
    }));
 
  const addRow = (section, row) =>
    setForm((prev) => ({ ...prev, [section]: [...prev[section], row] }));
 
  const deleteRow = (section, index) =>
    setForm((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => update("profileImage", reader.result);
    reader.readAsDataURL(file);
  };
 
  const saveProfile = () => {
    localStorage.setItem("employee-profile", JSON.stringify(form));
    alert("Profile saved successfully");
  };
 
  const updatePolicy = (pIndex, key, value) => {
  const updated = [...form.policies];
  updated[pIndex][key] = value;
  setForm({ ...form, policies: updated });
};
  return (
    <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${theme})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="p-6 bg-black/5">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold mb-1">
            Standard Onboarding Profile Creation
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Fill in the details below to create a comprehensive employee record.
          </p>
 
          {/* PROFILE IMAGE */}
          <Section title="Profile Image" icon={<FiUpload />}>
            <div className="flex items-center gap-4">
              {form.profileImage && (
                <img
                  src={form.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          </Section>
 
          {/* PERSONAL INFO */}
          <Section title="Personal Information" icon={<FiUser />}>
            <Grid>
              <Field label="Full Name" >
                <Input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                />
              </Field>
 
              <Field label="Employee ID">
                <Input
                  value={form.employeeId}
                  onChange={(e) => update("employeeId", e.target.value)}
                />
              </Field>
 
              <Field label="Email" icon={<FiMail />}>
                <Input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </Field>
 
              <Field label="Phone Number">
                <Input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </Field>
 
              <Field label="Blood Group">
                <Select
                  value={form.bloodGroup}
                  onChange={(e) => update("bloodGroup", e.target.value)}
                >
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </Select>
              </Field>
            </Grid>
          </Section>
 
          {/* WORK */}
          <Section title="Work Details" icon={<FiBriefcase />}>
            <Grid>
              <Field label="Department">
                <Input
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                />
              </Field>
 
              <Field label="Manager">
                <Input
                  value={form.manager}
                  onChange={(e) => update("manager", e.target.value)}
                />
              </Field>
 
              <Field label="Date of Joining">
                <Input
                  type="date"
                  value={form.doj}
                  onChange={(e) => update("doj", e.target.value)}
                />
              </Field>
 
              <Field label="Work Location">
                <Input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </Field>
 
              <Field label="Work Type">
                <Select
                  value={form.workType}
                  onChange={(e) => update("workType", e.target.value)}
                >
                  {WORK_TYPES.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </Select>
              </Field>
 
              <Field label="Status">
                <Select
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  {STATUS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
            </Grid>
          </Section>
 
          {/* SKILLS */}
          <Section title="Skills & Qualifications" icon={<FiZap />}>
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">
                Skills (type and press Enter)
              </label>
 
              <input
                className="input"
                placeholder="Eg: React, Node, UI Design"
                onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                const value = e.target.value.trim();
              if (value && !form.skills.includes(value)) {
                update("skills", [...form.skills, value]);
              }
                e.target.value = "";
                }
                }}
              />
            </div>
 
  {form.skills.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-4">
      {form.skills.map((skill, i) => (
        <span
          key={i}
          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
        >
          {skill}
          <button
            onClick={() =>
              update(
                "skills",
                form.skills.filter((_, index) => index !== i)
              )
            }
            className="text-blue-700 hover:text-red-500"
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  )}
 
  <Field label="Qualification" icon={<FiBook />}>
    <textarea
      className="input"
      rows={2}
      placeholder="Highest qualification"
      value={form.qualification}
      onChange={(e) => update("qualification", e.target.value)}
    />
  </Field>
</Section>
          {/* INSURANCE */}
          <Section title="Insurance Details" icon={<FiShield />}>
            <Grid>
              <Field label="Provider">
                <Input
                  value={form.insurance.provider}
                  onChange={(e) =>
                    updateInsurance("provider", e.target.value)
                  }
                />
              </Field>
 
              <Field label="Policy Number">
                <Input
                  value={form.insurance.policyNumber}
                  onChange={(e) =>
                    updateInsurance("policyNumber", e.target.value)
                  }
                />
              </Field>
 
              <Field label="Coverage">
                <Input
                  value={form.insurance.coverage}
                  onChange={(e) =>
                    updateInsurance("coverage", e.target.value)
                  }
                />
              </Field>
 
              <Field label="Expiry Date">
                <Input
                  type="date"
                  value={form.insurance.expiryDate}
                  onChange={(e) =>
                    updateInsurance("expiryDate", e.target.value)
                  }
                />
              </Field>
            </Grid>
          </Section>
 
          {/* POLICIES */}
<Section title="Policies" icon={<FiShield />}>
 
  {form.policies.map((policy, pIndex) => (
    <div
      key={pIndex}
      className="border rounded-xl p-4 mb-6 bg-gray-50"
    >
      {/* Title & Category */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <Input
          placeholder="Title"
          value={policy.title}
          onChange={(e) =>
            updatePolicy(pIndex, "title", e.target.value)
          }
        />
 
        <Input
          placeholder="Category"
          value={policy.category}
          onChange={(e) =>
            updatePolicy(pIndex, "category", e.target.value)
          }
        />
      </div>
 
      {/* Upload PDF */}
      <label className="flex items-center gap-2 text-blue-600 text-sm mb-4 cursor-pointer">
        <FiUpload />
        Upload PDF
        <input
          type="file"
          accept="application/pdf"
          hidden
          onChange={(e) =>
            updatePolicy(pIndex, "file", e.target.files[0])
          }
        />
      </label>
      {/* Remove Policy */}
    </div>
  ))}
</Section>
 
          {/* EXPERIENCE */}
          <Section title="Experience" icon={<FiAward />}>
            {form.experiences.map((exp, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 mb-4 items-end">
      
                <div className="col-span-3">
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) =>
                      updateNested("experiences", i, "title", e.target.value)
                    }
                  />
                </div>
 
                <div className="col-span-4">
                  <label className="text-sm font-medium mb-1 block">Company</label>
                  <Input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) =>
                      updateNested("experiences", i, "company", e.target.value)
                    }
                  />
                </div>
 
                <div className="col-span-4">
                  <label className="text-sm font-medium mb-1 block">Duration</label>
                  <Input
                    placeholder="Eg: Jan 2021 - Dec 2023"
                    value={exp.duration}
                    onChange={(e) =>
                      updateNested("experiences", i, "duration", e.target.value)
                    }
                  />
                </div>
 
                <button
                  onClick={() => deleteRow("experiences", i)}
                  className="text-red-500 mt-6"
                >
                  <FiTrash2 />
                  </button>
                </div>
              ))}
 
              <button
                onClick={() =>
                  addRow("experiences", { title: "", company: "", duration: "" })
                }
                className="text-blue-600 flex items-center gap-1"
              >
                <FiPlus /> Add Experience
              </button>
            </Section>
 
            {/* ASSETS */}
<Section title="Assigned Assets" icon={<FiBox />}>
  {form.assets.map((a, i) => (
    <div key={i} className="grid grid-cols-12 gap-3 mb-4 items-end">
      
      <div className="col-span-4">
        <label className="text-sm font-medium mb-1 block">
          Asset Name
        </label>
        <Input
          placeholder="Enter asset name"
          value={a.name}
          onChange={(e) =>
            updateNested("assets", i, "name", e.target.value)
          }
        />
      </div>
 
      <div className="col-span-4">
        <label className="text-sm font-medium mb-1 block">
          Serial Number
        </label>
        <Input
          placeholder="Enter serial number"
          value={a.serial}
          onChange={(e) =>
            updateNested("assets", i, "serial", e.target.value)
          }
        />
      </div>
 
      <div className="col-span-3">
        <label className="text-sm font-medium mb-1 block">
          Assigned Date
        </label>
        <Input
          type="date"
          value={a.date}
          onChange={(e) =>
            updateNested("assets", i, "date", e.target.value)
          }
        />
      </div>
 
      <button
        type="button"
        onClick={() => deleteRow("assets", i)}
        className="text-red-500 mt-6"
      >
        <FiTrash2 />
      </button>
    </div>
  ))}
 
      <button
        type="button"
        onClick={() =>
        addRow("assets", { name: "", serial: "", date: "" })
      }
        className="text-blue-600 flex items-center gap-1"
      >
        <FiPlus /> Add Asset
      </button>
    </Section>
 
    {/* Personalized */}
<Section title="Pesonalized" icon={<FiBook />}>
  <SectionEditor />
</Section>
 
 
          <div className="flex justify-end gap-3 mt-8">
            <button className="border px-6 py-2 rounded-lg">Cancel</button>
            <button
              onClick={saveProfile}
              className="bg-blue-600 text-white px-6 py-1 rounded-lg"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
 
      <style>{`
        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
 
/*  Reusable  */
const Section = ({ title, icon, children }) => (
  <section className="mb-8">
    <div className="flex items-center gap-2 mb-4 text-indigo-600">
      {icon}
      <h3 className="font-semibold text-black">{title}</h3>
    </div>
    {children}
  </section>
);
 
const Grid = ({ children }) => (
  <div className="grid grid-cols-3 gap-4">{children}</div>
);
 
const Field = ({ label, icon, children }) => (
  <div>
    <label className="flex items-center gap-1 text-sm font-medium mb-1">
      {icon && icon} {label}
    </label>
    {children}
  </div>
);
 
const Input = (props) => <input className="input" {...props} />;
const Select = (props) => <select className="input" {...props} />;
const SectionEditor = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-[#f3f6f7] border border-gray-200 rounded-xl p-6 space-y-4">
 
      {/* Section Title */}
      <input
        type="text"
        placeholder="Section Title"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
      />
 
      {/* Dropdown */}
      <div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400">
          <option>Paragraph</option>
          <option>Heading</option>
          <option>List</option>
        </select>
      </div>
 
      {/* Textarea */}
      <textarea
        className="w-full min-h-[140px] px-4 py-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};
 