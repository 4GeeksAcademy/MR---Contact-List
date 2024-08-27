import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { store, actions } = useContext(Context);
    const { contactId } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const contact = store.contacts.find(c => c.id === parseInt(contactId));
        if (contact) {
            setName(contact.name || "");
            setEmail(contact.email || "");
            setPhone(contact.phone || "");
            setAddress(contact.address || "");
        } else {
            alert('Contacto no encontrado.');
        }
    }, [store.contacts, contactId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedContact = {
            name,
            email,
            phone,
            address
        };

        actions.updateContact(contactId, updatedContact);
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="address" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="d-grid gap-1">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <a className="nav-link active" aria-current="page" href="/">Click aquí para regresar a contactos</a>
                </div>
            </form>
        </div>
    );
};
