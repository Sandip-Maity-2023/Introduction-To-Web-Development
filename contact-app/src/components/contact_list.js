import React from "react";
import ContactCard from "./contact_card";

const ContactList = (props) => {
    console.log(props);

    const deleteContactHandler=(id)=>{
        props.getContactId(id);
    };
    const renderContactList=props.contacts.map((contact)=>{

    return (
        <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
        />
    );
});
return <div className="ui celled list">{renderContactList}</div>;
};
export default ContactList;