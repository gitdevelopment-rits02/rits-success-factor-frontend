
// import React, { useState } from 'react';
// import { MdAdd, MdEdit, MdDelete, MdClose } from 'react-icons/md';

// /* ------------------ INITIAL DATA ------------------ */

// const initialPolicies = [
//   {
//     id: 'security-policy',
//     title: 'New Security Policy on Data Sharing',
//     type: 'Security',
//     status: 'Active',
//     effectiveFrom: '2024-01-01',
//     sections: [
//       {
//         number: '1',
//         title: 'Purpose',
//         content:
//           'This policy aims to establish guidelines for secure and responsible data sharing within the organization.',
//       },
//       {
//         number: '2',
//         title: 'Scope',
//         content:
//           'This policy covers all employees, contractors, interns, and third parties handling organizational data.',
//       },
//       {
//         number: '3',
//         title: 'Definitions',
//         content:
//           'Data: Any information in digital form.\nSensitive Data: Confidential, Secret, or Top Secret information.',
//       },
//       {
//         number: '4',
//         title: 'Policy Guidelines',
//         content:
//           '• All data must be classified.\n• Confidential data must be encrypted.\n• Access is granted on a need-to-know basis.',
//       },
//     ],
//   },
// ];

// /* ------------------ COMPONENT ------------------ */

// const SuperAdminPolicies = () => {
//   const [policies, setPolicies] = useState(initialPolicies);
//   const [selectedPolicy, setSelectedPolicy] = useState(initialPolicies[0]);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [mode, setMode] = useState('add');
//   const [form, setForm] = useState(emptyForm());

//   function emptyForm() {
//     return {
//       id: '',
//       title: '',
//       type: '',
//       status: 'Draft',
//       effectiveFrom: '',
//       sections: [],
//     };
//   }

//   /* ------------------ ACTIONS ------------------ */

//   const openAdd = () => {
//     setMode('add');
//     setForm(emptyForm());
//     setModalOpen(true);
//   };

//   const openEdit = () => {
//     setMode('edit');
//     setForm(JSON.parse(JSON.stringify(selectedPolicy)));
//     setModalOpen(true);
//   };

//   const savePolicy = () => {
//     if (!form.title || !form.type || form.sections.length === 0) {
//       alert('Title, type, and at least one section are required');
//       return;
//     }

//     if (mode === 'add') {
//       const newPolicy = {
//         ...form,
//         id: crypto.randomUUID(),
//       };
//       setPolicies((p) => [...p, newPolicy]);
//       setSelectedPolicy(newPolicy);
//     } else {
//       setPolicies((p) =>
//         p.map((pol) => (pol.id === form.id ? form : pol))
//       );
//       setSelectedPolicy(form);
//     }

//     setModalOpen(false);
//   };

//   const deletePolicy = () => {
//     if (!window.confirm('Delete this policy permanently?')) return;

//     const remaining = policies.filter((p) => p.id !== selectedPolicy.id);
//     setPolicies(remaining);
//     setSelectedPolicy(remaining[0] || null);
//   };

//   const addSection = () => {
//     setForm({
//       ...form,
//       sections: [
//         ...form.sections,
//         {
//           number: String(form.sections.length + 1),
//           title: '',
//           content: '',
//         },
//       ],
//     });
//   };

//   const updateSection = (i, key, value) => {
//     const updated = [...form.sections];
//     updated[i][key] = value;
//     setForm({ ...form, sections: updated });
//   };

//   /* ------------------ UI ------------------ */

//   return (
//     <div className="flex h-screen bg-slate-50">

//       {/* LEFT */}
//       <div className="w-96 bg-white border-r">
//         <div className="p-4 border-b flex justify-between">
//           <b>Policies</b>
//           <button
//             onClick={openAdd}
//             className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
//           >
//             <MdAdd /> New
//           </button>
//         </div>

//         <div className="p-4 space-y-2">
//           {policies.map((p) => (
//             <div
//               key={p.id}
//               onClick={() => setSelectedPolicy(p)}
//               className={`p-3 border rounded cursor-pointer ${
//                 selectedPolicy?.id === p.id
//                   ? 'bg-blue-50 border-blue-400'
//                   : ''
//               }`}
//             >
//               <b>{p.title}</b>
//               <div className="text-xs text-slate-500">
//                 {p.type} • {p.status}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RIGHT */}
//       {selectedPolicy && (
//         <div className="flex-1 p-10 bg-white overflow-y-auto">
//           <div className="max-w-4xl mx-auto">

