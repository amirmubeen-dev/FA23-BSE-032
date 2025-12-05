import React from 'react';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';


export default function App() {
return (
<div style={{ maxWidth: 1200, margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' }}>
<h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Student Management System</h1>
<AddStudent />
<StudentList />
</div>
);
}