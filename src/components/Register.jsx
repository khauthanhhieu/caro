/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Button, Form, Container, Col, Alert,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Register extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    // const data = new FormData(event.target);
    this.props.onRegister();
  }

  render() {
    return (
      <Container>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Tạo tài khoản</h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tên người dùng</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group>
              <Button>Đăng kí</Button>
              <Alert color="primary">
                Bạn đã có tài khoản ?
                <Alert.Link href="/login"> Đăng nhập ngay </Alert.Link>
              </Alert>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: () => dispatch(actions.register()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
