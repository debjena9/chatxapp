import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";
import { Navbar, Nav, Button } from 'react-bootstrap';


export default function NavBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();
  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch {
      toast.error("Failed to logout")
    }
  }
  return (
    <Navbar bg="light" expand="lg">
    <div className="container">
      <Navbar.Brand as={Link} to="/">
        Chatx App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />

      <Navbar.Collapse className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <Nav className="ml-auto">
          {currentUser && (
            <>
              <Nav.Item>
                <Button variant="outline-secondary" className="nav-link btn btn-outline-secondary rounded-circle" onClick={handleLogout}>
                  <FaSignOutAlt style={{ color: "#6a1b9a", fontSize: '25px' }} />
                </Button>
              </Nav.Item>
              <Nav.Item>
                <Link to="/profile" className="nav-link">
                  <img
                    className="h50 w50  rounded-circle"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.username)}&background=random&color=fff`}
                    alt=""
                  />
                </Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </div>
  </Navbar>
  );
}
