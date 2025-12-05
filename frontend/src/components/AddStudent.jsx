import React, { useState } from 'react';
import API from '../api';


export default function AddStudent() {
const [form, setForm] = useState({ name: '', email: '', age: '', course: '' });
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');


const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });


const handleSubmit = async e => {
e.preventDefault();
setLoading(true);
setMessage('');
try {
await API.post('/students', {
name: form.name,
email: form.email,
age: Number(form.age) || undefined,
course: form.course
});
setMessage('Student added successfully');
setForm({ name: '', email: '', age: '', course: '' });
// Emit custom event so StudentList can refresh
window.dispatchEvent(new Event('studentListUpdated'));
} catch (err) {
setMessage(err?.response?.data?.message || 'Error adding student');
} finally {
setLoading(false);
}
};


return (
<div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 8, marginBottom: 20, backgroundColor: '#f9f9f9' }}>
<h3 style={{ marginTop: 0, color: '#333' }}>Add Student</h3>
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
    fontWeight: 'bold'
  }}
>
  {loading ? 'Saving...' : 'Add Student'}
</button>
</div>
{message && (
  <div style={{ 
    padding: '10px', 
    borderRadius: '4px', 
    backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
    color: message.includes('success') ? '#155724' : '#721c24',
    border: `1px solid ${message.includes('success') ? '#c3e6cb' : '#f5c6cb'}`
  }}>
    {message}
  </div>
)}
</div>
</form>
</div>
);
}