import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

  return (
    <>
      {['sm'].map((expand) => (
        <Navbar  key={expand} bg="transparent" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">SYNC</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Choose Players</Nav.Link>
                  <Nav.Link href="#action2">Leaderboard</Nav.Link>
                </Nav>
                <Form className="d-flex">
               
                  <Button variant="outline-success"
                  onClick={
                    handleLogout
                  }
                  >Logout</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;