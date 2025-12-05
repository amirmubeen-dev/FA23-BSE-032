import React, { useState } from 'react';
import API from '../api';


export default function EditStudent({ student, onClose, onUpdated }) {
const [form, setForm] = useState({ name: student.name || '', email: student.email || '', age: student.age || '', course: student.course || '' });
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');


const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async e => {
e.preventDefault();
setLoading(true);
try {
await API.put(`/students/${student._id}`, {
name: form.name,
email: form.email,
age: Number(form.age) || undefined,
course: form.course
});
setMessage('Updated successfully');
// notify parent list to refresh
window.dispatchEvent(new Event('studentListUpdated'));
onUpdated?.();
} catch (err) {
setMessage(err?.response?.data?.message || 'Update failed');
} finally {
setLoading(false);
}
};


return (
<div style={{ border: '2px solid #2196F3', padding: 20, borderRadius: 8, backgroundColor: '#e3f2fd' }}>
<h4 style={{ marginTop: 0, color: '#1976D2' }}>Edit Student</h4>
<form onSubmit={handleSubmit}>
<div style={{ display: 'grid', gap: 12 }}>
<input 
  name="name" 
  placeholder="Name" 
  value={form.name} 
  onChange={handleChange} 
  required 
  style={{ padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
/>
<input 
  name="email" 
  type="email"
  placeholder="Email" 
  value={form.email} 
  onChange={handleChange} 
  required 
  style={{ padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
/>
<input 
  name="age" 
  type="number"
  placeholder="Age" 
  value={form.age} 
  onChange={handleChange} 
  style={{ padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
/>
<input 
  name="course" 
  placeholder="Course" 
  value={form.course} 
  onChange={handleChange} 
  style={{ padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
/>
<div>
<button 
  type="submit" 
  disabled={loading}
  style={{
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    marginRight: '8px'
  }}
>
  {loading ? 'Saving...' : 'Save Changes'}
</button>
<button 
  type="button" 
  onClick={onClose}
  style={{
    padding: '10px 20px',
    backgroundColor: '#757575',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  }}
>
  Close
</button>
</div>
{message && (
  <div style={{ 
    padding: '10px', 
    borderRadius: '4px', 
    backgroundColor: message.includes('success') || message.includes('Updated') ? '#d4edda' : '#f8d7da',
    color: message.includes('success') || message.includes('Updated') ? '#155724' : '#721c24',
    border: `1px solid ${message.includes('success') || message.includes('Updated') ? '#c3e6cb' : '#f5c6cb'}`
  }}>
    {message}
  </div>
)}
</div>
</form>
</div>
);
}