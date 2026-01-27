
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



import React, { useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdClose } from "react-icons/md";
 
/* ---------------- INITIAL DATA ---------------- */
 
const initialPolicies = [
    {
        id: "policy-1",
        title: "New Security Policy on Data Sharing",
        category: "Security",
        effectiveDate: "2023-10-24",
        status: "Active",
        approvedBy: "Security Board & Legal Dept.",
        sections: [
            {
                number: 1,
                title: "Purpose",
                type: "paragraph",
                content:
                    "This policy establishes guidelines for secure and responsible data sharing within the organization.",
            },
            {
                number: 2,
                title: "Scope",
                type: "paragraph",
                content:
                    "This policy applies to all employees, contractors, and third parties handling organizational data.",
            },
            {
                number: 3,
                title: "Policy Guidelines",
                type: "list",
                content: [
                    "All data must be classified according to internal standards.",
                    "Sensitive data must be encrypted at rest and in transit.",
                    "Access must be granted on a need-to-know basis.",
                ],
            },
        ],
    },
];
 
/* ---------------- COMPONENT ---------------- */
 
const PolicyDocuments = () => {
    const [policies, setPolicies] = useState(initialPolicies);
    const [activePolicy, setActivePolicy] = useState(initialPolicies[0]);
 
    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState("add"); // add | edit
    const [form, setForm] = useState(emptyForm());
 
    function emptyForm() {
        return {
            id: "",
            title: "",
            category: "",
            effectiveDate: "",
            status: "Draft",
            approvedBy: "",
            sections: [],
        };
    }
 
    /* ---------------- ACTIONS ---------------- */
 
    const openAdd = () => {
        setMode("add");
        setForm(emptyForm());
        setModalOpen(true);
    };
 
    const openEdit = () => {
        setMode("edit");
        setForm(JSON.parse(JSON.stringify(activePolicy)));
        setModalOpen(true);
    };
 
    const savePolicy = () => {
        if (!form.title || form.sections.length === 0) {
            alert("Title and at least one section are required");
            return;
        }
 
        if (mode === "add") {
            const newPolicy = { ...form, id: crypto.randomUUID() };
            setPolicies([...policies, newPolicy]);
            setActivePolicy(newPolicy);
        } else {
            setPolicies(
                policies.map((p) => (p.id === form.id ? form : p))
            );
            setActivePolicy(form);
        }
 
        setModalOpen(false);
    };
 
    const deletePolicy = () => {
        if (!window.confirm("Delete this policy permanently?")) return;
        const remaining = policies.filter((p) => p.id !== activePolicy.id);
        setPolicies(remaining);
        setActivePolicy(remaining[0] || null);
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
 
    const updateListItem = (sectionIndex, itemIndex, value) => {
        const updated = [...form.sections];
        updated[sectionIndex].content[itemIndex] = value;
        setForm({ ...form, sections: updated });
    };
 
    const addListItem = (sectionIndex) => {
        const updated = [...form.sections];
        updated[sectionIndex].content.push("");
        setForm({ ...form, sections: updated });
    };
 
    /* ---------------- UI ---------------- */
 
    return (
        <div className="flex h-screen bg-slate-100">
 
            {/* LEFT SIDEBAR */}
            <div className="w-72 bg-white border-r p-4">
                <div className="flex justify-between items-center mb-4">
                    <b>Policies</b>
                    <button
                        onClick={openAdd}
                        className="text-blue-600 flex items-center gap-1 text-sm"
                    >
                        <MdAdd /> New
                    </button>
                </div>
 
                {policies.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => setActivePolicy(p)}
                        className={`p-3 rounded cursor-pointer mb-2 ${activePolicy?.id === p.id
                            ? "bg-blue-50 border border-blue-300"
                            : "hover:bg-slate-50"
                            }`}
                    >
                        <div className="font-semibold text-sm">{p.title}</div>
                        <div className="text-xs text-slate-500">{p.category}</div>
                    </div>
                ))}
            </div>
 
            {/* DOCUMENT VIEW */}
            {activePolicy && (
                <div className="flex-1 p-10 overflow-y-auto">
                    <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow">
 
                        <div className="flex justify-between mb-6">
                            <div>
                                <h1 className="text-xl font-bold">{activePolicy.title}</h1>
                                <div className="text-xs text-slate-500">
                                    {activePolicy.effectiveDate} • {activePolicy.category}
                                </div>
                            </div>
 
                            <div className="flex gap-2">
                                <button onClick={openEdit} className="text-blue-600">
                                    <MdEdit />
                                </button>
                                <button onClick={deletePolicy} className="text-red-600">
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
 
                        {activePolicy.sections.map((s) => (
                            <div key={s.number} className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        {s.number}
                                    </div>
                                    <h2 className="font-semibold">{s.title}</h2>
                                </div>
 
                                {s.type === "paragraph" && (
                                    <p className="ml-10 text-sm text-slate-700 whitespace-pre-line">
                                        {s.content}
                                    </p>
                                )}
 
                                {s.type === "list" && (
                                    <ul className="ml-10 space-y-2">
                                        {s.content.map((item, i) => (
                                            <li key={i} className="flex gap-2 text-sm">
                                                ✔ {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
 
            {/* ADD / EDIT MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white w-full max-w-2xl p-8 rounded-2xl overflow-y-auto max-h-[90vh]">
 
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                {/* <h2 className="text-lg font-bold">
                                    {mode === "add" ? "Add Policy" : "Edit Policy"}
                                </h2>
                                <p className="text-xs text-slate-500">
                                    Build a structured policy document
                                </p> */}
                                <h2 className="text-xl font-semibold">Add Policy</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    Build a structured policy document
                                </p>
                            </div>
                            <button onClick={() => setModalOpen(false)}>
                                <MdClose size={20} />
                            </button>
                        </div>
 
 
                        {/* <input
                            placeholder="Policy Title"
                            className="w-full border p-2 rounded mb-2"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />
 
                        <input
                            placeholder="Category"
                            className="w-full border p-2 rounded mb-4"
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        /> */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <input
                                placeholder="Policy Title"
                                className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                            />
                            <input
                                placeholder="Category (e.g. Security, HR)"
                                className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.category}
                                onChange={(e) =>
                                    setForm({ ...form, category: e.target.value })
                                }
                            />
                        </div>
 
 
                        {form.sections.map((s, i) => (
                            <div
                                key={i}
                                className="border rounded-xl p-5 mb-5 bg-slate-50 shadow-sm"
                            >
                                {/* Section Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </div>
 
                                    <input
                                        placeholder="Section Title"
                                        className="flex-1 border rounded-md px-3 py-2 text-sm"
                                        value={s.title}
                                        onChange={(e) =>
                                            updateSection(i, "title", e.target.value)
                                        }
                                    />
                                </div>
 
                                {/* Section Type */}
                                <select
                                    className="w-48 border rounded-md px-3 py-2 text-sm mb-3"
                                    value={s.type}
                                    onChange={(e) => {
                                        const newType = e.target.value;
 
                                        updateSection(i, "type", newType);
 
 
                                        updateSection(
                                            i,
                                            "content",
                                            newType === "list" ? [""] : ""
                                        );
                                    }}
                                >
 
                                    <option value="paragraph">Paragraph</option>
                                    <option value="list">Checklist</option>
                                </select>
 
                                {/* Content */}
                                {s.type === "paragraph" ? (
                                    <textarea
                                        rows={4}
                                        placeholder="Write section content..."
                                        className="w-full border rounded-md px-3 py-2 text-sm"
                                        value={s.content}
                                        onChange={(e) =>
                                            updateSection(i, "content", e.target.value)
                                        }
                                    />
                                ) : (
                                    <div className="space-y-2">
                                        {s.content.map((item, idx) => (
                                            <input
                                                key={idx}
                                                placeholder={`Item ${idx + 1}`}
                                                className="w-full border rounded-md px-3 py-2 text-sm"
                                                value={item}
                                                onChange={(e) =>
                                                    updateListItem(i, idx, e.target.value)
                                                }
                                            />
                                        ))}
                                        <button
                                            onClick={() => addListItem(i)}
                                            className="text-sm text-blue-600"
                                        >
                                            + Add checklist item
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
 
 
                        <button
                            onClick={addSection}
                            className="border border-dashed rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full"
                        >
                            + Add New Section
                        </button>
 
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={savePolicy}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2.5 rounded-lg font-medium shadow-sm"
                            >
                                Save Policy
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
};
 
export default PolicyDocuments;
 