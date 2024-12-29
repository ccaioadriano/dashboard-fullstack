import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
