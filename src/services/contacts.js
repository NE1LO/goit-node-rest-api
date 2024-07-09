import Contact from "../models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/index.js";
import { parseIsFavourite } from "../utils/parseFilterParams.js";

//#=================================================> GET ALL CONTACTS
export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = "name",
  sortOrder = SORT_ORDER.ASC,
  filter = {}
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  let contactsQuery = Contact.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  if (filter.isFavourite !== undefined) {
    const parsedIsFavourite = parseIsFavourite(filter.isFavourite);
    if (parsedIsFavourite !== undefined) {
      contactsQuery = contactsQuery
        .where("isFavourite")
        .equals(parseIsFavourite);
    }
  }
  const contactsCount = await Contact.countDocuments();
  const contacts = await contactsQuery.exec();
  const paginationData = calculatePaginationData(contactsCount, limit, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

//#=================================================> GET CONTACT BY ID
export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

//#=================================================> CREATE NEW CONTACT
export const createContact = async (payload) => {
  return await Contact.create(payload);
};

//#=================================================> DELETE CONTACT
export const deleteContact = async (contactId) => {
  return await Contact.findOneAndDelete({
    _id: contactId,
  });
};

//#=================================================> UPDATE CONTACT BY ID
export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
