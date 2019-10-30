import React from 'react';
import {
  Alert, Container, Col, Row,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Info extends React.Component {
  render() {
    return (
      <Container>
        <Col md={{ span: 10, offset: 1 }}>
          <h1>Thông tin cá nhân</h1>
          <hr />
          <Row>
            <Col><h5>Họ và tên</h5></Col>
            <Col><p>abc</p></Col>
            <Col><Alert.Link>Chỉnh sửa</Alert.Link></Col>
          </Row>
          <hr />
          <Row>
            <Col><h5>Email</h5></Col>
            <Col><p>Khâu Thanh Hiếu</p></Col>
            <Col><Alert.Link>Chỉnh sửa</Alert.Link></Col>
          </Row>
          <hr />
          <Row>
            <Col><h5>Tên đăng nhập</h5></Col>
            <Col><p>Khâu Thanh Hiếu</p></Col>
            <Col><Alert.Link>Chỉnh sửa</Alert.Link></Col>
          </Row>
          <hr />
          <Row>
            <Col><h5>Mật khẩu</h5></Col>
            <Col><p>Khâu Thanh Hiếu</p></Col>
            <Col><Alert.Link>Chỉnh sửa</Alert.Link></Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
