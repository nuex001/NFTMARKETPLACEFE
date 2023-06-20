import { configureStore } from "@reduxjs/toolkit";
import nfts from "./nftsStore";
export default configureStore({
  reducer: {
    nftsStore: nfts,
  },
});
