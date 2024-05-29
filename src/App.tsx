import { useState } from "react";
import Provider from "./components/Provider";
import Loader from "./components/Loader";
import LoadingScreen from "./components/LoadingScreen";
import Experience from "./components/Experience";

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <Provider>
      <Experience />
      <Loader setLoading={setLoading} />
      <LoadingScreen loading={loading} />
    </Provider>
  )
}

export default App