//             <div className="flex justify-between mb-6">
//               <h1 className="text-2xl font-bold text-center w-full">
//                 {selectedPolicy.title}
//               </h1>
//               <div className="flex gap-2">
//                 <button onClick={openEdit} className="text-blue-600">
//                   <MdEdit />
//                 </button>
//                 <button onClick={deletePolicy} className="text-red-600">
//                   <MdDelete />
//                 </button>
//               </div>
//             </div>

//             {selectedPolicy.sections.map((s, i) => (
//               <div key={i} className="mb-6">
//                 <h2 className="font-bold">
//                   {s.number}. {s.title}
//                 </h2>
//                 <p className="text-sm text-slate-700 whitespace-pre-line mt-2">
//                   {s.content}
//                 </p>
//               </div>
//             ))}

//           </div>
//         </div>
//       )}

//       {/* MODAL */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-4">

//             <div className="flex justify-between">
//               <b>{mode === 'add' ? 'Add Policy' : 'Edit Policy'}</b>
//               <button onClick={() => setModalOpen(false)}>
//                 <MdClose />
//               </button>
//             </div>

//             <input
//               placeholder="Title"
//               value={form.title}
//               onChange={(e) =>
//                 setForm({ ...form, title: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//             />

//             <input
//               placeholder="Type"
//               value={form.type}
//               onChange={(e) =>
//                 setForm({ ...form, type: e.target.value })
//               }
//               className="w-full border p-2 rounded"
//             />

//             {form.sections.map((s, i) => (
//               <div key={i} className="border p-3 rounded space-y-2">
//                 <input
//                   placeholder="Section Title"
//                   value={s.title}
//                   onChange={(e) =>
//                     updateSection(i, 'title', e.target.value)
//                   }
//                   className="w-full border p-2 rounded"
//                 />
//                 <textarea
//                   placeholder="Section Content"
//                   value={s.content}
//                   onChange={(e) =>
//                     updateSection(i, 'content', e.target.value)
//                   }
//                   className="w-full border p-2 rounded h-28"
//                 />
//               </div>
//             ))}

//             <button
//               onClick={addSection}
//               className="border px-3 py-1 rounded text-sm"
//             >
//               + Add Section
//             </button>

//             <div className="flex gap-3 pt-2">
//               <button
//                 onClick={savePolicy}
//                 className="flex-1 bg-blue-600 text-white py-2 rounded"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setModalOpen(false)}
//                 className="flex-1 border py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuperAdminPolicies;



// import React, { useState } from "react";
// import { MdAdd, MdEdit, MdDelete, MdClose } from "react-icons/md";
 
// /* ---------------- INITIAL DATA ---------------- */
 
// const initialPolicies = [
//     {
//         id: "policy-1",
//         title: "New Security Policy on Data Sharing",
//         category: "Security",
//         effectiveDate: "2023-10-24",
//         status: "Active",
//         approvedBy: "Security Board & Legal Dept.",
//         sections: [
//             {
//                 number: 1,
//                 title: "Purpose",
//                 type: "paragraph",
//                 content:
//                     "This policy establishes guidelines for secure and responsible data sharing within the organization.",
//             },
//             {
//                 number: 2,
//                 title: "Scope",
//                 type: "paragraph",
//                 content:
//                     "This policy applies to all employees, contractors, and third parties handling organizational data.",
//             },
//             {
//                 number: 3,
//                 title: "Policy Guidelines",
//                 type: "list",
//                 content: [
//                     "All data must be classified according to internal standards.",
//                     "Sensitive data must be encrypted at rest and in transit.",
//                     "Access must be granted on a need-to-know basis.",
//                 ],
//             },
//         ],
//     },
// ];
 
// /* ---------------- COMPONENT ---------------- */
 
// const PolicyDocuments = () => {
//     const [policies, setPolicies] = useState(initialPolicies);
//     const [activePolicy, setActivePolicy] = useState(initialPolicies[0]);
 
//     const [modalOpen, setModalOpen] = useState(false);
//     const [mode, setMode] = useState("add"); // add | edit
//     const [form, setForm] = useState(emptyForm());
 
//     function emptyForm() {
//         return {
//             id: "",
//             title: "",
//             category: "",
//             effectiveDate: "",
//             status: "Draft",
//             approvedBy: "",
//             sections: [],
//         };
//     }
 
//     /* ---------------- ACTIONS ---------------- */
 
//     const openAdd = () => {
//         setMode("add");
//         setForm(emptyForm());
//         setModalOpen(true);
//     };
 
