import React, { useEffect, useState } from "react";
import axios from "axios";
import ReadRow from "./Components/ReadRow";
import EditRow from "./Components/EditRow";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    add: {
      name: "",
      age: "",
      email: "",
    },
    edit: {
      id: null,
      name: "",
      age: "",
      email: "",
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7147/api/Contact`)
      .then((result) => {
        setContacts(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormChange = (e, formType) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [formType]: {
        ...prevFormData[formType],
        [name]: value,
      },
    }));
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    const url = `https://localhost:7147/api/Contact`;
    const newContact = {
      name: formData.add.name,
      age: parseInt(formData.add.age, 10),
      email: formData.add.email,
    };

    axios
      .post(url, newContact)
      .then((result) => {
        console.log(result.data);
        getData();
        setFormData((prevFormData) => ({
          ...prevFormData,
          add: {
            name: "",
            age: "",
            email: "",
          },
        }));
      })
      .catch((error) => {
        console.error("There was an error adding the contact!", error);
      });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const url = `https://localhost:7147/api/Contact/${formData.edit.id}`;
    const updatedContact = {
      id: formData.edit.id,
      name: formData.edit.name,
      age: parseInt(formData.edit.age, 10),
      email: formData.edit.email,
    };

    console.log("URL:", url);
    console.log(
      "Sending updated contact data:",
      JSON.stringify(updatedContact)
    );

    axios
      .put(url, updatedContact)
      .then((result) => {
        console.log("Response from server:", result.data);
        getData();
        setFormData((prevFormData) => ({
          ...prevFormData,
          edit: {
            id: null,
            name: "",
            age: "",
            email: "",
          },
        }));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("There was an error updating the contact!", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
      });
  };

  const handleEditClick = (contact) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      edit: {
        id: contact.id,
        name: contact.name,
        age: contact.age.toString(),
        email: contact.email,
      },
    }));
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    const url = `https://localhost:7147/api/Contact/${id}`;
    if (window.confirm("Are you sure you want to delete this contact?")) {
      axios
        .delete(url)
        .then((result) => {
          console.log("Deleted Contact ID:", id);
          getData();
        })
        .catch((error) => {
          console.error("There was an error deleting the contact!", error);
        });
    }
  };

  const handleCancelClick = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      edit: {
        id: null,
        name: "",
        age: "",
        email: "",
      },
    }));
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h2>Contact List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) =>
            contact.id === formData.edit.id && isEditing ? (
              <EditRow
                key={contact.id}
                formData={formData}
                handleFormChange={handleFormChange}
                handleCancelClick={handleCancelClick}
                handleEditFormSubmit={handleEditFormSubmit}
                contact={contact}
              />
            ) : (
              <ReadRow
                key={contact.id}
                contact={contact}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            )
          )}
        </tbody>
      </table>

      <h2>Add New Contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.add.name}
          onChange={(e) => handleFormChange(e, "add")}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.add.age}
          onChange={(e) => handleFormChange(e, "add")}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.add.email}
          onChange={(e) => handleFormChange(e, "add")}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
