import {
  BrowserRouter as Router,
  Route,
  Routes,
  
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<Layout>{ <span>home</span>}</Layout>} />
          <Route path="/search" element={<Layout>{ <span>search</span>}</Layout>} />
          <Route path="/about" element={<> about</>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="*" element={<Navigate to='/'/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
