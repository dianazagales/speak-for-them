import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const EMPTY_CASE = {
  id: '',
  title: '',
  animalName: '',
  species: 'Dog',
  location: { city: '', state: '' },
  status: 'Needs Investigation',
  urgency: 'High',
  shortDescription: '',
  fullDescription: '',
  photoUrl: '',
  localPolice: { name: '', email: '', phone: '' },
  localAnimalControl: { name: '', email: '', phone: '' },
  emailTemplate: { subject: '', body: '' },
  timeline: [],
  active: true,
  createdAt: new Date().toISOString().slice(0, 10),
}

const STATUS_OPTIONS = ['Needs Investigation', 'Charges Pending', 'Awaiting Prosecution', 'Resolved']
const URGENCY_OPTIONS = ['High', 'Medium', 'Low']
const SPECIES_OPTIONS = ['Dog', 'Cat', 'Horse', 'Bird', 'Rabbit', 'Pig', 'Cattle', 'Other']

export default function AdminCases() {
  const { cases, setCases } = useAppContext()
  const [formOpen, setFormOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY_CASE)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [timelineInput, setTimelineInput] = useState({ date: '', event: '' })

  const openNew = () => {
    setEditId(null)
    setForm({ ...EMPTY_CASE, id: `case-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) })
    setFormOpen(true)
    setTimelineInput({ date: '', event: '' })
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
  }

  const openEdit = (c) => {
    setEditId(c.id)
    setForm(JSON.parse(JSON.stringify(c)))
    setFormOpen(true)
    setTimelineInput({ date: '', event: '' })
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditId(null)
    setForm(EMPTY_CASE)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editId) {
      setCases(cases.map(c => c.id === editId ? { ...form } : c))
    } else {
      setCases([...cases, { ...form }])
    }
    closeForm()
  }

  const handleDelete = (id) => {
    setCases(cases.filter(c => c.id !== id))
    setDeleteConfirmId(null)
  }

  const toggleActive = (id) => {
    setCases(cases.map(c => c.id === id ? { ...c, active: !c.active } : c))
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

  const addTimeline = () => {
    if (!timelineInput.date || !timelineInput.event) return
    setForm(prev => ({
      ...prev,
      timeline: [...(prev.timeline || []), { ...timelineInput }],
    }))
    setTimelineInput({ date: '', event: '' })
  }

  const removeTimeline = (i) => {
    setForm(prev => ({
      ...prev,
      timeline: prev.timeline.filter((_, idx) => idx !== i),
    }))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Cases</h1>
          <p className="text-gray-500 text-sm mt-1">{cases.length} total</p>
        </div>
        <button onClick={openNew} className="btn-primary">
          + Add New Case
        </button>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
        {cases.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No cases yet. Add one above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Urgency</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Active</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cases.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy line-clamp-1">{c.title}</div>
                    <div className="text-xs text-gray-400">{c.location?.city}, {c.location?.state}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.status}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      c.urgency === 'High' ? 'bg-red-100 text-red-700' :
                      c.urgency === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {c.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(c.id)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                        c.active ? 'bg-accent' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          c.active ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(c)}
                        className="text-xs px-3 py-1.5 border border-navy text-navy rounded-lg hover:bg-navy hover:text-white transition-colors"
                      >
                        Edit
                      </button>
                      {deleteConfirmId === c.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleDelete(c.id)}
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
                          onClick={() => setDeleteConfirmId(c.id)}
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
            <h2 className="text-xl font-bold text-navy">{editId ? 'Edit Case' : 'New Case'}</h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Case Title *">
                <input required className="input-field" value={form.title} onChange={e => setField('title', e.target.value)} />
              </FormField>
              <FormField label="Animal Name *">
                <input required className="input-field" value={form.animalName} onChange={e => setField('animalName', e.target.value)} />
              </FormField>
              <FormField label="Species">
                <select className="input-field" value={form.species} onChange={e => setField('species', e.target.value)}>
                  {SPECIES_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              <FormField label="Urgency">
                <select className="input-field" value={form.urgency} onChange={e => setField('urgency', e.target.value)}>
                  {URGENCY_OPTIONS.map(u => <option key={u}>{u}</option>)}
                </select>
              </FormField>
              <FormField label="Status">
                <select className="input-field" value={form.status} onChange={e => setField('status', e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </FormField>
              <FormField label="Created Date">
                <input type="date" className="input-field" value={form.createdAt} onChange={e => setField('createdAt', e.target.value)} />
              </FormField>
              <FormField label="City">
                <input className="input-field" value={form.location?.city || ''} onChange={e => setField('location.city', e.target.value)} />
              </FormField>
              <FormField label="State (abbr.)">
                <input maxLength={2} className="input-field" value={form.location?.state || ''} onChange={e => setField('location.state', e.target.value.toUpperCase())} />
              </FormField>
              <FormField label="Photo URL">
                <input className="input-field" value={form.photoUrl || ''} onChange={e => setField('photoUrl', e.target.value)} placeholder="https://..." />
              </FormField>
            </div>

            <FormField label="Short Description *">
              <textarea required rows={3} className="input-field" value={form.shortDescription} onChange={e => setField('shortDescription', e.target.value)} />
            </FormField>

            <FormField label="Full Description *">
              <textarea required rows={8} className="input-field" value={form.fullDescription} onChange={e => setField('fullDescription', e.target.value)} />
            </FormField>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-navy mb-4">Email Template</h3>
              <div className="space-y-4">
                <FormField label="Subject">
                  <input className="input-field" value={form.emailTemplate?.subject || ''} onChange={e => setField('emailTemplate.subject', e.target.value)} />
                </FormField>
                <FormField label="Body (use {{rep_name}}, {{case_name}}, {{user_zip}})">
                  <textarea rows={8} className="input-field" value={form.emailTemplate?.body || ''} onChange={e => setField('emailTemplate.body', e.target.value)} />
                </FormField>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-navy mb-4">Local Animal Control</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Name">
                  <input className="input-field" value={form.localAnimalControl?.name || ''} onChange={e => setField('localAnimalControl.name', e.target.value)} />
                </FormField>
                <FormField label="Email">
                  <input type="email" className="input-field" value={form.localAnimalControl?.email || ''} onChange={e => setField('localAnimalControl.email', e.target.value)} />
                </FormField>
                <FormField label="Phone">
                  <input className="input-field" value={form.localAnimalControl?.phone || ''} onChange={e => setField('localAnimalControl.phone', e.target.value)} />
                </FormField>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-navy mb-4">Local Police / Sheriff</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField label="Name">
                  <input className="input-field" value={form.localPolice?.name || ''} onChange={e => setField('localPolice.name', e.target.value)} />
                </FormField>
                <FormField label="Email">
                  <input type="email" className="input-field" value={form.localPolice?.email || ''} onChange={e => setField('localPolice.email', e.target.value)} />
                </FormField>
                <FormField label="Phone">
                  <input className="input-field" value={form.localPolice?.phone || ''} onChange={e => setField('localPolice.phone', e.target.value)} />
                </FormField>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-navy mb-4">Timeline</h3>
              {form.timeline?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 mb-2 bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-xs text-gray-500 w-28 flex-shrink-0">{item.date}</span>
                  <span className="text-sm text-navy flex-1">{item.event}</span>
                  <button type="button" onClick={() => removeTimeline(i)} className="text-red-400 hover:text-red-600 text-xs">Remove</button>
                </div>
              ))}
              <div className="flex gap-2 mt-3">
                <input
                  type="date"
                  value={timelineInput.date}
                  onChange={e => setTimelineInput(p => ({ ...p, date: e.target.value }))}
                  className="input-field max-w-[160px]"
                />
                <input
                  placeholder="Event description"
                  value={timelineInput.event}
                  onChange={e => setTimelineInput(p => ({ ...p, event: e.target.value }))}
                  className="input-field flex-1"
                />
                <button type="button" onClick={addTimeline} className="btn-outline whitespace-nowrap">
                  Add
                </button>
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
                {editId ? 'Save Changes' : 'Create Case'}
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
