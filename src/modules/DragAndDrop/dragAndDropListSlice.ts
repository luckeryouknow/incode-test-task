import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Item} from "../../types/types.ts";

type dragAndDropListState = {
  value: Array<Item>,
}

const initialState: dragAndDropListState = {
  value: [],
}

export const dragAndDropListSlice = createSlice({
  name: "dragAndDropList",
  initialState,
  reducers: {
    setDragAndDropValue: (state, action: PayloadAction<Array<Item>>) => {
      state.value = action.payload;
    }
  },
})

export const {setDragAndDropValue} = dragAndDropListSlice.actions;
export default dragAndDropListSlice.reducer;