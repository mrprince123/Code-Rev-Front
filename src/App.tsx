import AppRouter from "./routes/AppRouter";

// export const baseUrl = "http://localhost:5000/api/v1";
// export const planeBackUrl = "https://localhost:500";

// export const baseUrl = "https://code-rev-back.onrender.com/api/v1";
// export const planeBackUrl = "https://code-rev-back.onrender.com";


export const baseUrl = "https://code-rev-back.vercel.app/api/v1";
export const planeBackUrl = "https://code-rev-back.vercel.app";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
