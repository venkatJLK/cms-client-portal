
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callApiWithAuth } from "../../utils/api";

export interface UserProfile {
    name: string;
    age: number;
    mobile: string;
    email: string;
    gender: string;
    maritalStatus: string;
    nationality: string;
    race: string;
    address: string;
    medicalInfo: string;
    bloodGroup: string;
}

export interface UserState {
    email: string | null;
    accessToken: string | null;
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    authInitialized: boolean;
}

const initialState: UserState = {
    email: null,
    accessToken: null,
    profile: null,
    loading: false,
    error: null,
    authInitialized: false,
};


export const fetchUserData = createAsyncThunk<
    { email: string; accessToken: string; profile: UserProfile },
    { email: string; token: string },
    { rejectValue: string }
>("user/fetchUserData", async ({ email, token }, { rejectWithValue }) => {
    try {
        const response = await callApiWithAuth("get", "/self", token);
        return {
            email,
            accessToken: token,
            profile: response as UserProfile
        };

    } catch (error: any) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser(state) {
            state.email = null;
            state.accessToken = null;
            state.profile = null;
        },
        setAuthInitialized(state) {
            state.authInitialized = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.email = action.payload.email;
                state.accessToken = action.payload.accessToken;
                state.profile = action.payload.profile;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch user data";
            });
    },
});

export const { clearUser, setAuthInitialized } = userSlice.actions;

export default userSlice.reducer;