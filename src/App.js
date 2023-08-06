import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register/Register"
import { Provider } from "./Context/Context";
// import ForgetPass from "./pages/ForgetPass";
function App() {
  return (
    <BrowserRouter>
      <Provider>

        <div className="App">
          <div className="blur" style={{ top: '-18%', right: '0' }}></div>
          <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
          <Routes>
            <Route path="/home" element={<Profile />}></Route>
            <Route path="/register" element={<Login />}></Route>
            <Route path="/" element={<Register />}></Route>
            {/* <Route path='/auth' element={<ForgetPass/>}></Route> */}

          </Routes>

        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
