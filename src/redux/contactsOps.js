// src/redux/contactsOps.js
import axios from "axios";
axios.defaults.baseURL = "https://6851b94e8612b47a2c0b125c.mockapi.io";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/contacts");
      console.log(res);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    console.log("addContact thunk başladı:", contact);
    try {
      const response = await axios.post("/contacts", contact);
      console.log("addContact başarılı:", response.data);
      return response.data;
    } catch (e) {
      console.log("addContact hata:", e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`); // axios baseURL ayarlanmış olmalı
      return contactId; // sadece ID dön
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);