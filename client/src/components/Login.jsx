import { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { GetLoggedInUser, login } from "../Services/DataService";

const Login = ({ }) => {

  
  let navigate = useNavigate();

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    // Function or method to handle our user
    const handleUser = (e) => {
        setUsername(e.target.value);
    }

    // Function or method to handle our password
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    // Function or method to handle our submit
    const handleSubmit = async () => {
        let userData = {
            username: Username,
            password: Password,
            publisherName: Username
        }
        console.log(userData);
        
        
        let token = await login(userData);
        console.log(token.token, "This should log the Token");
        if(token.token != null)
        {
          localStorage.setItem("Token",token.token);
          // localStorage.setItem("UserData",JSON.stringify(userData));
          await GetLoggedInUser(Username);
          navigate("/Dashboard");
        }
        // setUser(userData);
        return userData;
        
        
    }


  return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            <Form>
          <p>Login</p>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={(e) => handleUser(e)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={handlePassword}/>
              </Form.Group>

              <Button variant="outline-primary" onClick={handleSubmit}>
                Login
              </Button>
              <p className="mt-3">Don't have an account?</p>
              <Button variant="outline-primary"  onClick={() => navigate('/CreateAccount')}>
                Create Account
              </Button>
            </Form>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
