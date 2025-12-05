import React, { useEffect, useState } from 'react';
import API from '../api';
import EditStudent from './EditStudent';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await API.get('/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const handler = () => fetchStudents();
    window.addEventListener('studentListUpdated', handler);
    return () => window.removeEventListener('studentListUpdated', handler);
  }, []);

  const handleEditClick = (student) => {
    setSelected(student);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure you want to delete this student?');
    if (!ok) return;
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: 20, borderRadius: 8, backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Student List</h3>
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table width="100%" style={{ borderCollapse: 'collapse', backgroundColor: 'white' }}>
            <thead>
              <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Age</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Course</th>
                <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '20px', border: '1px solid #ddd' }}>
                    No students found
                  </td>
                </tr>
              )}
              {students.map(s => (
                <tr key={s._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontSize: '12px' }}>{s._id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{s.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{s.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{s.age || '-'}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{s.course || '-'}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <button 
                      onClick={() => handleEditClick(s)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '8px',
                        fontSize: '12px'
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(s._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div style={{ marginTop: 20 }}>
          <EditStudent student={selected} onClose={() => setSelected(null)} onUpdated={() => { setSelected(null); fetchStudents(); }} />
        </div>
      )}
    </div>
  );
}

