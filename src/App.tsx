import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home/Home";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Home></Home>
      </div>
    </ChakraProvider>
  );
}

export default App;
