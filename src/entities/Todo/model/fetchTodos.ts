import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async() => {
    const {data} = await axios('https://jsonplaceholder.typicode.com/todos')
    return data
})