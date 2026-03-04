
import React, { useState, useRef } from "react";
import {
  FiSearch,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdClose,
  MdPictureAsPdf,
} from "react-icons/md";
import {
  HiOutlineDocumentText,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
} from "react-icons/hi";

/* ---------------- INITIAL DATA ---------------- */

const initialPolicies = [
  {
    id: "policy-1",
    type: "policy",
    title: "New Security Policy on Data Sharing",
    desc: "Security Rules",
    icon: <HiOutlineShieldCheck />,
    category: "Security",
    effectiveDate: "2023-10-24",
    status: "Active",
    approvedBy: "Security Board",
    pdf: null,
    sections: [
      {
        number: 1,
        title: "Purpose",
        type: "paragraph",
        content:
          "This policy establishes guidelines for secure and responsible data sharing.",
      },
      {
        number: 2,
        title: "Guidelines",
        type: "list",
        content: [
          "Classify all data",
          "Encrypt sensitive data",
          "Access on need-to-know basis",
        ],
      },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function EmployeePoliciesManager() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [form, setForm] = useState(emptyForm());

  const fileRef = useRef(null);

  function emptyForm() {
    return {
      id: "",
      type: "policy",
      title: "",
      desc: "",
      category: "",
      effectiveDate: "",
      status: "Draft",
      approvedBy: "",
      pdf: null,
      sections: [],
    };
  }

  /* ---------------- FILTER ---------------- */

  const filteredPolicies = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- CRUD ACTIONS ---------------- */

  const openAdd = () => {
    setMode("add");
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = () => {
    setMode("edit");
    setForm(JSON.parse(JSON.stringify(selectedPolicy)));
    setModalOpen(true);
  };

  const savePolicy = () => {
    if (!form.title || form.sections.length === 0) {
      alert("Title and at least one section required");
      return;
    }

    if (mode === "add") {
      const newPolicy = {
        ...form,
        id: crypto.randomUUID(),
        icon: <HiOutlineDocumentText />,
      };
      setPolicies([...policies, newPolicy]);
      setSelectedPolicy(newPolicy);
    } else {
      setPolicies(
        policies.map((p) => (p.id === form.id ? form : p))
      );
      setSelectedPolicy(form);
    }

    setModalOpen(false);
  };

  const deletePolicy = () => {
    if (!window.confirm("Delete this policy?")) return;
    const remaining = policies.filter(
      (p) => p.id !== selectedPolicy.id
    );
    setPolicies(remaining);
    setSelectedPolicy(null);
  };

  /* ---------------- SECTION HANDLERS ---------------- */

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        {
          number: form.sections.length + 1,
          title: "",
          type: "paragraph",
          content: "",
        },
      ],
    });
  };

  const updateSection = (i, key, value) => {
    const updated = [...form.sections];
    updated[i][key] = value;
    setForm({ ...form, sections: updated });
  };

  const addListItem = (i) => {
    const updated = [...form.sections];
    updated[i].content.push("");
    setForm({ ...form, sections: updated });
  };

  const updateListItem = (i, j, value) => {
    const updated = [...form.sections];
    updated[i].content[j] = value;
    setForm({ ...form, sections: updated });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* ================= LIST VIEW ================= */}
        {!selectedPolicy && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold">
                  Employee Policies & Insurance
                </h1>
                <p className="text-slate-500">
                  Manage company-wide documents
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={openAdd}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <MdAdd /> Add Policy / Insurance
                </button>
              </div>
            </div>

            <div className="relative mb-6">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border"
              />
            </div>

            <div className="grid gap-4">
              {filteredPolicies.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPolicy(item)}
                  className="cursor-pointer bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md flex justify-between"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  <FiArrowRight className="text-slate-400 text-xl" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= DETAIL VIEW ================= */}
        {selectedPolicy && (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedPolicy(null)}
              className="flex items-center gap-2 text-blue-600 mb-4"
            >
              <FiArrowLeft /> Back
            </button>

            <div className="bg-white rounded-2xl border shadow-lg p-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {selectedPolicy.title}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {selectedPolicy.category} • {selectedPolicy.status}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={openEdit} className="text-blue-600">
                    <MdEdit size={22} />
                  </button>
                  <button onClick={deletePolicy} className="text-red-600">
                    <MdDelete size={22} />
                  </button>
                </div>
              </div>

              {selectedPolicy.pdf && (
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
                  <MdPictureAsPdf /> {selectedPolicy.pdf}
                </div>
              )}

              {selectedPolicy.sections.map((s) => (
                <div key={s.number} className="mb-6">
                  <h3 className="font-semibold mb-2">
                    {s.number}. {s.title}
                  </h3>
                  {s.type === "paragraph" ? (
                    <p className="text-sm text-slate-700">
                      {s.content}
                    </p>
                  ) : (
                    <ul className="list-disc ml-6 space-y-1 text-sm">
                      {s.content.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {mode === "add" ? "Add Policy" : "Edit Policy"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <MdClose size={22} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                placeholder="Title"
                className="border p-2 rounded"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              <input
                placeholder="Category"
                className="border p-2 rounded"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />
            </div>

            {/* PDF Upload */}
            <div className="mb-4">
              <button
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 text-blue-600 text-sm"
              >
                <MdPictureAsPdf /> Upload PDF
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) =>
                  setForm({ ...form, pdf: e.target.files[0].name })
                }
              />
              {form.pdf && (
                <p className="text-xs text-slate-500 mt-1">
                  Attached: {form.pdf}
                </p>
              )}
            </div>

            {/* Sections */}
            {form.sections.map((s, i) => (
              <div key={i} className="border rounded-xl p-4 mb-4 bg-slate-50">
                <input
                  placeholder="Section Title"
                  className="w-full border p-2 rounded mb-2"
                  value={s.title}
                  onChange={(e) =>
                    updateSection(i, "title", e.target.value)
                  }
                />

                <select
                  className="border p-2 rounded mb-2"
                  value={s.type}
                  onChange={(e) =>
                    updateSection(
                      i,
                      "type",
                      e.target.value
                    )
                  }
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="list">Checklist</option>
                </select>

                {s.type === "paragraph" ? (
                  <textarea
                    rows={3}
                    className="w-full border p-2 rounded"
                    value={s.content}
                    onChange={(e) =>
                      updateSection(i, "content", e.target.value)
                    }
                  />
                ) : (
                  <>
                    {s.content.map((item, j) => (
                      <input
                        key={j}
                        className="w-full border p-2 rounded mb-2"
                        value={item}
                        onChange={(e) =>
                          updateListItem(i, j, e.target.value)
                        }
                      />
                    ))}
                    <button
                      onClick={() => addListItem(i)}
                      className="text-sm text-blue-600"
                    >
                      + Add Item
                    </button>
                  </>
                )}
              </div>
            ))}

            <button
              onClick={addSection}
              className="w-full border-dashed border p-2 rounded mb-4"
            >
              + Add Section
            </button>

            <div className="flex gap-3">
              <button
                onClick={savePolicy}
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
