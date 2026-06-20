import React, { useState, useEffect } from 'react';

function EmployeeModal({ employee, onSave, onClose }) {
  const [form, setForm] = useState({ name: '', designation: '', salary: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        designation: employee.designation,
        salary: employee.salary
      });
    }
  }, [employee]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Employee name is required';
    if (!form.designation.trim()) errs.designation = 'Designation is required';
    if (!form.salary || Number(form.salary) <= 0)
      errs.salary = 'Salary must be a positive number';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave({ name: form.name.trim(), designation: form.designation.trim(), salary: Number(form.salary) });
  };

  return (
    <div
      className="modal show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              {employee ? 'Edit Employee' : 'Add Employee'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter employee name"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  name="designation"
                  className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                />
                {errors.designation && (
                  <div className="invalid-feedback">{errors.designation}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  className={`form-control ${errors.salary ? 'is-invalid' : ''}`}
                  value={form.salary}
                  onChange={handleChange}
                  placeholder="Enter salary"
                  min="0"
                  step="0.01"
                />
                {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {employee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;
