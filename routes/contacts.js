const express = require('express')
const ctrl = require("../controllers/contactsControllers");
const contactSchema = require("../schemas/contactsSchema");
const validationBody = require("../decoration/validationBody");
const validationId = require("../middlewares/validationId");
const updateNameSchema = require("../schemas/updateNameSchema");
const authenticate = require("../middlewares/authenticate");

const router = express.Router()

router.get('/', authenticate, ctrl.getContactsController );

router.post('/', authenticate, validationBody(contactSchema), ctrl.addContactController);

router.delete('/:contactId', authenticate, validationId, ctrl.deleteContactController )

router.get('/:contactId', validationId, ctrl.getContactControllerById );

router.put('/:contactId', ctrl.updateContactController);

router.patch('/:contactId/contactName', validationBody(updateNameSchema), ctrl.patchContactNameController );

module.exports = router
