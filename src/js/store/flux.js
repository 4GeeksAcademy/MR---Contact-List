const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            contacts: [],
            users: []
        },
        actions: {
            createUser: (slug) => {
                fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert('Error al crear el usuario.');
                        throw new Error('Error al crear el usuario');
                    }
                })
                .then(data => {
                    const store = getStore();
                    setStore({ users: [...store.users, data] }); 
                })
                .catch(error => {
                    console.error('Error creando el usuario:', error);
                });
            },
            addContact: (newContact) => {
                fetch("https://playground.4geeks.com/contact/agendas/mica/contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newContact)
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Contacto creado con éxito");
                    }
                });
            },
            fetchUsers: () => {
                fetch("https://playground.4geeks.com/contact/agendas")
                    .then(response => response.json())
                    .then(data => {
                        if (data.agendas) {
                            setStore({ users: data.agendas });
                        }
                    })
                    .catch(error => console.error('Error al obtener usuarios:', error));
            },
            fetchContacts: (user) => {
                if (!user) return;
                const apiURL = `https://playground.4geeks.com/contact/agendas/${user}`;
                fetch(apiURL)
                    .then(response => response.json())
                    .then(data => {
                        if (data.contacts && data.contacts.length > 0) {
                            setStore({ contacts: data.contacts });
                        } else {
                            setStore({ contacts: [] });
                        }
                    })
                    .catch(error => console.error('Error al obtener contactos:', error));
            },
            deleteContact: (contactId, user) => {
                const apiURL = `https://playground.4geeks.com/contact/agendas/${user}`;
                fetch(`${apiURL}/contacts/${contactId}`, {
                  method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);
                        setStore({ contacts: updatedContacts });
                    } else {
                        alert('Error al eliminar el contacto.');
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar el contacto:', error);
                    alert('Error al eliminar el contacto.');
                });
            },
            updateContact: (contactId, updatedContact) => {
                fetch(`https://playground.4geeks.com/contact/agendas/mica/contacts/${contactId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedContact)
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Contacto actualizado con éxito");
                    } else {
                        alert('Error al actualizar el contacto.');
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar el contacto:', error);
                    alert('Error al actualizar el contacto.');
                });
            }
        }
    };
};

export default getState;