import './App.css'
import {FindButton, FindInput, LinksToRepo} from "./components";
import {DragAndDrop} from "./modules";
import {Box} from "@chakra-ui/react";

function App() {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100%"} minHeight={"100vh"}>
      <Box display={"flex"} gap={"10px"}>
        <FindInput />
        <FindButton />
      </Box>
      <LinksToRepo />

      <DragAndDrop />
    </Box>
  )
}

export default App
