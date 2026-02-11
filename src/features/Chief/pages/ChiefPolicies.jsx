
import React, { useState, useRef } from "react";
import {
    FiSearch,
} from "react-icons/fi";
import {
    MdAdd,
    MdEdit,
    MdDelete,
    MdClose,
} from "react-icons/md";
import {
    HiOutlineDocumentText,
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

export default function ChiefPolicies() {
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
            setPolicies(policies.map((p) => (p.id === form.id ? form : p)));
            setSelectedPolicy(form);
        }
        setModalOpen(false);
    };

    const deletePolicy = () => {
        if (!selectedPolicy) return;
        setPolicies(policies.filter((p) => p.id !== selectedPolicy.id));
        setSelectedPolicy(null);
    };

    /* ---------------- SECTIONS ---------------- */

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

    const updateSection = (i, key, val) => {
        const updated = [...form.sections];
        updated[i][key] = val;
        setForm({ ...form, sections: updated });
    };

    const updateListItem = (secIdx, itemIdx, val) => {
        const updated = [...form.sections];
        updated[secIdx].content[itemIdx] = val;
        setForm({ ...form, sections: updated });
    };

    const addListItem = (secIdx) => {
        const updated = [...form.sections];
        updated[secIdx].content.push("");
        setForm({ ...form, sections: updated });
    };

    /* ---------------- PDF UPLOAD ---------------- */

    const handlePdfUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setForm({ ...form, pdf: url });
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50">

            {/* --- HEADER --- */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Chief Policies & Documents
                    </h1>
                    <p className="text-sm text-slate-500">
                        Manage organization-wide policies
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 border rounded-full text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
                    >
                        <MdAdd size={18} /> New Policy
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">

                {/* --- LIST SIDEBAR --- */}
                <div className="w-80 bg-white border-r overflow-y-auto p-4 space-y-3">
                    {filteredPolicies.length === 0 && (
                        <p className="text-center text-sm text-gray-400 mt-10">
                            No policies found.
                        </p>
                    )}

                    {filteredPolicies.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedPolicy(p)}
                            className={`group p-4 rounded-xl border cursor-pointer transition-all ${selectedPolicy?.id === p.id
                                    ? "bg-blue-50 border-blue-500 shadow-md transform scale-[1.02]"
                                    : "bg-white border-gray-100 hover:border-blue-200 hover:bg-slate-50"
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <div
                                    className={`p-2 rounded-lg text-xl ${selectedPolicy?.id === p.id
                                            ? "bg-white text-blue-600"
                                            : "bg-blue-50 text-blue-500"
                                        }`}
                                >
                                    {p.icon || <HiOutlineDocumentText />}
                                </div>
                                <div>
                                    <h3
                                        className={`font-semibold text-sm ${selectedPolicy?.id === p.id
                                                ? "text-blue-900"
                                                : "text-slate-700"
                                            }`}
                                    >
                                        {p.title}
                                    </h3>
                                    <span className="text-xs text-slate-400 mt-1 inline-block">
                                        {p.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- DETAILS AREA --- */}
                <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
                    {selectedPolicy ? (
                        <div className="max-w-4xl mx-auto bg-white min-h-[80vh] shadow-xl rounded-2xl p-10 relative">

                            {/* Toolbar */}
                            <div className="absolute top-6 right-6 flex gap-2">
                                <button
                                    onClick={openEdit}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                                    title="Edit"
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button
                                    onClick={deletePolicy}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                                    title="Delete"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </div>

                            {/* Header */}
                            <div className="text-center border-b pb-8 mb-8">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {selectedPolicy.status}
                                </span>
                                <h1 className="text-3xl font-bold text-slate-800 mt-4 mb-2">
                                    {selectedPolicy.title}
                                </h1>
                                <div className="flex justify-center gap-6 text-sm text-slate-500">
                                    <span>Effective: {selectedPolicy.effectiveDate}</span>
                                    <span>Approved By: {selectedPolicy.approvedBy}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-8">
                                {selectedPolicy.sections.map((sec) => (
                                    <div key={sec.number}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold">
                                                {sec.number}
                                            </span>
                                            <h2 className="text-lg font-bold text-slate-800">
                                                {sec.title}
                                            </h2>
                                        </div>

                                        {sec.type === "paragraph" ? (
                                            <p className="text-slate-600 leading-relaxed ml-9 text-sm text-justify">
                                                {sec.content}
                                            </p>
                                        ) : (
                                            <ul className="ml-9 space-y-2">
                                                {sec.content.map((li, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-sm text-slate-600"
                                                    >
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                                        {li}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <HiOutlineDocumentText className="text-6xl mb-4 opacity-20" />
                            <p>Select a policy to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- ADD / EDIT MODAL --- */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

                        <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                            <h2 className="text-lg font-bold text-slate-800">
                                {mode === "add" ? "Draft New Policy" : "Edit Policy"}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <MdClose size={22} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-4">
                            <div className="space-y-3">
                                <input
                                    placeholder="Policy Title"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="Category (e.g. HR, IT)"
                                        className="border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none"
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm({ ...form, category: e.target.value })
                                        }
                                    />
                                    <input
                                        type="date"
                                        className="border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none"
                                        value={form.effectiveDate}
                                        onChange={(e) =>
                                            setForm({ ...form, effectiveDate: e.target.value })
                                        }
                                    />
                                </div>
                                <input
                                    placeholder="Approved By"
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm outline-none"
                                    value={form.approvedBy}
                                    onChange={(e) =>
                                        setForm({ ...form, approvedBy: e.target.value })
                                    }
                                />
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-sm font-bold text-slate-700 mb-3">
                                    Sections
                                </h3>
                                {form.sections.map((sec, i) => (
                                    <div
                                        key={i}
                                        className="bg-slate-50 p-4 rounded-xl mb-3 border border-slate-200"
                                    >
                                        <div className="flex gap-2 mb-2">
                                            <span className="bg-slate-200 text-slate-600 w-6 h-6 rounded flex items-center justify-center text-xs font-bold">
                                                {i + 1}
                                            </span>
                                            <input
                                                placeholder="Section Title"
                                                className="flex-1 bg-transparent border-b border-transparent focus:border-blue-500 outline-none text-sm font-semibold"
                                                value={sec.title}
                                                onChange={(e) =>
                                                    updateSection(i, "title", e.target.value)
                                                }
                                            />
                                            <select
                                                className="text-xs bg-white border rounded px-2"
                                                value={sec.type}
                                                onChange={(e) => {
                                                    updateSection(i, "type", e.target.value);
                                                    updateSection(
                                                        i,
                                                        "content",
                                                        e.target.value === "list" ? [""] : ""
                                                    );
                                                }}
                                            >
                                                <option value="paragraph">Paragraph</option>
                                                <option value="list">List</option>
                                            </select>
                                        </div>

                                        {sec.type === "paragraph" ? (
                                            <textarea
                                                rows={3}
                                                className="w-full text-sm bg-white border rounded-lg p-2 outline-none"
                                                placeholder="Content..."
                                                value={sec.content}
                                                onChange={(e) =>
                                                    updateSection(i, "content", e.target.value)
                                                }
                                            />
                                        ) : (
                                            <div className="space-y-2 pl-8">
                                                {sec.content.map((item, idx) => (
                                                    <input
                                                        key={idx}
                                                        className="w-full text-sm bg-white border rounded-lg p-2 outline-none"
                                                        placeholder={`• Item ${idx + 1}`}
                                                        value={item}
                                                        onChange={(e) =>
                                                            updateListItem(i, idx, e.target.value)
                                                        }
                                                    />
                                                ))}
                                                <button
                                                    onClick={() => addListItem(i)}
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    + Add Item
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button
                                    onClick={addSection}
                                    className="w-full py-2 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 text-sm hover:border-blue-400 hover:text-blue-500 transition"
                                >
                                    + Add Section
                                </button>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-5 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={savePolicy}
                                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
                            >
                                Save Policy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
