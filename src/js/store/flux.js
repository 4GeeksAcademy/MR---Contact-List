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
            contacts: []
        },
        actions: {
            addContact: (newContact) => {
                fetch("https://playground.4geeks.com/contact/agendas/brr/contacts", {
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
            
            fetchContacts: () => {
                const apiURL = 'https://playground.4geeks.com/contact/agendas/brr';
                fetch(apiURL)
                    .then(response => response.json())
                    .then(data => {
                        if (data.contacts && data.contacts.length > 0) {
                            setStore({ contacts: data.contacts });
                        } else {
                            alert(`Usuario no encontrado en la API: ${apiURL}`);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching contacts:', error);
                        alert(`Error al buscar en la API: ${apiURL}`);
                    });
            },
            
            deleteContact: (contactId) => {
                const apiURL = 'https://playground.4geeks.com/contact/agendas/brr';
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
                    console.error('Error deleting contact:', error);
                    alert('Error al eliminar el contacto.');
                });
            },
            
            updateContact: (contactId, updatedContact) => {
                fetch(`https://playground.4geeks.com/contact/agendas/brr/contacts/${contactId}`, {
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
                    console.error('Error updating contact:', error);
                    alert('Error al actualizar el contacto.');
                });
            }
        }
    };
};

export default getState;
