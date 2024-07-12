import Contact from "../models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
import { parseIsFavourite } from "../utils/parseFilterParams.js";

//#=================================================> GET ALL CONTACTS
export const getAllContacts = async (
  userId,
  page = 1,
  perPage = 10,
  sortBy = "name",
  sortOrder = SORT_ORDER.ASC,
  filter = {}
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  let contactsQuery = Contact.find({ userId })
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  if (filter.isFavourite !== undefined) {
    const parsedIsFavourite = parseIsFavourite(filter.isFavourite);
    if (parsedIsFavourite !== undefined) {
      contactsQuery = contactsQuery
        .where("isFavourite")
        .equals(parsedIsFavourite);
    }
  }

  const contactsCount = await Contact.countDocuments({ userId });
  const contacts = await contactsQuery.exec();
  const paginationData = calculatePaginationData(contactsCount, limit, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

//#=================================================> GET CONTACT BY ID
export const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, userId });
};

//#=================================================> CREATE NEW CONTACT
export const createContact = async (payload) => {
  return await Contact.create(payload);
};

//#=================================================> DELETE CONTACT
export const deleteContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
};

//#=================================================> UPDATE CONTACT BY ID
export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {}
) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    }
  );

  return rawResult;
};
