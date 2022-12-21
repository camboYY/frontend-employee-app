import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { http } from "store/config/http";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { Employee, ValidationErrors } from "type";
// Define a type for the slice state
const namespace = "employees";

interface EmployeeState {
  employees: Employee[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

// Define the initial state using that type
const initialState: EmployeeState = {
  employees: [] as Employee[],
  loading: "idle",
};

export const deleteEmployeeById = createAsyncThunk<
  Employee,
  { userId: number }
>(namespace, async ({ userId }, thunkAPI) => {
  try {
    const response = await http.get<Employee>(`/employees/${userId}`);
    return response;
  } catch (err: any) {
    let error: AxiosError<ValidationErrors> = err; // cast the error for access
    if (!error.response) {
      throw err;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchAllEmployees = createAsyncThunk<Employee[]>(
  namespace,
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get<Employee[]>(`/employees/`);
      return response;
    } catch (err: any) {
      let error: AxiosError<ValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const { actions, reducer } = createSlice({
  name: namespace,
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchAllEmployees.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
export const employeeSelector = (state: EmployeeState) => state.employees;
export const useEmployees = () => useSelector(employeeSelector);
