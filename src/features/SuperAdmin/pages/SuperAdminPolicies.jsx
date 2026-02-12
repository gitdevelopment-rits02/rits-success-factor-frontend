import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";
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

import { useDispatch, useSelector } from "react-redux";
import superAdminPolicyThunk from "../Redux/thunks/superAdminPolicyThunk";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuperAdminPolicySkeleton from "./SuperAdminPolicySkeleton";

const POLICY_ICONS = {
  Security: HiOutlineShieldCheck,
  HR: HiOutlineDocumentText,
  Compliance: HiOutlineCalendar,
  Default: HiOutlineDocumentText,
};

export default function EmployeePoliciesManager() {
  const dispatch = useDispatch();
  const { data = [], loading } = useSelector(
    (state) => state.superAdmin?.policy,
  );
  const policies = data;

  useEffect(() => {
    dispatch(superAdminPolicyThunk.getPolicies());
  }, [dispatch]);

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [form, setForm] = useState(emptyForm());
  const fileRef = useRef(null);

  const [showSkeleton, setShowSkeleton] = useState(true);

  const [previewPolicies, setPreviewPolicies] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setShowSkeleton(true);
    const timer = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  function emptyForm() {
    return {
      id: "",
      type: "policy",
      title: "",
      desc: "",
      documentUrl: "",
      category: "",
      effectiveDate: "",
      status: "Draft",
      approvedBy: "",
      pdf: null,
      sections: [],
      removeDocument: false,
    };
  }

  const filteredPolicies = Array.isArray(policies)
    ? policies.filter(
        (p) =>
          p &&
          (p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.desc?.toLowerCase().includes(search.toLowerCase())),
      )
    : [];

  const openAdd = () => {
    setMode("add");
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = () => {
    setMode("edit");
    setForm({
      ...emptyForm(),
      _id: selectedPolicy._id,
      ...selectedPolicy,
      pdf: null,
      documentUrl: selectedPolicy.documentUrl,
    });
    setModalOpen(true);
  };

  const savePolicy = async () => {
    try {
      const newErrors = {};

      if (!form.title.trim()) newErrors.title = "Policy title is required";
      if (!form.category.trim()) newErrors.category = "Category is required";
      if (!form.sections || form.sections.length === 0)
        newErrors.sections = "At least one section is required";

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      if (mode === "add" && !form.pdf) {
        toast.error("Please upload a PDF document");
        return;
      }

      const previewPolicy = {
        _id: "preview-" + Date.now(),
        title: form.title,
        desc:
          form.sections[0]?.content?.slice(0, 80) ||
          "New policy description...",
        category: form.category,
        status: "Draft",
        sections: form.sections,
        isPreview: true,
      };

      setPreviewPolicies((prev) => [previewPolicy, ...prev]);
      setModalOpen(false);
      setForm(emptyForm());
      setShowSkeleton(true);

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("category", form.category.trim());
      formData.append(
        "sections",
        JSON.stringify(
          form.sections.map((s, index) => ({
            title: s.title.trim(),
            type: s.type,
            content:
              s.type === "bullet"
                ? (Array.isArray(s.content) ? s.content : [])
                    .map((i) => `• ${i.trim()}`)
                    .join("\n")
                : (s.content || "").trim(),
            order: index + 1,
          })),
        ),
      );

      if (form.removeDocument) {
        formData.append("removeDocument", "true");
      }

      if (form.pdf) {
        formData.append("document", form.pdf);
      }

      if (mode === "edit") {
        const updatedPolicy = await dispatch(
          superAdminPolicyThunk.updatePolicy({ id: form._id, data: formData }),
        ).unwrap();
        setSelectedPolicy(updatedPolicy);
        dispatch(superAdminPolicyThunk.getPolicies());
        toast.success("Policy updated successfully!");
      } else {
        await dispatch(superAdminPolicyThunk.createPolicy(formData)).unwrap();
        dispatch(superAdminPolicyThunk.getPolicies());
        toast.success("Policy created successfully!");
      }

      setPreviewPolicies([]);
      setShowSkeleton(false);
    } catch (err) {
      console.error("Save policy failed:", err);
      toast.error(err?.message || "Failed to save policy");
    }
  };

  const deletePolicy = async () => {
    toast.info(
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to delete this policy?</span>
        <div className="flex gap-2 justify-end mt-2">
          <button
            onClick={async () => {
              toast.dismiss();
              try {
                await dispatch(
                  superAdminPolicyThunk.deletePolicy(selectedPolicy._id),
                ).unwrap();
                setSelectedPolicy(null);
                dispatch(superAdminPolicyThunk.getPolicies());
                toast.success("Policy deleted successfully!");
              } catch (err) {
                console.error("Delete failed:", err);
                toast.error(err?.message || "Failed to delete policy");
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="border px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false },
    );
  };

  const updateSection = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [key]: value } : section,
      ),
    }));
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          type: "paragraph",
          content: "",
        },
      ],
    }));
  };

  const addListItem = (index) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.map((sec, i) =>
        i === index ? { ...sec, content: [...sec.content, ""] } : sec,
      ),
    }));
  };

  const updateListItem = (i, j, value) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.map((sec, index) =>
        index === i
          ? {
              ...sec,
              content: sec.content.map((item, idx) =>
                idx === j ? value : item,
              ),
            }
          : sec,
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* LIST VIEW */}
        {!selectedPolicy && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-semibold">
                  Employee Policies & Insurance
                </h1>
                <p className="text-slate-500">Manage company-wide documents</p>
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
              {loading || showSkeleton ? (
                <SuperAdminPolicySkeleton
                  type="list"
                  count={5}
                  previewData={previewPolicies}
                />
              ) : (
                filteredPolicies.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => setSelectedPolicy(item)}
                    className="cursor-pointer bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md flex justify-between"
                  >
                    <div className="flex gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                        {(() => {
                          const Icon =
                            POLICY_ICONS[item.category] || POLICY_ICONS.Default;
                          return <Icon />;
                        })()}
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <FiArrowRight className="text-slate-400 text-xl" />
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* DETAIL VIEW */}
        {selectedPolicy && (
          <div className="max-w-4xl mx-auto">
            {loading || showSkeleton ? (
              <SuperAdminPolicySkeleton type="detail" />
            ) : (
              <>
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

                  {selectedPolicy.documentUrl && (
                    <a
                      href={`https://rits-success-factor-development-dzhnebhehugbg2br.centralindia-01.azurewebsites.net/public/${selectedPolicy.documentUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 mb-4 underline"
                    >
                      <MdPictureAsPdf />
                      View attached document
                    </a>
                  )}

                  {selectedPolicy.sections.map((s, idx) => (
                    <div key={s._id || s.order || idx} className="mb-6">
                      <h3 className="font-semibold mb-2">
                        {s.number}. {s.title}
                      </h3>
                      {s.type === "paragraph" ? (
                        <p className="text-sm text-slate-700">{s.content}</p>
                      ) : (
                        <ul className="list-disc ml-6 space-y-1 text-sm">
                          {s.content.split("\n").map((i, idx) => (
                            <li key={idx}>{i.replace("• ", "")}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
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
              <div>
                <input
                  placeholder="Title"
                  className={`border p-2 rounded w-full ${
                    errors.title ? "border-red-500" : ""
                  }`}
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                    setErrors({ ...errors, title: "" });
                  }}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Category"
                  className={`border p-2 rounded w-full ${
                    errors.category ? "border-red-500" : ""
                  }`}
                  value={form.category}
                  onChange={(e) => {
                    setForm({ ...form, category: e.target.value });
                    setErrors({ ...errors, category: "" });
                  }}
                />
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 space-y-2">
              <button
                onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 text-blue-600 text-sm"
              >
                <MdPictureAsPdf /> Upload / Replace PDF
              </button>

              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm({ ...form, pdf: file });
                  }
                }}
              />

              {form.pdf && (
                <div className="flex items-center justify-between bg-slate-100 p-2 rounded">
                  <p className="text-sm text-slate-700">📄 {form.pdf.name}</p>
                  <button
                    onClick={() => setForm({ ...form, pdf: null })}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}

              {form.documentUrl && !form.pdf && (
                <div className="flex items-center justify-between bg-slate-100 p-2 rounded">
                  <a
                    href={`https://rits-success-factor-development-dzhnebhehugbg2br.centralindia-01.azurewebsites.net/${form.documentUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline"
                  >
                    View attached document
                  </a>
                  <button
                    onClick={() =>
                      setForm({
                        ...form,
                        documentUrl: "",
                        pdf: null,
                        removeDocument: true,
                      })
                    }
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {errors.sections && (
              <p className="text-red-500 text-sm mb-2">{errors.sections}</p>
            )}

            {form.sections.map((s, i) => (
              <div key={i} className="border rounded-xl p-4 mb-4 bg-slate-50">
                <input
                  placeholder="Section Title"
                  className={`w-full border p-2 rounded mb-1 ${
                    errors[`sectionTitle_${i}`] ? "border-red-500" : ""
                  }`}
                  value={s.title}
                  onChange={(e) => updateSection(i, "title", e.target.value)}
                />
                {errors[`sectionTitle_${i}`] && (
                  <p className="text-red-500 text-xs mb-2">
                    {errors[`sectionTitle_${i}`]}
                  </p>
                )}

                <select
                  className="border p-2 rounded mb-2"
                  value={s.type}
                  onChange={(e) => updateSection(i, "type", e.target.value)}
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="bullet">Checklist</option>
                </select>

                {s.type === "paragraph" ? (
                  <>
                    <textarea
                      rows={3}
                      className={`w-full border p-2 rounded ${
                        errors[`sectionContent_${i}`] ? "border-red-500" : ""
                      }`}
                      value={s.content}
                      onChange={(e) =>
                        updateSection(i, "content", e.target.value)
                      }
                    />
                    {errors[`sectionContent_${i}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`sectionContent_${i}`]}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {Array.isArray(s.content) &&
                      s.content.map((item, j) => (
                        <div key={j}>
                          <input
                            className={`w-full border p-2 rounded mb-1 ${
                              errors[`sectionItem_${i}_${j}`]
                                ? "border-red-500"
                                : ""
                            }`}
                            value={item}
                            onChange={(e) =>
                              updateListItem(i, j, e.target.value)
                            }
                          />
                          {errors[`sectionItem_${i}_${j}`] && (
                            <p className="text-red-500 text-xs mb-1">
                              {errors[`sectionItem_${i}_${j}`]}
                            </p>
                          )}
                        </div>
                      ))}
                    <button
                      onClick={() => addListItem(i)}
                      className="text-sm text-blue-600"
                    >
                      + Add Item
                    </button>

                    {errors[`sectionContent_${i}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`sectionContent_${i}`]}
                      </p>
                    )}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
