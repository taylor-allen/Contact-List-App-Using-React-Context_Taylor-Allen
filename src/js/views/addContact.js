import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddContact = () => {
  const { actions, store } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.addContacts(contact);
      await actions.getContacts();
      navigate("/");
    } catch (error) {
      console.error("Error adding contact", error);
    }
  };

  return (
    <div className="contact-card-container mt-0">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) =>
              setContact((prevContact) => ({
                ...prevContact,
                name: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) =>
              setContact((prevContact) => ({
                ...prevContact,
                email: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={(e) =>
              setContact((prevContact) => ({
                ...prevContact,
                address: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            onChange={(e) =>
              setContact((prevContact) => ({
                ...prevContact,
                phone: e.target.value,
              }))
            }
            required
          />
        </div>

        {/* if contact.id doesn't exist, Add Contact button and vice versa*/}
        <button type="submit">
          {contact.id ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};
