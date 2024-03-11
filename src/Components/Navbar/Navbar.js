import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from './Navbar.module.css';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OffcanvasExample() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout from Fantasy League!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            navigate("/");
            console.log("Signed out successfully");
          })
          .catch((error) => {
            console.error("Sign-out error:", error);
          });
      }
    });
  };
  const [showOffcanvas, setShowOffcanvas] = useState(false); // State to manage offcanvas menu visibility

  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand href="#" className="mx-auto mx-lg-0">Fantasy League</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarCollapse" className={styles.logo} />
          <Navbar.Collapse id="navbarCollapse" className="justify-content-center justify-content-lg-end">
            <Nav>
              <Nav.Item>
                <Link to="/home" className="nav-link">Home</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/scoring" className="nav-link">Scoring System</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/choices" className="nav-link">Choose Players</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/selection" className="nav-link">View Selected Players</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              </Nav.Item>
              <Form>
                <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Placeholder content for the offcanvas menu.
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default OffcanvasExample;