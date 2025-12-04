import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { Toaster } from "react-hot-toast";
import AppContent from "./components/AppContent";

function App() {
  return (
    <Provider store={appStore}>
      <Toaster
        position="top-right"
        containerStyle={{ top: 70 }}
        toastOptions={{
          duration: 3500,
          style: {
            background: "var(--b2)",
            color: "var(--bc)",
            borderRadius: "14px",
            padding: "12px 18px",
            fontSize: "0.9rem",
            border: "1px solid var(--b3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
            animation: "fadeSlideIn 0.45s ease",
          },
          success: {
            iconTheme: {
              primary: "var(--su)",
              secondary: "var(--b1)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--er)",
              secondary: "var(--b1)",
            },
          },
        }}
      />

      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
