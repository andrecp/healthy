import Body from "./components/Body";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Weight from "./components/Weight";
import AuthRequired from "./components/AuthRequired";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Body />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/weight"
            element={
              <AuthRequired>
                <Weight />
              </AuthRequired>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
