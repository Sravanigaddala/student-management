import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getStudents, deleteStudent } from "../services/studentService"; // ✅ use service
import "./Home.css";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((s) => s._id !== id));
        toast.success("Student deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error deleting student");
      }
    }
  };

  return (
    <div>
      {/* Navbar added */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Student Manager</Link>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/add">Add Student</Link>
        </div>
      </nav>

      <div className="dashboard">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>
          <div className="card">
            <h3>Departments</h3>
            <p>{[...new Set(students.map(s => s.department))].length}</p>
          </div>
          <div className="card">
            <h3>Actions</h3>
            <Link to="/add"><button>Add Student</button></Link>
          </div>
        </div>

        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu._id}>
                <td>{stu.name}</td>
                <td>{stu.rollNumber}</td>
                <td>{stu.department}</td>
                <td>
                  <Link to={`/edit/${stu._id}`}><button>Edit</button></Link>
                  <button onClick={() => handleDelete(stu._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
