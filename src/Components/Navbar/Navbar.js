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
import Choices from '../../Pages/Choices/Choices';
import Selection from '../../Pages/Selection/Selection';
import Leadeboard from '../../Pages/Leaderboard/Leadeboard';
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

  return (
    <>
      {['sm'].map((expand) => (
        <Navbar  key={expand} bg="dark" expand={expand} className="mb-3"

        // breakpoint={expand}
       
        fixed='top'
        style={{
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          padding:"1rem"
        }}
        >
          <Container fluid>
            <Navbar.Brand 
            onClick={
                () => {
                    navigate("/home");
                }
            }
            style={{
                cursor: "pointer",
                color:"white"
            }}
            >
              Fantasy League
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Fantasy League
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center mr-auto flex-grow-1 pe-3">
                <Nav.Link
                  style={{
                    color:"white"
                  }}
                  >

                    <Link to="/home" style={{
                        textDecoration:"none",
                        color:"white",
                        margin:"1rem"
                    }}>Home</Link>
                    
                  </Nav.Link>
                  
                  <Nav.Link
                  style={{
                    color:"white"
                  }}
                  >
                    <Link to="/scoring" style={{
                        textDecoration:"none",
                        color:"white",
                        margin:"1rem"
                    }}>Scoring System</Link>
                  </Nav.Link>

                  <Nav.Link 
                  style={{
                    color:"white"
                  }}
                  >

                    <Link to="/choices" style={{
                        textDecoration:"none",
                        color:"white",
                        margin:"1rem"
                    }}>Choose Players</Link>
                    
                  </Nav.Link>
                  <Nav.Link
                  style={{
                    color:"white"
                  }}
                  
                  >
                     <Link to="/selection" style={{
                        textDecoration:"none",
                        color:"white",
                        margin:"1rem"
                     }}>My Selection</Link>
                  </Nav.Link>
                   <Nav.Link
                  style={{
                    color:"white"
                  }}
                  
                  >
                    <Link to="/leaderboard" style={{
                        textDecoration:"none",
                        color:"white",
                        margin:"1rem"
                    }}>Leaderboard</Link>
                  </Nav.Link>
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