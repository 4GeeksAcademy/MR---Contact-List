import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AddUser = () => {
    const { actions, store } = useContext(Context);
    const [slug, setSlug] = useState("");  
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchUsers(); 
    }, [actions]);

    const handleChange = (e) => {
        setSlug(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actions.createUser(slug); 
            Swal.fire({
                title: 'Usuario Agregado',
                text: 'El usuario se ha agregado con éxito.',
                icon: 'success',
                confirmButtonText: 'Ir a usuarios',
                confirmButtonColor: '#3085d6',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#d33',
            });
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al agregar el usuario.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Nombre del Usuario</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="slug" 
                        name="slug"
                        value={slug}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-grid gap-1">
                    <button type="submit" className="btn btn-primary">Agregar Usuario</button>
                </div>
            </form>
            <h3 className="mt-4">Lista de Usuarios</h3>
            <ul className="list-group">
                {store.users.map((user, index) => (
                    <li key={index} className="list-group-item">
                        {user.slug} 
                    </li>
                ))}
            </ul>
        </div>
    );
};
