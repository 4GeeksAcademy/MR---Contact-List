import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
import img from "../../img/img.png";
import Swal from 'sweetalert2';

export const ContactList = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
      actions.fetchContacts();
  }, [actions]);

  const handleDelete = (contactId) => {
      Swal.fire({
          title: '¿Estás seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              actions.deleteContact(contactId);
              Swal.fire(
                  'Eliminado!',
                  'El contacto ha sido eliminado.',
                  'success'
              );
          }
      });
  };

  return (
        <div className="container mt-4">
            {store.contacts && store.contacts.length > 0 ? (
                store.contacts.map(contact => (
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
                                        <Link to={`/editContact/${contact.id}`}>
                                            <i className="fa-solid fa-pencil me-2" style={{ cursor: "pointer" }}></i>
                                        </Link>
                                        <i 
                                            className="fa-solid fa-trash"
                                            style={{ cursor: "pointer", color: "red" }}
                                            onClick={() => handleDelete(contact.id)}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No contacts available.</p>
            )}
        </div>
    );
};
