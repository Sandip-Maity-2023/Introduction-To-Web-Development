//import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect } from "react";
import {v4 as uuid} from "uuid";
import Header from "./header";
import AddContact from "./add_contact";
import ContactList from "./contact_list";
// import ContactCard from "./contact_card";



function App(){

  const LOCAL_STORAGE_KEY="contacts";
  const [contacts,setContacts]=useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  const addContactHandler=(contact)=>{
    console.log(contact);
    setContacts([...contacts,{id:uuid(),...contact}]);
  };

  const removeContactHandler=(id)=>{
    const newContactList=contacts.filter((contact)=>{
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
  },[contacts]);

  return(
    <div className="ui container">
      <Header/>
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/>
      </div>
  );
}
export default App;