import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Children from "./components/children/Children";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Children />
    </QueryClientProvider>
  );
}

export default App;
