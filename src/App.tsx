import AppRouter from "./routes/AppRouter";

export const baseUrl = import.meta.env.VITE_API_URL_PROD;

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
