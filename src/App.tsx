import AppRouter from "./routes/AppRouter";

export const baseUrl = "http://localhost:5000/api/v1";

function App() {

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
