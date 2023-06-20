import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initializing state
const initialState = {
    loading: false,
    error: null,
    nfts: [],
    nft: null,
    contract: null,
    provider: null,
    owner: null
};

//
const nftSlice = createSlice({
    name: "NftMarketplace",
    initialState,
    // extraReducers: (builder) => {},
    reducers: {
        clear(state) {
            return {
                ...state,
                success: null,
                error: null,
            };
        },
        setContract(state, action) {
            return {
                ...state,
                contract: action.payload
            };
        },
        setProvider(state, action) {
            return {
                ...state,
                provider: action.payload
            };
        },
        setOwner(state, action) {
            return {
                ...state,
                owner: action.payload
            };
        },
        setNfts(state, action) {
            return {
                ...state,
                nfts: action.payload
            };
        },
        setNft(state, action) {
            return {
                ...state,
                nft: action.payload
            };
        }
    },
});

export const { clear, setContract, setProvider, setOwner ,setNfts ,setNft} =
    nftSlice.actions;

export default nftSlice.reducer;
