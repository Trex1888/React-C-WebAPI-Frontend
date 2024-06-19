const EditRow = ({
  formData,
  handleFormChange,
  handleCancelClick,
  handleEditFormSubmit,
  contact,
}) => {
  return (
    <tr>
      <td data-label="#">{contact.id}</td>
      <td data-label="Name">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.edit.name}
          onChange={(e) => handleFormChange(e, "edit")}
          required
        />
      </td>
      <td data-label="Age">
        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.edit.age}
          onChange={(e) => handleFormChange(e, "edit")}
          required
        />
      </td>
      <td data-label="Email">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.edit.email}
          onChange={(e) => handleFormChange(e, "edit")}
          required
        />
      </td>
      <td data-label="Actions">
        <button type="button" className="edit" onClick={handleEditFormSubmit}>
          Save
        </button>
        <button type="button" className="delete" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditRow;
