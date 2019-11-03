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
  static updateLocal(change) {
    const user = JSON.parse(localStorage.getItem('user'));
    const key = Object.keys(change)[0];
    user[key] = change[key];
    localStorage.setItem('user', JSON.stringify(user));
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updatePropsByLocal() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.props.updateUser(user);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const prop = event.target.name;

    const change = { [prop]: data.get(prop) };
    if (prop !== 'password') {
      this.props.onEdit(change);
    }
    Info.updateLocal(change);
    this.updatePropsByLocal();
    this.props.history.push('/info');
  }

  handleChange(event) {
    event.preventDefault();
    const username = event.target.value;
    this.props.onCheck(username);
  }

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
                  <Form name="fullname" onSubmit={this.handleSubmit}>
                    <Row>
                      <Col><Form.Control name="fullname" defaultValue={this.props.user.fullname} type="text"></Form.Control></Col>
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
                  <Form name="email" onSubmit={this.handleSubmit}>
                    <Row>
                      <Col><Form.Control name="email" type="email" defaultValue={this.props.user.email}></Form.Control></Col>
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
                  <Form name="username" onSubmit={this.handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Control
                          name="username"
                          defaultValue={this.props.user.username}
                          type="text"
                          onChange={this.handleChange}
                        />
                        <Form.Text>{ this.props.mess }</Form.Text>
                      </Col>
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
                  <Form name="password" onSubmit={this.handleSubmit}>
                    <Form.Group name="old_password">
                      <Form.Label>Mật khẩu cũ</Form.Label>
                      <Form.Control type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label name="password">Mật khẩu mới</Form.Label>
                      <Form.Control type="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label name="re_password">Nhập lại mật khẩu mới</Form.Label>
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
  mess: state.auth.mess,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  onEdit: (data) => dispatch(actions.edit(data)),
  updateUser: (user) => dispatch(actions.loadProps(user)),
  onCheck: (username) => dispatch(actions.check(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Info);
