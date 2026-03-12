import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const EMPTY_BILL = {
  id: '',
  billNumber: '',
  title: '',
  state: 'Federal',
  shortDescription: '',
  whyItMatters: '',
  currentStatus: 'In Committee',
  urgency: 'High',
  officialUrl: '',
  emailTemplate: { subject: '', body: '' },
  active: true,
  createdAt: new Date().toISOString().slice(0, 10),
}

const STATUS_OPTIONS = ['In Committee', 'Passed Committee', 'Floor Vote', 'Signed into Law', 'Failed']
const URGENCY_OPTIONS = ['High', 'Medium', 'Low']

const US_STATES = [
  'Federal', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI',
  'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA',
  'WA', 'WV', 'WI', 'WY',
]

export default function AdminBills() {
  const { bills, setBills } = useAppContext()
  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY_BILL)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const openNew = () => {
    setEditId(null)
    setForm({ ...EMPTY_BILL, id: `bill-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) })
    setFormOpen(true)
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
  }

  const openEdit = (b) => {
    setEditId(b.id)
    setForm(JSON.parse(JSON.stringify(b)))
    setFormOpen(true)
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditId(null)
    setForm(EMPTY_BILL)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editId) {
      setBills(bills.map(b => b.id === editId ? { ...form } : b))
    } else {
      setBills([...bills, { ...form }])
    }
    closeForm()
  }

  const handleDelete = (id) => {
    setBills(bills.filter(b => b.id !== id))
    setDeleteConfirmId(null)
  }

  const toggleActive = (id) => {
    setBills(bills.map(b => b.id === id ? { ...b, active: !b.active } : b))
  }

  const setField = (path, value) => {
    setForm(prev => {
      const updated = { ...prev }
      const parts = path.split('.')
      let obj = updated
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] }
        obj = obj[parts[i]]
      }
      obj[parts[parts.length - 1]] = value
      return updated
    })
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Bills</h1>
          <p className="text-gray-500 text-sm mt-1">{bills.length} total</p>
        </div>
        <button onClick={openNew} className="btn-primary">
          + Add New Bill
        </button>
      </div>

      {/* Bills Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        {bills.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No bills yet. Add one above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bill</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">State</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Urgency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Active</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bills.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-accent text-xs mb-0.5">{b.billNumber}</div>
                    <div className="font-medium text-navy text-sm line-clamp-1">{b.title}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{b.state}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{b.currentStatus}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      b.urgency === 'High' ? 'bg-red-100 text-red-700' :
                      b.urgency === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {b.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(b.id)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                        b.active ? 'bg-accent' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          b.active ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(b)}
                        className="text-xs px-3 py-1.5 border border-navy text-navy rounded-lg hover:bg-navy hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      {deleteConfirmId === b.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="text-xs px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(b.id)}
                          className="text-xs px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form */}
      {formOpen && (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">{editId ? 'Edit Bill' : 'New Bill'}</h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Bill Number *">
                <input required className="input-field" value={form.billNumber} onChange={e => setField('billNumber', e.target.value)} placeholder="e.g. H.R. 1234 or SB 123" />
              </FormField>
              <FormField label="State / Jurisdiction">
                <select className="input-field" value={form.state} onChange={e => setField('state', e.target.value)}>
                  {US_STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              <FormField label="Urgency">
                <select className="input-field" value={form.urgency} onChange={e => setField('urgency', e.target.value)}>
                  {URGENCY_OPTIONS.map(u => <option key={u}>{u}</option>)}
                </select>
              </FormField>
              <FormField label="Current Status">
                <select className="input-field" value={form.currentStatus} onChange={e => setField('currentStatus', e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              <FormField label="Official URL">
                <input type="url" className="input-field" value={form.officialUrl || ''} onChange={e => setField('officialUrl', e.target.value)} placeholder="https://..." />
              </FormField>
              <FormField label="Created Date">
                <input type="date" className="input-field" value={form.createdAt} onChange={e => setField('createdAt', e.target.value)} />
              </FormField>
            </div>

            <FormField label="Title *">
              <input required className="input-field" value={form.title} onChange={e => setField('title', e.target.value)} />
            </FormField>

            <FormField label="Short Description *">
              <textarea required rows={3} className="input-field" value={form.shortDescription} onChange={e => setField('shortDescription', e.target.value)} />
            </FormField>

            <FormField label="Why It Matters *">
              <textarea required rows={10} className="input-field" value={form.whyItMatters} onChange={e => setField('whyItMatters', e.target.value)} />
            </FormField>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-navy mb-4">Email Template</h3>
              <div className="space-y-4">
                <FormField label="Subject">
                  <input className="input-field" value={form.emailTemplate?.subject || ''} onChange={e => setField('emailTemplate.subject', e.target.value)} />
                </FormField>
                <FormField label="Body (use {{rep_name}}, {{user_zip}})">
                  <textarea rows={10} className="input-field" value={form.emailTemplate?.body || ''} onChange={e => setField('emailTemplate.body', e.target.value)} />
                </FormField>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={e => setField('active', e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm font-medium text-gray-700">Active (visible on site)</span>
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary">
                {editId ? 'Save Changes' : 'Create Bill'}
              </button>
              <button type="button" onClick={closeForm} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  )
}
