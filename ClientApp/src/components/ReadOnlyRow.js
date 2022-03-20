import React from "react";

const ReadOnlyRow = ({contact}) => {
  return (
    <tr>
        <td>{contact.id}</td>
        <td>{contact.VendorCompany}</td>
        <td>{contact.GSTNo}</td>
        <td>{contact.phoneNumber}</td>
        <td>{contact.email}</td>
        <td>
        <button type="button">
            <img src="https://img.icons8.com/ios/20/000000/edit--v1.png" alt="edit"/>
        </button>
        <button type="button">
            <img src="https://img.icons8.com/plasticine/20/000000/filled-trash.png" alt="delete"/>
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;