//     const openEdit = () => {
//         setMode("edit");
//         setForm(JSON.parse(JSON.stringify(activePolicy)));
//         setModalOpen(true);
//     };
 
//     const savePolicy = () => {
//         if (!form.title || form.sections.length === 0) {
//             alert("Title and at least one section are required");
//             return;
//         }
 
//         if (mode === "add") {
//             const newPolicy = { ...form, id: crypto.randomUUID() };
//             setPolicies([...policies, newPolicy]);
//             setActivePolicy(newPolicy);
//         } else {
//             setPolicies(
//                 policies.map((p) => (p.id === form.id ? form : p))
//             );
//             setActivePolicy(form);
//         }
 
//         setModalOpen(false);
//     };
 
//     const deletePolicy = () => {
//         if (!window.confirm("Delete this policy permanently?")) return;
//         const remaining = policies.filter((p) => p.id !== activePolicy.id);
//         setPolicies(remaining);
//         setActivePolicy(remaining[0] || null);
//     };
 
//     /* ---------------- SECTION HANDLERS ---------------- */
 
//     const addSection = () => {
//         setForm({
//             ...form,
//             sections: [
//                 ...form.sections,
//                 {
//                     number: form.sections.length + 1,
//                     title: "",
//                     type: "paragraph",
//                     content: "",
//                 },
//             ],
//         });
//     };
 
//     const updateSection = (i, key, value) => {
//         const updated = [...form.sections];
//         updated[i][key] = value;
//         setForm({ ...form, sections: updated });
//     };
 
//     const updateListItem = (sectionIndex, itemIndex, value) => {
//         const updated = [...form.sections];
//         updated[sectionIndex].content[itemIndex] = value;
//         setForm({ ...form, sections: updated });
//     };
 
//     const addListItem = (sectionIndex) => {
//         const updated = [...form.sections];
//         updated[sectionIndex].content.push("");
//         setForm({ ...form, sections: updated });
//     };
 
//     /* ---------------- UI ---------------- */
 
//     return (
//         <div className="flex h-screen bg-slate-100">
 
//             {/* LEFT SIDEBAR */}
//             <div className="w-72 bg-white border-r p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <b>Policies</b>
//                     <button
//                         onClick={openAdd}
//                         className="text-blue-600 flex items-center gap-1 text-sm"
//                     >
//                         <MdAdd /> New
//                     </button>
//                 </div>
 
//                 {policies.map((p) => (
//                     <div
//                         key={p.id}
//                         onClick={() => setActivePolicy(p)}
//                         className={`p-3 rounded cursor-pointer mb-2 ${activePolicy?.id === p.id
//                             ? "bg-blue-50 border border-blue-300"
//                             : "hover:bg-slate-50"
//                             }`}
//                     >
//                         <div className="font-semibold text-sm">{p.title}</div>
//                         <div className="text-xs text-slate-500">{p.category}</div>
//                     </div>
//                 ))}
//             </div>
 
//             {/* DOCUMENT VIEW */}
//             {activePolicy && (
//                 <div className="flex-1 p-10 overflow-y-auto">
//                     <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow">
 
//                         <div className="flex justify-between mb-6">
//                             <div>
//                                 <h1 className="text-xl font-bold">{activePolicy.title}</h1>
//                                 <div className="text-xs text-slate-500">
//                                     {activePolicy.effectiveDate} • {activePolicy.category}
//                                 </div>
//                             </div>
 
//                             <div className="flex gap-2">
//                                 <button onClick={openEdit} className="text-blue-600">
//                                     <MdEdit />
//                                 </button>
//                                 <button onClick={deletePolicy} className="text-red-600">
//                                     <MdDelete />
//                                 </button>
//                             </div>
//                         </div>
 
//                         {activePolicy.sections.map((s) => (
//                             <div key={s.number} className="mb-6">
//                                 <div className="flex items-center gap-3 mb-2">
//                                     <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
//                                         {s.number}
//                                     </div>
//                                     <h2 className="font-semibold">{s.title}</h2>
//                                 </div>
 
//                                 {s.type === "paragraph" && (
//                                     <p className="ml-10 text-sm text-slate-700 whitespace-pre-line">
//                                         {s.content}
//                                     </p>
//                                 )}
 
//                                 {s.type === "list" && (
//                                     <ul className="ml-10 space-y-2">
//                                         {s.content.map((item, i) => (
//                                             <li key={i} className="flex gap-2 text-sm">
//                                                 ✔ {item}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
 
