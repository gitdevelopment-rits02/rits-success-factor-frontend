import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import hrOffBoardingThunk from "../Redux/thunks/HrOffBoardingThunk";
import "react-toastify/dist/ReactToastify.css";
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

const HrOffBoarding = () => {
const dispatch = useDispatch();

const offBoardingState = useSelector((state) => state.hr?.offBoarding) || {
  data: [],
  loading: false,
  error: null,
};

const { data, loadingEmployees, loadingUpdate, loadingComplete, error } = offBoardingState;
const selectedEmployeeData = offBoardingState?.selectedEmployeeData;

  const [completed, setCompleted] = useState(false);
  const [documents, setDocuments] = useState([{ id: Date.now() }]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  useEffect(() => {
  if (departmentFilter) {
    dispatch(
      hrOffBoardingThunk.getEmployeesByDepartment(departmentFilter)
    );
  }
}, [departmentFilter, dispatch]);

useEffect(() => {
  if (data) {
    const formattedEmployees = data.map((emp) => ({
      _id: emp._id,
      name: emp.employeeName,
      employeeId: emp.employeeNo,
      department: emp.workDetails?.department,
    }));

    setEmployees(formattedEmployees);
  }
}, [data]);

useEffect(() => {
  const delaySearch = setTimeout(() => {

    if (search.length > 2) {
      dispatch(hrOffBoardingThunk.searchEmployeesByName(search));
    }

  }, 500);

  return () => clearTimeout(delaySearch);

}, [search, dispatch]);

useEffect(() => {
  if (selectedEmployeeData) {
    setForm((prev) => ({
      ...prev,
      name: selectedEmployeeData.employeeName || "",
      employeeId: selectedEmployeeData.employeeNo || "",
      department: selectedEmployeeData.workDetails?.department || "",
      city: selectedEmployeeData.personalDetails?.city || "",
      phone: selectedEmployeeData.phoneNumber || "",
      email: selectedEmployeeData.officialEmail || "",

      checklist: {
        laptop: selectedEmployeeData.offboarding?.checklist?.laptopReturned || false,
        access: selectedEmployeeData.offboarding?.checklist?.systemAccessRevoked || false,
        idCard: selectedEmployeeData.offboarding?.checklist?.idCardReturned || false,
        finance: selectedEmployeeData.offboarding?.checklist?.financeCleared || false,
      },
    }));
  }
}, [selectedEmployeeData]);
const [form, setForm] = useState({
  name: "",
  employeeId: "",
  department: "",
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

  if (!selectedEmployee) {
    toast.error("Please select employee first");
    return;
  }

  const payload = {
  lastWorkingDate: form.lastWorkingDay,

  contactDetails: {
    personalEmail: form.email,
    alternateNumber: form.phone,
    address: form.address,
    city: form.city,
    pinCode: form.zip
  },

  checklist: {
    laptopReturned: form.checklist.laptop,
    systemAccessRevoked: form.checklist.access,
    idCardReturned: form.checklist.idCard,
    financeCleared: form.checklist.finance
  },

  pendingWork: {
    handoverStatus: form.handover,
    projectDocumentation: form.documentation,
    knowledgeTransfer: form.knowledgeTransfer
  },

  exitInterviewDocument: selectedFile ? selectedFile.name : "",

  additionalSections: documents.map(() => ({
    title: "Exit Interview",
    description: "Uploaded exit interview document"
  })),

  assets: [
    {
      assetType: "Laptop",
      status: "returned"
    }
  ]
};
  // Step 1: Update Offboarding
  dispatch(
    hrOffBoardingThunk.updateOffboarding({
   id: selectedEmployeeData._id,
      data: payload
    })
  )
    .unwrap()
    .then(() => {

      // Step 2: Complete Offboarding
     const employeeId = selectedEmployeeData?._id;

if (!employeeId) {
  toast.error("Employee ID missing");
  return;
}

dispatch(
  hrOffBoardingThunk.completeOffboarding(employeeId)
)
        .unwrap()
        .then(() => {
          toast.success("Offboarding Completed Successfully");
          setCompleted(true);
        })
        .catch(() => {
          toast.error("Failed to complete offboarding");
        });

    })
    .catch(() => {
      toast.error("Failed to update offboarding");
    });
};

const filteredEmployees = employees.filter((emp) => {
  const matchesSearch =
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(search.toLowerCase());

  const matchesDepartment = departmentFilter
    ? emp.department === departmentFilter
    : true;

  return matchesSearch && matchesDepartment;
});

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
        {/* SELECT EMPLOYEE SECTION */}
        <Section title="Select Employee" icon={<FiUser />}>
         {loadingEmployees && (
  <p className="text-sm text-gray-500 mb-2">Loading employees...</p>
)}
{error && (
   <p className="text-red-500 text-sm mb-2">
  {error?.message || error}
</p>
  )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Department Filter */}
          <select
  value={departmentFilter}
  onChange={(e) => setDepartmentFilter(e.target.value)}
  className="border rounded-md px-3 py-2 text-sm"
>
  <option value="">All Departments</option>
  <option value="Engineering">Engineering</option>
  <option value="Finance">Finance</option>
  <option value="IT">IT</option>
</select>
            {/* Dropdown */}
            <select
              value={selectedEmployee?._id || ""}
              
              onChange={(e) => {
const emp = filteredEmployees.find(
  (emp) => emp._id === e.target.value
);
  setSelectedEmployee(emp || null);

  if (emp) {
    dispatch(hrOffBoardingThunk.getEmployeeById(emp._id));
  }

              }}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select Employee</option>
          {filteredEmployees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>

            {/* Search */}
         {!selectedEmployee && (
  <input
    type="text"
    placeholder="Search by Name or ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded-md px-3 py-2 text-sm"
  />
)}
          </div>

          {!selectedEmployee && (
            <p className="text-red-500 text-sm mt-2">
              Please select employee to proceed
            </p>
          )}
        </Section>

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
            <UploadBox
              id={`exit-doc-${i}`}
              onFileChange={(file) => setSelectedFile(file)}
              selectedFile={selectedFile}
              onRemoveFile={() => setSelectedFile(null)}
            />
          </Section>
        ))}

        <button
          onClick={addNewSection}
          className="w-full border-2 border-dashed py-3 rounded-lg text-sm bg-white/80 text-gray-700 flex items-center justify-center gap-2 hover:bg-white"
        >
          <FiPlus /> Add New Section
        </button>

        <div className="flex justify-end gap-4">
         <button
  onClick={completeOffboarding}
disabled={loadingUpdate || loadingComplete}
  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm"
>
  {loadingUpdate || loadingComplete ? "Saving..." : "Complete Offboarding"}
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

const UploadBox = ({ id, onFileChange, selectedFile, onRemoveFile }) => (
  <div className="group border-2 border-dashed rounded-lg p-6 text-center text-sm text-gray-500">
    <label htmlFor={id} className="cursor-pointer block">
      <FiUpload
        className="mx-auto mb-2 text-gray-500 
             transition-all duration-200 
             group-hover:text-blue-700 
             active:text-blue-400 
             active:scale-110"
      />
      Upload a file or drag and drop
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            onFileChange(file);
            toast.success("Document uploaded successfully ");
          }
        }}
      />
    </label>

    <div className="text-xs mt-1">PDF, DOCX up to 10MB</div>

    {selectedFile && (
      <div className="mt-4 flex flex-col items-center justify-center space-y-2">
        <span className="text-blue-600 font-semibold text-center break-words">
          {selectedFile.name}
        </span>

        <button
          type="button"
          onClick={() => {
            onRemoveFile();
            toast.info("Document removed successfully ");
          }}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
    )}
  </div>
);
export default HrOffBoarding;