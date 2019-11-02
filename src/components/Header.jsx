/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  Navbar, NavDropdown, Form, Nav, FormControl, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  initLocal() {
    const user = localStorage.getItem('user');
    if (!user && this.props.user) {
      localStorage.setItem('user', JSON.stringify(this.props.user));
    }
  }

  loadProps() {
    const user = localStorage.getItem('user');
    if (user && !this.props.user) {
      this.props.loadProps(JSON.parse(user));
    }
  }

  render() {
    this.initLocal();
    this.loadProps();
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Cờ caro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline className="mr-auto offset-md-1">
            <FormControl type="text" placeholder="Nhập từ khóa..." className="mr-sm-2" />
            <Button variant="light">Tìm kiếm</Button>
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/">Trang Chủ</Nav.Link>
            <Nav.Link as={Link} to="/about">Giới thiệu</Nav.Link>
            {
              this.props.authed ? (
                <NavDropdown alignRight id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <h6 className="text-center">{this.props.user.fullname}</h6>
                    <p className="text-center">{this.props.user.email}</p>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Cài đặt</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/info">Thông tin cá nhân</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/logout">Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              ) : (<div />)
            }

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

const mapDispatchToProps = (dispatch) => ({
  loadProps: (user) => dispatch(actions.loadProps(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
