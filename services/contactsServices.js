import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.join("db", "contacts.json");
const writeContacts = (contacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function getAllContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    console.error("Помилка при читанні файлу", error);
  }
}

async function getOneContact(contactId) {
  try {
    const contacts = await getAllContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (typeof contact === "undefined") {
      return null;
    }
    return contact;
  } catch (error) {
    console.error("Помилка при читанні контакту по id", error);
  }
}

async function deleteContact(contactId) {
  try {
    const contacts = await getAllContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const removedContact = contacts.splice(index, 1)[0];
      await writeContacts(contacts);
      return removedContact;
    }
    return null;
  } catch (error) {
    console.error("Помилка при видаленні контакту", error);
  }
}

async function createContact(name, email, phone) {
  try {
    const contacts = await getAllContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
  } catch (error) {
    console.error("Помилка при додаванні контакту", error);
  }
}

async function updateContact(id, updatedContact) {
  try {
    const contacts = await getAllContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      // Зберігаємо поточний контакт
      const currentContact = contacts[index];
      const updated = {
        ...currentContact,
        ...updatedContact,
      };
      contacts[index] = updated;
      await writeContacts(contacts);
      return updated;
    }
    return null;
  } catch (error) {
    console.error("Помилка при оновленні контакту", error);
    throw error; // Передаємо помилку далі для обробки вище
  }
}

export {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
