const Contact = require("../db/models/contactModel");

const getContacts = async (owner) => {
   const contacts = await Contact.find({ owner });
   return contacts;
}

const addContact = async (data, owner) => {
    const newContact = await Contact.create({...data, owner});
    return newContact;
}

const deleteContact = async (contactId, owner) => {
    const result = await Contact.findOneAndDelete({_id: contactId, owner});
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