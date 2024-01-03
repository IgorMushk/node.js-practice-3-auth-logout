const Contact = require("../db/models/contactModel");

const getContacts = async () => {
   const contacts = await Contact.find();
   return contacts;
}

const addContact = async (data) => {
    const newContact = await Contact.create({...data});
    return newContact;
}

const deleteContact = async (contactId) => {
    const result = await Contact.findByIdAndDelete(contactId);
    return result;
}

// ++++
const getContactById = async (contactId) => {
    const result = await Contact.findById(contactId);
    return result;
}

const updateContact = async (contactId, data) => {
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return null;
    }
    const updateContact = await Contact.findByIdAndUpdate(contactId, data, {returnOriginal: false})
    return updateContact;
}

const patchContactName = async (contactId, data) => {
    const contact = await Contact.findById(contactId);
    if (!contact) {
        return null;
    }
    const updateContact = await Contact.findByIdAndUpdate(contactId, data, {returnOriginal: false})
    return updateContact;
}

module.exports = {
    getContacts,
    addContact,
    deleteContact,
    getContactById,
    updateContact,
    patchContactName,
}