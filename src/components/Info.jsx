/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Container, Col, Row, Form, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import * as actions from '../actions';

class Info extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


  // handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData(event.target);
  // }

  render() {
    const values = queryString.parse(this.props.location.search);
    const { edit } = values;
    const { user } = this.props;
    return (
      <Container>
        <Col md={{ span: 10, offset: 1 }}>
          <h1>Thông tin cá nhân</h1>
          <hr />
          <Row>
            <Col sm={5}><h5>Họ và tên</h5></Col>
            <Col>
              {
                (edit === 'fullname') ? (
                  <Form>
                    <Row>
                      <Col><Form.Control value={this.props.user.fullname} type="text"></Form.Control></Col>
                      <Col><Button type="submit">Lưu</Button></Col>
                    </Row>
                  </Form>
                ) : (
                  <Row>
                    <Col><p>{user.fullname}</p></Col>
                    <Col>
                      {edit ? (<Link />) : (<Link to="/info?edit=fullname">Chỉnh sửa</Link>)}
                    </Col>
                  </Row>
                )
              }
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm={5}><h5>Email</h5></Col>
            <Col>
              {
                (edit === 'email') ? (
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col><Form.Control value={this.props.user.email} type="text"></Form.Control></Col>
                      <Col><Button type="submit">Lưu</Button></Col>
                    </Row>
                  </Form>
                ) : (
                  <Row>
                    <Col><p>{user.email}</p></Col>
                    <Col>
                      {edit ? (<Link />) : (<Link to="/info?edit=email">Chỉnh sửa</Link>)}
                    </Col>
                  </Row>
                )
              }
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm={5}><h5>Tên đăng nhập</h5></Col>
            <Col>
              {
                (edit === 'username') ? (
                  <Form>
                    <Row>
                      <Col><Form.Control value={this.props.user.username} type="text"></Form.Control></Col>
                      <Col><Button type="submit">Lưu</Button></Col>
                    </Row>
                  </Form>
                ) : (
                  <Row>
                    <Col><p>{user.username}</p></Col>
                    <Col>
                      {edit ? (<Link />) : (<Link to="/info?edit=username">Chỉnh sửa</Link>)}
                    </Col>
                  </Row>
                )
              }
            </Col>
          </Row>
          <hr />
          <Row>
            <Col sm="5"><h5>Mật khẩu</h5></Col>
            <Col>
              {
                edit === 'password' ? (
                  <Form>
                    <Form.Group>
                      <Form.Label>Mật khẩu cũ</Form.Label>
                      <Form.Control type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Mật khẩu mới</Form.Label>
                      <Form.Control type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Nhập lại mật khẩu mới</Form.Label>
                      <Form.Control type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Button type="submit">Lưu</Button>
                    </Form.Group>
                  </Form>
                ) : (
                  <div>
                    {edit ? (<Link />) : (<Link to="/info?edit=password">Chỉnh sửa</Link>)}
                  </div>
                )
              }
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onEdit: (data) => dispatch(actions.edit(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
