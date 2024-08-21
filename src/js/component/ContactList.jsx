import React, { useState, useEffect } from 'react';
import img from "../../img/img.png";

export const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const apiURL = 'https://playground.4geeks.com/contact/agendas/brr';

  useEffect(() => {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        if (data.contacts && data.contacts.length > 0) {
          setContacts(data.contacts);
        } else {
          alert(`Usuario no encontrado en la API: ${apiURL}`);
        }
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        alert(`Error al buscar en la API: ${apiURL}`);
      });
  }, [apiURL]);

  const handleDelete = (contactId) => {
    fetch(`${apiURL}/contacts/${contactId}`, {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        setContacts(contacts.filter(contact => contact.id !== contactId));
      }
    })
    .catch(error => console.error('Error deleting contact:', error));
  };

  return (
    <div className="container mt-4">
      {contacts.map(contact => (
        <div key={contact.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img id="card" src={img} className="img-fluid p-3" alt="Contact" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <div className="d-flex flex-column align-items-start">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    <p className="card-text mb-0">{contact.address}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-phone me-2"></i>
                    <p className="card-text mb-0">{contact.phone}</p>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa-solid fa-envelope me-2"></i>
                    <p className="card-text mb-0">{contact.email}</p>
                  </div>
                </div>
                <div className="position-absolute top-0 end-0 p-3">
                  <i className="fa-solid fa-pencil me-2"></i>
                  <i 
                    className="fa-solid fa-trash"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(contact.id)}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
