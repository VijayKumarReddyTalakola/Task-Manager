import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";
import { toast } from "react-hot-toast";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  tasks: [],
  task: {},
  token,
  filteredTasks: [],
};

export const registerUser = createAsyncThunk(
  "/api/user/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/register", payload);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "/api/user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/user/login", payload);
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const addTask = createAsyncThunk(
  "/api/task/(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/task", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "/api/task/(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/task", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getTaskDetails = createAsyncThunk(
  "/api/task/:id(get)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/task/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "/api/task/:id(delete)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/task/${payload}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "/api/task/:id(patch)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/api/task/${payload.id}`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getFilteredTasks = createAsyncThunk(
  "/api/task/filter(post)",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/task/filter`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.token = payload.token;
      state.user = payload.user;
      toast.success(payload.message);
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.token = payload.token;
      state.user = payload.user;
      toast.success(payload.message);
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tasks = payload.allTasks;
      toast.success(payload.message);
    });
    builder.addCase(addTask.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getAllTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tasks = payload.tasks;
    });
    builder.addCase(getAllTasks.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getTaskDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTaskDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.task = payload.task;
      toast.success(payload.message);
    });
    builder.addCase(getTaskDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tasks = payload.allTasks;
      toast.success(payload.message);
    });
    builder.addCase(deleteTask.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tasks = payload.allTasks;
      toast.success(payload.message);
    });
    builder.addCase(updateTask.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });

    builder.addCase(getFilteredTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFilteredTasks.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.filteredTasks = payload.tasks;
      toast.success(payload.message);
    });
    builder.addCase(getFilteredTasks.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload.error);
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
