import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import "./Admin.css";
const Admindashbord = () => {
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    mobileNum: "",
    pass: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, role, mobileNum, pass, confirmPass } = formData;
      const response = await axios.post("http://localhost:5000/staff", {
        name,
        email,
        role,
        mobileNum,
        pass,
        confirmPass,
      });
      console.log(response.data);
      setFormData({
        name: "",
        email: "",
        role: "",
        mobileNum: "",
        pass: "",
        confirmPass: "",
      });
      fetchStaff(); // Refresh staff data after submission
    } catch (error) {
      console.error("Error creating staff:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/staff/${id}`);
      const staffMember = response.data;
      setEditModalData(staffMember);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Error fetching staff member data:", error);
    }
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/staff/${updatedData._id}`,
        updatedData
      );
      setEditModalOpen(false);
      const updatedStaffList = staff.map((staffMember) =>
        staffMember._id === updatedData._id ? updatedData : staffMember
      );
      setStaff(updatedStaffList);
    } catch (error) {
      console.error("Error updating staff:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      const updatedStaff = staff.filter(
        (staffMember) => staffMember._id !== id
      );
      setStaff(updatedStaff);
      console.log(`Staff with ID ${id} deleted`);
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/staff");
      setStaff(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStaff();
  }, []);

  const handleDownloadUsersCSV = () => {
    const csvData = users.map((user) => ({
      "First Name": user.firstName,
      "Last Name": user.lastName,
      Email: user.email,
      "Mobile Number": user.mobileNumber,
    }));

    const headers = [
      { label: "First Name", key: "First Name" },
      { label: "Last Name", key: "Last Name" },
      { label: "Email", key: "Email" },
      { label: "Mobile Number", key: "Mobile Number" },
    ];

    return (
      <CSVLink data={csvData} headers={headers} filename={"users_data.csv"}>
        Download Users CSV
      </CSVLink>
    );
  };

  const handleDownloadStaffCSV = () => {
    const csvData = staff.map((staffMember) => ({
      Name: staffMember.name,
      Email: staffMember.email,
      Role: staffMember.role,
      "Mobile Number": staffMember.mobileNum,
    }));

    const headers = [
      { label: "Name", key: "Name" },
      { label: "Email", key: "Email" },
      { label: "Role", key: "Role" },
      { label: "Mobile Number", key: "Mobile Number" },
    ];

    return (
      <CSVLink data={csvData} headers={headers} filename={"staff_data.csv"}>
        Download Staff CSV
      </CSVLink>
    );
  };

  return (
    <div>
      <div>
        <h2>User Table</h2>
        {handleDownloadUsersCSV()} {/* Download CSV button for Users */}
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Staff Table</h2>
        {handleDownloadStaffCSV()} {/* Download CSV button for Staff */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Mobile Number</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember._id}>
                <td>{staffMember.name}</td>
                <td>{staffMember.email}</td>
                <td>{staffMember.role}</td>
                <td>{staffMember.mobileNum}</td>
                <td>
                  <button onClick={() => handleEdit(staffMember._id)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(staffMember._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit modal */}
        {editModalOpen && editModalData && (
          <div className="modal">
            <h2>Edit Staff Member</h2>
            <input
              type="text"
              value={editModalData.name}
              onChange={(e) =>
                setEditModalData({ ...editModalData, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={editModalData.email}
              onChange={(e) =>
                setEditModalData({ ...editModalData, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="text"
              value={editModalData.mobileNum}
              onChange={(e) =>
                setEditModalData({
                  ...editModalData,
                  mobileNum: e.target.value,
                })
              }
              placeholder="Mobile Number"
            />
            {/* Other input fields */}
            <button onClick={() => handleEditSubmit(editModalData)}>
              Save Changes
            </button>
            <button onClick={() => setEditModalOpen(false)}>Cancel</button>
          </div>
        )}
      </div>
      <h2 className="form-heading">Create New Staff</h2>
      <form onSubmit={handleSubmit} className="staff-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="form-input"
        />
        <input
          type="text"
          name="mobileNum"
          value={formData.mobileNum}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="form-input"
        />
        <input
          type="password"
          name="pass"
          value={formData.pass}
          onChange={handleChange}
          placeholder="Password"
          className="form-input"
        />
        <input
          type="password"
          name="confirmPass"
          value={formData.confirmPass}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="form-input"
        />
        <button type="submit" className="form-button">
          Create Staff
        </button>
      </form>
    </div>
  );
};

export default Admindashbord;
