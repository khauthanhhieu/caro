import React from 'react';
import {
  Navbar, NavDropdown, Form, Nav, FormControl, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">Cờ caro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto offset-md-1">
            <FormControl type="text" placeholder="Nhập từ khóa..." className="mr-sm-2" />
            <Button variant="light">Tìm kiếm</Button>
          </Form>
          <Nav className="col-sm-3">
            <Nav.Link as={Link} to="/">Trang Chủ</Nav.Link>
            <Nav.Link as={Link} to="/about">Giới thiệu</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Cài đặt</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/info">Thông tin cá nhân</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
  user: state.auth.user,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
