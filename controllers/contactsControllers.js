import {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import catchAsync from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await getAll();
  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const result = await getContactById(req.params.id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
});

export const deleteContact = catchAsync(async (req, res) => {
  const result = await removeContact(req.params.id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
  return;
});

export const createContact = catchAsync(async (req, res) => {
  const constact = await addContact(req.body);
  res.status(201).json(constact);
});

export const updateContactById = catchAsync(async (req, res) => {
  const keys = Object.keys(req.body);
  if (keys.length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }

  const result = await updateContact(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  return res.status(200).json(result);
});

export const updateFavorite = catchAsync(async (req, res) => {
  const result = await updateStatusContact(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
});