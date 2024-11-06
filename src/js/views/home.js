import React, { useContext, useEffect } from "react";
import "../../styles/home.css";
import { ContactCard } from "../component/ContactCard";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const createAgenda = async () => {
      let response = await fetch(
        "https://playground.4geeks.com/contact/agendas/taylor-allen",
        {
          method: "GET",
        }
      );

      let data = await response.json();
      if (data.detail == 'Agenda "taylor-allen" doesn\'t exist.') {
        console.log("no slug");
        let response = await fetch(
          "https://playground.4geeks.com/contact/agendas/taylor-allen",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    };
    createAgenda();
    actions.getContacts();
  }, []);

  return (
    <div className="text-center mt-4">
      <div className="card-container">
        <div className="row">
          {store.contacts?.map((contact, index) => (
            <ContactCard
              key={index}
              contact={contact}
              className="contact-card col-xl-4 col-sm-6 mb-3"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