//             {/* ADD / EDIT MODAL */}
//             {modalOpen && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//                     <div className="bg-white w-full max-w-2xl p-8 rounded-2xl overflow-y-auto max-h-[90vh]">
 
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 {/* <h2 className="text-lg font-bold">
//                                     {mode === "add" ? "Add Policy" : "Edit Policy"}
//                                 </h2>
//                                 <p className="text-xs text-slate-500">
//                                     Build a structured policy document
//                                 </p> */}
//                                 <h2 className="text-xl font-semibold">Add Policy</h2>
//                                 <p className="text-sm text-slate-500 mt-1">
//                                     Build a structured policy document
//                                 </p>
//                             </div>
//                             <button onClick={() => setModalOpen(false)}>
//                                 <MdClose size={20} />
//                             </button>
//                         </div>
 
 
//                         {/* <input
//                             placeholder="Policy Title"
//                             className="w-full border p-2 rounded mb-2"
//                             value={form.title}
//                             onChange={(e) =>
//                                 setForm({ ...form, title: e.target.value })
//                             }
//                         />
 
//                         <input
//                             placeholder="Category"
//                             className="w-full border p-2 rounded mb-4"
//                             value={form.category}
//                             onChange={(e) =>
//                                 setForm({ ...form, category: e.target.value })
//                             }
//                         /> */}
//                         <div className="grid grid-cols-2 gap-4 mb-6">
//                             <input
//                                 placeholder="Policy Title"
//                                 className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={form.title}
//                                 onChange={(e) =>
//                                     setForm({ ...form, title: e.target.value })
//                                 }
//                             />
//                             <input
//                                 placeholder="Category (e.g. Security, HR)"
//                                 className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 value={form.category}
//                                 onChange={(e) =>
//                                     setForm({ ...form, category: e.target.value })
//                                 }
//                             />
//                         </div>
 
 
//                         {form.sections.map((s, i) => (
//                             <div
//                                 key={i}
//                                 className="border rounded-xl p-5 mb-5 bg-slate-50 shadow-sm"
//                             >
//                                 {/* Section Header */}
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
//                                         {i + 1}
//                                     </div>
 
//                                     <input
//                                         placeholder="Section Title"
//                                         className="flex-1 border rounded-md px-3 py-2 text-sm"
//                                         value={s.title}
//                                         onChange={(e) =>
//                                             updateSection(i, "title", e.target.value)
//                                         }
//                                     />
//                                 </div>
 
//                                 {/* Section Type */}
//                                 <select
//                                     className="w-48 border rounded-md px-3 py-2 text-sm mb-3"
//                                     value={s.type}
//                                     onChange={(e) => {
//                                         const newType = e.target.value;
 
//                                         updateSection(i, "type", newType);
 
 
//                                         updateSection(
//                                             i,
//                                             "content",
//                                             newType === "list" ? [""] : ""
//                                         );
//                                     }}
//                                 >
 
//                                     <option value="paragraph">Paragraph</option>
//                                     <option value="list">Checklist</option>
//                                 </select>
 
//                                 {/* Content */}
//                                 {s.type === "paragraph" ? (
//                                     <textarea
//                                         rows={4}
//                                         placeholder="Write section content..."
//                                         className="w-full border rounded-md px-3 py-2 text-sm"
//                                         value={s.content}
//                                         onChange={(e) =>
//                                             updateSection(i, "content", e.target.value)
//                                         }
//                                     />
//                                 ) : (
//                                     <div className="space-y-2">
//                                         {s.content.map((item, idx) => (
//                                             <input
//                                                 key={idx}
//                                                 placeholder={`Item ${idx + 1}`}
//                                                 className="w-full border rounded-md px-3 py-2 text-sm"
//                                                 value={item}
//                                                 onChange={(e) =>
//                                                     updateListItem(i, idx, e.target.value)
//                                                 }
//                                             />
//                                         ))}
//                                         <button
//                                             onClick={() => addListItem(i)}
//                                             className="text-sm text-blue-600"
//                                         >
//                                             + Add checklist item
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
 
 
//                         <button
//                             onClick={addSection}
//                             className="border border-dashed rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full"
//                         >
//                             + Add New Section
//                         </button>
 
//                         <div className="flex gap-3 mt-4">
//                             <button
//                                 onClick={savePolicy}
//                                 className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2.5 rounded-lg font-medium shadow-sm"
//                             >
//                                 Save Policy
//                             </button>
 
//                             <button
//                                 onClick={() => setModalOpen(false)}
//                                 className="flex-1 border py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
 
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
 
// export default PolicyDocuments;
 
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
                  <MdAdd /> Add Policy 
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
