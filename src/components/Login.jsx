/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Button, Form, Alert, Container, Col,
} from 'react-bootstrap';
// import * as actions from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
  }

  render() {
    return (
      <Container>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Đăng nhập</h1>
          <div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Label>Tên người dùng : </Form.Label>
              <Form.Control type="text" />
            </Form>
            <Form>
              <Form.Label>Mật khẩu : </Form.Label>
              <Form.Control type="password" />
            </Form>
            <Form>
              <Button variant="primary" type="submit">Đăng nhập</Button>
              <Alert.Link href="/register">Đăng kí</Alert.Link>
            </Form>
          </div>
        </Col>
      </Container>
    );
  }
}

export default Login;
