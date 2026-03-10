
import React, { useState, useRef, useEffect } from "react";

import { FiSearch, FiArrowRight, FiArrowLeft } from "react-icons/fi";

import { MdAdd, MdEdit, MdDelete, MdClose, MdPictureAsPdf } from "react-icons/md";

import { HiOutlineDocumentText } from "react-icons/hi";

import { useDispatch, useSelector } from "react-redux";

import hrPolicyAndInsuranceCreationThunk from "../Redux/thunks/HrPolicyAndInsuranceCreationThunk";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import HrPolicyAndInsuranceSkeleton from "./HrPolicyAndInsuranceSkeleton";



/*  COMPONENT  */

export default function EmployeePoliciesManager() {

  const dispatch = useDispatch();



  const hrPolicyState = useSelector(

    (state) => state.hr.policyAndInsuranceCreation

  );



  const policies = hrPolicyState?.policies || [];

  const loading = hrPolicyState?.loading || false;

  const error = hrPolicyState?.error;



  useEffect(() => {

    dispatch(hrPolicyAndInsuranceCreationThunk.getPoliciesThunk());

  }, [dispatch]);



  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [mode, setMode] = useState("add");

  const [form, setForm] = useState(emptyForm());

  const fileRef = useRef(null);





  const [errors, setErrors] = useState({});

  // // PAGINATION STATE

  // const [currentPage, setCurrentPage] = useState(1);

  // const policiesPerPage = 5; // change if needed



  // // Calculate indexes

  // const indexOfLastPolicy = currentPage * policiesPerPage;

  // const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;

  // const currentPolicies = filteredPolicies.slice(

  //   indexOfFirstPolicy,

  //   indexOfLastPolicy

  // );



  // // Total pages

  // const totalPages = Math.ceil(filteredPolicies.length / policiesPerPage);



  function emptyForm() {

    return {

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



  /*  FILTER  */

  const filteredPolicies = policies.filter(

    (p) =>

      p.title?.toLowerCase().includes(search.toLowerCase()) ||

      p.category?.toLowerCase().includes(search.toLowerCase())

  );

  // PAGINATION STATE

  const [currentPage, setCurrentPage] = useState(1);

  const policiesPerPage = 5;



  const indexOfLastPolicy = currentPage * policiesPerPage;

  const indexOfFirstPolicy = indexOfLastPolicy - policiesPerPage;

  const currentPolicies = filteredPolicies.slice(

    indexOfFirstPolicy,

    indexOfLastPolicy

  );



  const totalPages = Math.ceil(filteredPolicies.length / policiesPerPage);





  const openAdd = () => {

    setMode("add");

    setForm(emptyForm());

    setErrors({});

    setModalOpen(true);

  };



  const openEdit = () => {

    if (!selectedPolicy) return;



    setMode("edit");

    const formattedSections = (selectedPolicy.sections || []).map((s) => ({

      ...s,

      content:

        s.type === "list"

          ? typeof s.content === "string"

            ? s.content.split("\n")

            : s.content || [""]

          : s.content || "",

    }));



    setForm({ ...selectedPolicy, sections: formattedSections });

    setErrors({});

    setModalOpen(true);

  };



  const validateForm = () => {

    const newErrors = {};



    if (!form.title?.trim()) {

      newErrors.title = "Title is required";

    }



    if (!form.category?.trim()) {

      newErrors.category = "Category is required";

    }



    if (!form.pdf && mode === "add") {

      newErrors.pdf = "PDF is required";

    }



    if (form.sections.length === 0) {

      newErrors.sections = "At least one section is required";

    }



    form.sections.forEach((section, index) => {

      if (!section.title?.trim()) {

        newErrors[`sectionTitle_${index}`] = "Section title is required";

      }



      if (section.type === "paragraph" && !section.content?.trim()) {

        newErrors[`sectionContent_${index}`] =

          "Section content is required";

      }



      if (section.type === "list") {

        if (!section.content || section.content.length === 0) {

          newErrors[`sectionContent_${index}`] =

            "At least one list item required";

        }

      }

    });



    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };





  const savePolicy = () => {

    if (!validateForm()) return;



    const formData = new FormData();



    formData.append("title", form.title);

    formData.append("category", form.category);

    formData.append("desc", form.desc);

    formData.append(

      "sections",

      JSON.stringify(

        form.sections.map((s, index) => ({

          title: s.title,

          type: s.type,

          content: s.type === "list" ? s.content.join("\n") : s.content,

          order: index + 1,

        }))

      )

    );



    if (form.pdf) formData.append("pdf", form.pdf);



    if (mode === "add") {

      dispatch(hrPolicyAndInsuranceCreationThunk.createPolicyThunk(formData))

        .then(() => {

          dispatch(hrPolicyAndInsuranceCreationThunk.getPoliciesThunk());

          toast.success("Policy added successfully");

        })

        .catch(() => toast.error("Failed to add policy"));

    } else {

      dispatch(

        hrPolicyAndInsuranceCreationThunk.updatePolicyThunk({

          id: form._id,

          formData,

        })

      )

        .then(() => {

          dispatch(hrPolicyAndInsuranceCreationThunk.getPoliciesThunk());

          toast.success("Policy updated successfully");

        })

        .catch(() => toast.error("Failed to update policy"));

    }



    setModalOpen(false);

    setSelectedPolicy(null);

  };



  const deletePolicy = () => {

    if (!window.confirm("Delete this policy?")) return;



    dispatch(hrPolicyAndInsuranceCreationThunk.deletePolicyThunk(selectedPolicy._id))

      .then(() => {

        dispatch(hrPolicyAndInsuranceCreationThunk.getPoliciesThunk());

        toast.success("Policy deleted successfully");

      })

      .catch(() => toast.error("Failed to delete policy"));

    setSelectedPolicy(null);

  };



  /* SECTION HANDLERS  */

  const addSection = () => {

    setForm({

      ...form,

      sections: [

        ...form.sections,

        { number: form.sections.length + 1, title: "", type: "paragraph", content: "" },

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

    if (!Array.isArray(updated[i].content)) updated[i].content = [""];

    else updated[i].content.push("");

    setForm({ ...form, sections: updated });

  };



  const updateListItem = (i, j, value) => {

    const updated = [...form.sections];

    updated[i].content[j] = value;

    setForm({ ...form, sections: updated });

  };



  /* UI */

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">

      <div className="max-w-6xl mx-auto">



        {/*  ERROR  */}

        {error && <p className="text-center text-red-500">{error.message || "Failed to load policies."}</p>}



        {/* LIST VIEW*/}

        {!selectedPolicy && (

          <>

            <div className="flex justify-between items-center mb-8">

              <div>

                <h1 className="text-3xl font-semibold">Employee Policies & Insurance</h1>

                <p className="text-slate-500">Manage company-wide documents</p>

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

                onChange={(e) => {

                  setSearch(e.target.value);

                  setCurrentPage(1);

                }}

                placeholder="Search policies..."

                className="w-full pl-10 pr-4 py-3 rounded-xl border"

              />

            </div>



            <div className="grid gap-4">

              {loading ? (

                <HrPolicyAndInsuranceSkeleton />

              ) : filteredPolicies.length === 0 ? (

                <p className="text-center text-slate-500">No policies found.</p>

              ) : (

                currentPolicies.map((item) => (

                  <div

                    key={item._id}

                    onClick={() => setSelectedPolicy(item)}

                    className="cursor-pointer bg-white p-5 rounded-2xl border shadow-sm hover:shadow-md flex justify-between"

                  >

                    <div className="flex gap-4">

                      <div className="p-3 bg-blue-50 rounded-xl text-blue-600">

                        <HiOutlineDocumentText size={20} />

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

            {/* PAGINATION CONTROLS */}

            {totalPages > 1 && (

              <div className="flex justify-center items-center gap-4 mt-6">

                <button

                  disabled={currentPage === 1}

                  onClick={() => setCurrentPage((prev) => prev - 1)}

                  className={`px-3 py-1 rounded border ${currentPage === 1

                    ? "opacity-50 cursor-not-allowed"

                    : "hover:bg-slate-100"

                    }`}

                >

                  Previous

                </button>



                <span className="text-sm">

                  Page {currentPage} of {totalPages}

                </span>



                <button

                  disabled={currentPage === totalPages}

                  onClick={() => setCurrentPage((prev) => prev + 1)}

                  className={`px-3 py-1 rounded border ${currentPage === totalPages

                    ? "opacity-50 cursor-not-allowed"

                    : "hover:bg-slate-100"

                    }`}

                >

                  Next

                </button>

              </div>

            )}

          </>

        )}



        {/*  DETAIL VIEW  */}

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

                  <h1 className="text-2xl font-semibold">{selectedPolicy.title}</h1>

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

                  href={selectedPolicy.documentUrl}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="flex items-center gap-2 text-sm text-blue-600 mb-4 hover:underline"

                >

                  <MdPictureAsPdf />

                  View Attached PDF

                </a>

              )}



              {selectedPolicy.sections?.map((s, index) => (

                <div key={index} className="mb-6">

                  <h3 className="font-semibold mb-2">{index + 1}. {s.title}</h3>

                  {s.type === "paragraph" ? (

                    <p className="text-sm text-slate-700">{s.content}</p>

                  ) : (

                    <ul className="list-disc ml-6 space-y-1 text-sm">

                      {(Array.isArray(s.content) ? s.content : s.content?.split("\n") || []).map((item, idx) => (

                        <li key={idx}>{item}</li>

                      ))}

                    </ul>

                  )}

                </div>

              ))}

            </div>

          </div>

        )}



        {/*  ADD / EDIT MODAL  */}

        {modalOpen && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto">

              <div className="flex justify-between mb-4">

                <h2 className="text-xl font-semibold">{mode === "add" ? "Add Policy" : "Edit Policy"}</h2>

                <button onClick={() => setModalOpen(false)}><MdClose size={22} /></button>

              </div>



              <div className="mb-4">

                <div className="grid grid-cols-2 gap-4">

                  <div>

                    <input

                      placeholder="Title"

                      className={`w-full border p-2 rounded ${errors.title ? "border-red-500" : ""

                        }`}

                      value={form.title}

                      onChange={(e) =>

                        setForm({ ...form, title: e.target.value })

                      }

                    />

                    <p className="text-red-500 text-xs mt-1 min-h-[16px]">

                      {errors.title || ""}

                    </p>

                  </div>



                  <div>

                    <input

                      placeholder="Category"

                      className={`w-full border p-2 rounded ${errors.category ? "border-red-500" : ""

                        }`}

                      value={form.category}

                      onChange={(e) =>

                        setForm({ ...form, category: e.target.value })

                      }

                    />

                    <p className="text-red-500 text-xs mt-1 min-h-[16px]">

                      {errors.category || ""}

                    </p>

                  </div>

                </div>



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

                  onChange={(e) => setForm({ ...form, pdf: e.target.files[0] })}

                />

                {form.pdf && <p className="text-xs text-slate-500 mt-1">Attached: {form.pdf.name || form.pdf}</p>}

                <p className="text-red-500 text-xs mt-1 min-h-[16px]">

                  {errors.pdf || ""}

                </p>

              </div>



              {/* Sections */}

              {form.sections.map((s, i) => (

                <div key={i} className="border rounded-xl p-4 mb-4 bg-slate-50">

                  <input

                    placeholder="Section Title"

                    className={`w-full border p-2 rounded mb-2 ${errors[`sectionTitle_${i}`] ? "border-red-500" : ""

                      }`}

                    value={s.title}

                    onChange={(e) => updateSection(i, "title", e.target.value)}

                  />

                  <p className="text-red-500 text-xs mb-2 min-h-[16px]">

                    {errors[`sectionTitle_${i}`] || ""}

                  </p>

                  <select

                    className="border p-2 rounded mb-2"

                    value={s.type}

                    onChange={(e) => {

                      const newType = e.target.value;

                      const updated = [...form.sections];

                      updated[i].type = newType;

                      updated[i].content = newType === "list" ? [""] : "";

                      setForm({ ...form, sections: updated });

                    }}

                  >

                    <option value="paragraph">Paragraph</option>

                    <option value="list">Checklist</option>

                  </select>



                  {s.type === "paragraph" ? (

                    <>

                      <textarea

                        rows={3}

                        className={`w-full border p-2 rounded ${errors[`sectionContent_${i}`] ? "border-red-500" : ""

                          }`}

                        value={s.content}

                        onChange={(e) => updateSection(i, "content", e.target.value)}

                      />



                      <p className="text-red-500 text-xs mb-2 min-h-[16px]">

                        {errors[`sectionContent_${i}`] || ""}

                      </p>

                    </>

                  ) : (

                    <>

                      {s.content.map((item, j) => (

                        <input

                          key={j}

                          className="w-full border p-2 rounded mb-2"

                          value={item}

                          onChange={(e) => updateListItem(i, j, e.target.value)}

                        />

                      ))}

                      <button onClick={() => addListItem(i)} className="text-sm text-blue-600">

                        + Add Item

                      </button>

                    </>

                  )}

                </div>

              ))}



              <button onClick={addSection} className="w-full border-dashed border p-2 rounded mb-4">

                + Add Section

              </button>



              <div className="flex gap-3">

                <button onClick={savePolicy} className="flex-1 bg-blue-600 text-white py-2 rounded">Save</button>

                <button onClick={() => setModalOpen(false)} className="flex-1 border py-2 rounded">Cancel</button>

              </div>

            </div>

          </div>

        )}



      </div>



      <ToastContainer

        position="top-right"

        autoClose={3000}

        hideProgressBar={false}

        newestOnTop={false}

        closeOnClick

        rtl={false}

        pauseOnFocusLoss

        draggable

        pauseOnHover

        theme="colored"

      />

    </div>

  );

}