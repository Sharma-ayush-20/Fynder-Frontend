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
        containerStyle={{ top: 80 }}
      />
      <BrowserRouter>
        <AppContent /> 
      </BrowserRouter>
    </Provider>
  );
}

export default App;
