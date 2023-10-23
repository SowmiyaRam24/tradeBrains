import Container from "react-bootstrap/Container";
import { Navbar,Nav} from "react-bootstrap";
import {NavLink,useLocation,useNavigate} from "react-router-dom";
import AuthContext from '../Athentication/AuthenContext';
import Button from "react-bootstrap/Button";

import { useContext } from "react";

const Navbar1 = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate=useNavigate();
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () =>{authCtx.logout()
    navigate("/")}
  const location = useLocation();
  
  return (
    <div>
   <Navbar bg="dark" variant="dark" fixed="top" >
      <Container>
        <Nav className="me-auto">
         {!isLoggedIn&& <NavLink to="/" className="nav-link">LOGIN</NavLink>}
          {isLoggedIn&&<NavLink to="/home" className="nav-link">
            HOME
          </NavLink>}
          {isLoggedIn&&<NavLink to="/Watchlist" className="nav-link">
            Watchlist
          </NavLink>}
          

        </Nav>
      
       
           
       <Nav>
       {isLoggedIn && (
            <Button onClick={logoutHandler}variant="info"
            style={{ border: "1px solid skyblue",
            marginLeft: "10px", }}
            type="click">
              Logout
            </Button>
            
          )}
          </Nav>
       </Container>
      </Navbar>
     
  
    </div>
	
   
  );
};
export default Navbar1;