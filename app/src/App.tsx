import React from 'react';
import './App.css';
import CreateHome from './home/CreateHome';
import {
  Container, Navbar, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';

const App: React.FC = () => {
  return (
    <div className="App container">
      <Navbar color="faded" light expand="md">

        <NavbarBrand href="/">
          Special Delivery <span role="img" aria-label="delivery-box">📦</span>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>

          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">Home</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">Twitter</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">Instagram</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">Facebook</NavLink>
          </NavItem>
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" href="/">Post</NavLink>
          </NavItem>


        </Nav>
      </Navbar>



      <Container>
        <CreateHome />
      </Container>

    </div>
  );
}

export default App;
