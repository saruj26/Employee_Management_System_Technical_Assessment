import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeModal from './components/EmployeeModal';

const API_URL = `${(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')}/api/employees`;

function App() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    setEditEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setShowModal(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteId}`);
      setDeleteId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (editEmployee) {
        await axios.put(`${API_URL}/${editEmployee._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to save employee:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="bg-dark text-white text-center py-3">
        <span className="fw-bold fs-4">Teceze</span>
      </header>

      <div className="container mt-4" style={{ flex: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Employee Management System</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Employee
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Employee No</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Salary</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">Loading...</td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No employees found. Click "+ Add Employee" to get started.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employeeNo}</td>
                  <td>{emp.name}</td>
                  <td>{emp.designation}</td>
                  <td>Rs {emp.salary.toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <EmployeeModal
          employee={editEmployee}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {deleteId && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center py-4">
                <div className="mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#dc3545" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                  </svg>
                </div>
                <p className="fw-semibold mb-1">Delete Employee?</p>
                <p className="text-muted small mb-3">This action cannot be undone.</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-sm btn-secondary" onClick={() => setDeleteId(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2026 Teceze. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
