const services = require("../services/contactsServices");

const getContactsController = async (req, res) => {
    const result = await services.getContacts();
    res.status(200).json(result);
};

const addContactController = async (req, res) =>  {
    const result = await services.addContact(req.body);
    res.status(201).json(result);
};

const deleteContactController = async (req, res) =>  {
    const {contactId} = req.params;
    const result = await services.deleteContact(contactId);
    if (!result) {
       res.status(404).json({message: `There is no such user contact with id ${contactId}`});
       return;
    }
    res.status(200).json({message: "The contact was successfully deleted."});
};

// +++++
const getContactControllerById = async (req, res) => {
    const {contactId} = req.params;
    const result = await services.getContactById(contactId);
    if (!result) {
        res.status(404).json({message: `There is no such user contact with id ${contactId}`});
        return;
     }
     res.status(200).json(result);
}

const updateContactController = async(req, res) =>{
    const {contactId} = req.params;
    const {body} = req;
    const contact = await services.updateContact(contactId, body);
    if (!contact) {
        res.status(404).json({message: `There is no such user contact with id ${contactId}`});
        return;
    }
    res.status(200).json({message: "Successfully updated an contact", contact})
}

const patchContactNameController = async(req, res) =>{
    const {contactId} = req.params;
    const {body} = req;
    const contact = await services.patchContactName(contactId, body);
    if (!contact) {
        res.status(404).json({message: `There is no such user contact with id ${contactId}`});
        return;
    }
    res.status(200).json({message: "Successfully patch the name in contact", contact})
}

module.exports = {
    getContactsController,
    addContactController,
    deleteContactController,
    getContactControllerById,
    updateContactController,
    patchContactNameController,
}