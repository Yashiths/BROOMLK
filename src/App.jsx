import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/configure" element={<ProductView />} />
      </Routes>
    </Router>
  );
}

export default App;