
import React, { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose } from 'react-icons/md';

/* ------------------ INITIAL DATA ------------------ */

const initialPolicies = [
  {
    id: 'security-policy',
    title: 'New Security Policy on Data Sharing',
    type: 'Security',
    status: 'Active',
    effectiveFrom: '2024-01-01',
    sections: [
      {
        number: '1',
        title: 'Purpose',
        content:
          'This policy aims to establish guidelines for secure and responsible data sharing within the organization.',
      },
      {
        number: '2',
        title: 'Scope',
        content:
          'This policy covers all employees, contractors, interns, and third parties handling organizational data.',
      },
      {
        number: '3',
        title: 'Definitions',
        content:
          'Data: Any information in digital form.\nSensitive Data: Confidential, Secret, or Top Secret information.',
      },
      {
        number: '4',
        title: 'Policy Guidelines',
        content:
          '• All data must be classified.\n• Confidential data must be encrypted.\n• Access is granted on a need-to-know basis.',
      },
    ],
  },
];

/* ------------------ COMPONENT ------------------ */

const SuperAdminPolicies = () => {
  const [policies, setPolicies] = useState(initialPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState(initialPolicies[0]);

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState('add');
  const [form, setForm] = useState(emptyForm());

  function emptyForm() {
    return {
      id: '',
      title: '',
      type: '',
      status: 'Draft',
      effectiveFrom: '',
      sections: [],
    };
  }

  /* ------------------ ACTIONS ------------------ */

  const openAdd = () => {
    setMode('add');
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEdit = () => {
    setMode('edit');
    setForm(JSON.parse(JSON.stringify(selectedPolicy)));
    setModalOpen(true);
  };

  const savePolicy = () => {
    if (!form.title || !form.type || form.sections.length === 0) {
      alert('Title, type, and at least one section are required');
      return;
    }

    if (mode === 'add') {
      const newPolicy = {
        ...form,
        id: crypto.randomUUID(),
      };
      setPolicies((p) => [...p, newPolicy]);
      setSelectedPolicy(newPolicy);
    } else {
      setPolicies((p) =>
        p.map((pol) => (pol.id === form.id ? form : pol))
      );
      setSelectedPolicy(form);
    }

    setModalOpen(false);
  };

  const deletePolicy = () => {
    if (!window.confirm('Delete this policy permanently?')) return;

    const remaining = policies.filter((p) => p.id !== selectedPolicy.id);
    setPolicies(remaining);
    setSelectedPolicy(remaining[0] || null);
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        {
          number: String(form.sections.length + 1),
          title: '',
          content: '',
        },
      ],
    });
  };

  const updateSection = (i, key, value) => {
    const updated = [...form.sections];
    updated[i][key] = value;
    setForm({ ...form, sections: updated });
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="flex h-screen bg-slate-50">

      {/* LEFT */}
      <div className="w-96 bg-white border-r">
        <div className="p-4 border-b flex justify-between">
          <b>Policies</b>
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
          >
            <MdAdd /> New
          </button>
        </div>

        <div className="p-4 space-y-2">
          {policies.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPolicy(p)}
              className={`p-3 border rounded cursor-pointer ${
                selectedPolicy?.id === p.id
                  ? 'bg-blue-50 border-blue-400'
                  : ''
              }`}
            >
              <b>{p.title}</b>
              <div className="text-xs text-slate-500">
                {p.type} • {p.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      {selectedPolicy && (
        <div className="flex-1 p-10 bg-white overflow-y-auto">
          <div className="max-w-4xl mx-auto">

            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold text-center w-full">
                {selectedPolicy.title}
              </h1>
              <div className="flex gap-2">
                <button onClick={openEdit} className="text-blue-600">
                  <MdEdit />
                </button>
                <button onClick={deletePolicy} className="text-red-600">
                  <MdDelete />
                </button>
              </div>
            </div>

            {selectedPolicy.sections.map((s, i) => (
              <div key={i} className="mb-6">
                <h2 className="font-bold">
                  {s.number}. {s.title}
                </h2>
                <p className="text-sm text-slate-700 whitespace-pre-line mt-2">
                  {s.content}
                </p>
              </div>
            ))}

          </div>
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-4">

            <div className="flex justify-between">
              <b>{mode === 'add' ? 'Add Policy' : 'Edit Policy'}</b>
              <button onClick={() => setModalOpen(false)}>
                <MdClose />
              </button>
            </div>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Type"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            {form.sections.map((s, i) => (
              <div key={i} className="border p-3 rounded space-y-2">
                <input
                  placeholder="Section Title"
                  value={s.title}
                  onChange={(e) =>
                    updateSection(i, 'title', e.target.value)
                  }
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Section Content"
                  value={s.content}
                  onChange={(e) =>
                    updateSection(i, 'content', e.target.value)
                  }
                  className="w-full border p-2 rounded h-28"
                />
              </div>
            ))}

            <button
              onClick={addSection}
              className="border px-3 py-1 rounded text-sm"
            >
              + Add Section
            </button>

            <div className="flex gap-3 pt-2">
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
};

export default SuperAdminPolicies;
