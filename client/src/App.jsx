import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState(null);
  const storedUser = localStorage.getItem("UserData");
  const [isLoggedin, setIsLoggedin] = useState(false)

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedin(true);//Trigger re-render
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme) {
      setIsDarkMode(currentTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode
      ? "bg-dark text-white"
      : "bg-light text-dark";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    
    const storedUser = localStorage.getItem("UserData");
    if(storedUser){
      let Userstored = JSON.parse(storedUser);
      setUser(Userstored);
    }
    
  }, [])
  

  const toggleDarkMode = () => {
    setIsDarkMode((PrevMode) => !PrevMode);
  };

  return (
    <>
      <BrowserRouter>
        <Container className={` p-0 ${isDarkMode ? "bg-dark text-light" : "bg-light"}`} fluid>
          <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} user={user} isLoggedIn={isLoggedin} setIsLoggedIn={setIsLoggedin}/>
        </Container>
        <Container
          fluid
          className={`${isDarkMode ? "bg-dark text-light" : "bg-light"}`}
          style={{ minHeight: "100vh", padding: "0px" }}
          data-bs-theme={isDarkMode ? "dark" : "light"}
        >
          <Row className="text-center">
            <Col>
              <h1>Expenses</h1>
            </Col>

            <Routes>
              <Route path="/" element={<Dashboard/>} />
              <Route path="/Login" element={<Login setUser={setUser}/>} />
              <Route path="/CreateAccount" element={<CreateAccount/>} />
              <Route path="/Dashboard" element={<Dashboard isDarkMode={isDarkMode} onLogin={handleLogin}/>} />
            </Routes>

          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default App;
