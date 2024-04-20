import {useDispatch} from "react-redux";
import {setInputValue} from "./inputSlice.ts";
import {Input} from "@chakra-ui/react";

export default function FindInput () {
  const dispatch = useDispatch();
  return (
    <Input
      data-testid="FindInput"
      onChange={(event) => dispatch(setInputValue(event.currentTarget.value))}
    />
  )
}