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
        <Navbar key={expand} bg="dark" expand={expand} className="mb-4"

          // breakpoint={expand}

          fixed='top'
          style={{
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            padding: "1rem"
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
                color: "white"
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
                      color: "white"
                    }}
                  >

                    <Link to="/home" style={{
                      textDecoration: "none",
                      color: "white",
                      margin: "1rem"
                    }}>Home</Link>

                  </Nav.Link>

                  <Nav.Link
                    style={{
                      color: "white"
                    }}
                  >
                    <Link to="/scoring" style={{
                      textDecoration: "none",
                      color: "white",
                      margin: "1rem"
                    }}>Scoring System</Link>
                  </Nav.Link>

                  <Nav.Link
                    style={{
                      color: "white"
                    }}
                  >

                    <Link to="/choices" style={{
                      textDecoration: "none",
                      color: "white",
                      margin: "1rem"
                    }}>Choose Players</Link>

                  </Nav.Link>
                  <Nav.Link
                    style={{
                      color: "white"
                    }}

                  >
                    <Link to="/selection" style={{
                      textDecoration: "none",
                      color: "white",
                      margin: "1rem"
                    }}>My Selection</Link>
                  </Nav.Link>
                  <Nav.Link
                    style={{
                      color: "white"
                    }}

                  >
                    <Link to="/leaderboard" style={{
                      textDecoration: "none",
                      color: "white",
                      margin: "1rem"
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
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>Link</a></li>
            <li>
              <details>
                <summary>
                  Parent
                </summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li><a>Link 1</a></li>
                  <li><a>Link 2</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
    // <div>
    //   <div className="navbar bg-base-100">
    //     <div className="navbar-start">
    //       <div className="dropdown">
    //         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
    //           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
    //         </div>
    //         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
    //           <li><a href='/dashboard'>Dashboard</a></li>
    //           <li><a href='/add-admin'>Add Admin</a></li>
    //           <li><a href='/change-password'>Change Password</a></li>
    //           <li><a href='/register-user'>Register/Update user</a></li>
    //           <li><a href='/view-users'>View All Users</a></li>
    //           <li><a href='/verify-workshop-payment'>Verify Payments</a></li>
    //           <li><a href='/workshop-cash-payment'>Cash Payment</a></li>
    //           <li><a href='/event-register'>Event Registration</a></li>
    //           <li><a href='/workshop-list'>Workshop Registration List</a></li>
    //           <li><a href='/event-list'>Event Registration List</a></li>
    //           <li><a href='/payments'>Payment Details</a></li>
    //           <li><a href='/campus-ambassador'>Campus Ambassador</a></li>
    //           <li><a href='/queries'>Queries</a></li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="navbar-center">
    //       <a className="btn btn-ghost text-xl" href='/dashboard'>Abacus'24 Admin</a>
    //     </div>
    //     <div className="navbar-end">
    //       <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
    //         <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512" ><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" fill='#ffffff' /></svg>
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default OffcanvasExample;