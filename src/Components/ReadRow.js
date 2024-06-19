function ReadRow({ contact, handleEditClick, handleDeleteClick }) {
  return (
    <tr>
      <td data-label="#">{contact.id}</td>
      <td data-label="Name">{contact.name}</td>
      <td data-label="Age">{contact.age}</td>
      <td data-label="Email">{contact.email}</td>
      <td data-label="Actions">
        <button
          type="button"
          className="edit"
          data-testid={`editBtn${contact.id}`}
          onClick={() => handleEditClick(contact)}
        >
          Edit
        </button>
        <button
          type="button"
          className="delete"
          data-testid={`deleteBtn${contact.id}`}
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReadRow;
