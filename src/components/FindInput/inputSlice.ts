import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InputState = {
  value: string,
}

const initialState: InputState = {
  value: "",
}

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
})

export const {setInputValue} = inputSlice.actions;
export default inputSlice.reducer;