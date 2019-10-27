/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Button, Form, Alert, Container, Col,
} from 'react-bootstrap';

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Login</h1>
          <div>
            <Form>
              <Form.Label>Tên người dùng : </Form.Label>
              <Form.Control type="text" />
            </Form>
            <Form>
              <Form.Label>Mật khẩu : </Form.Label>
              <Form.Control type="password" />
            </Form>
            <Form>
              <Button>Đăng nhập</Button>
              <Alert.Link href="/register">Đăng kí</Alert.Link>
            </Form>
          </div>
        </Col>
      </Container>
    );
  }
}

export default Login;
