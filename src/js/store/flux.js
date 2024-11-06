const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      getContacts: () => {
        fetch(
          "https://playground.4geeks.com/contact/agendas/taylor-allen/contacts"
        )
          .then((resp) => {
            if (!resp.ok) throw Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            console.log(data);

            // Set the retrieved contacts data in the store
            setStore({ contacts: data.contacts });
          })
          .catch((error) => {
            console.log(error);
          });
      },

      addContacts: (contact) => {
        const url =
          "https://playground.4geeks.com/contact/agendas/taylor-allen/contacts";

        // Prepare payload according to the expected schema
        const contactPayload = {
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address,
        };

        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactPayload),
        };

        fetch(url, request)
          .then((resp) => {
            if (!resp.ok) throw Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            console.log("Contact added:", data);
            getActions().getContacts(); // Refresh contacts after adding
          })
          .catch((error) => {
            console.error("Error adding contact:", error);
          });
      },

      deleteContacts: (id) => {
        const url = `https://playground.4geeks.com/contact/agendas/taylor-allen/contacts/${id}`;
        const request = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(url, request)
          .then((resp) => {
            if (!resp.ok) throw Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            console.log(data);
            getActions().getContacts();
          })
          .catch((error) => {
            console.log(error);
          });
      },

      editContact: (id, contactData) => {
        fetch(
          `https://playground.4geeks.com/contact/agendas/taylor-allen/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
          }
        )
          .then((resp) => {
            if (!resp.ok) throw Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            console.log(data);
            getActions().getContacts();
          })
          .catch((error) => {
            console.error("Error", error);
          });
      },
    },
  };
};

export default getState;
