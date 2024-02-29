import { Contact } from "../models/contactModel.js";

export const getAll = async () => {
  const response = await Contact.find();
  return response;
};

export const getContactById = async (contactId) => {
  const response = await Contact.findById(contactId);
  return response;
};

export const addContact = async (data) => {
  const response = await Contact.create({ ...data });
  return response;
};

export const removeContact = async (contactId) => {
  const response = await Contact.findByIdAndDelete(contactId);
  return response;
};

export const updateContact = async (contactId, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  return updatedContact;
};

export const updateStatusContact = async (contactId, body) => {
  const response = await Contact.findByIdAndUpdate(contactId, body);
  return response;
};