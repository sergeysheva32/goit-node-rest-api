const Joi = require("joi");
const Contact = require("../models/contact");

const { HttpError } = require("../helpers");
const {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.status(200).json({ code: 200, quantity: result.length, data: result });
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json({ code: 201, data: result });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0 || req.body.favorite === undefined) {
      throw HttpError(400, "Set the 'favorite' status");
    }

    const { error } = updateStatusSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const status = req.body.favorite;

    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite: status },
      { new: true }
    );
    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json({ code: 200, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};