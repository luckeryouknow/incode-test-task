import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type LinksToRepoState = {
  value: {
    owner: string,
    repo: string,
  },
}

const initialState: LinksToRepoState = {
  value: {
    owner: "",
    repo: "",
  },
}

export const linksToRepoSlice = createSlice({
  name: "linksToRepo",
  initialState,
  reducers: {
    setLinksToRepoValue: (state, action: PayloadAction<{owner: string, repo: string}>) => {
      state.value = action.payload;
    },
  },
})

export const {setLinksToRepoValue} = linksToRepoSlice.actions;
export default linksToRepoSlice.reducer;