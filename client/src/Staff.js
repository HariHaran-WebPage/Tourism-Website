import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const StaffForm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

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

  return (
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
  );
};

export default StaffForm;
