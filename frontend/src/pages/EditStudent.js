import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getStudentById, updateStudent } from "../services/studentService"; // ✅ Use service
import "./Form.css";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    department: ""
  });

  useEffect(() => {
  const fetchStudent = async () => {
    try {
      const response = await getStudentById(id);
      const { name, rollNumber, department } = response.data;
      setForm({ name, rollNumber, department });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch student");
    }
  };
  fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNumber || !form.department) {
      toast.warning("All fields are required");
      return;
    }
    try {
      await updateStudent(id, form);
      toast.success("Student updated!");
      navigate("/");
    }catch (error) {
      console.error('Update Error:', error.response ? error.response.data : error.message);
      toast.error("Failed to update student");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Enter Roll Number"
          value={form.rollNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Enter Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditStudent;
