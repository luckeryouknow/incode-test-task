import { configureStore } from '@reduxjs/toolkit'
import inputReducer from "../components/FindInput/inputSlice";
import linksToRepoReducer from "../components/LinksToRepo/linksToRepoSlice";
import dragAndDropListReducer from "../modules/DragAndDrop/dragAndDropListSlice.ts";

export const store = configureStore({
  reducer: {
    input: inputReducer,
    linksToRepo: linksToRepoReducer,
    dragAndDropList: dragAndDropListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch