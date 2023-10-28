import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const validate = (values) => {
  console.log(values, "validate function");
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 character or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.toString().length != 10) {
    errors.phone = "Invalid Number";
  }

  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.toString().length < 4) {
    errors.password = "Password must be more than 4 Characters";
  }
  console.log(errors, "error logs ");
  return errors;
};

const AddUser11 = (props) => {
  const [User, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
    onSubmit: async (values) => {
      await axios
        .post("https://62affa883bbf46a3522964c7.mockapi.io/crudDemo", values)
        .then((response) => {
          if (response) {
            props.onHide();
          }
        });
      console.log(values, "new added !!!!");
    },
    validate,
  });

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        centered={true}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        style={{
          overlay: { background: "red" },
          content: {
            color: "green",
            height: "70%",
            width: "50%",
            align: "center",
            position: "absolute",
          },
        }}
      >
        <div className="update">
          <Modal.Header>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                ></Form.Control>

                {formik.errors.name ? (
                  <div className="error">{formik.errors.name}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                ></Form.Control>

                {formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone </Form.Label>
                <Form.Control
                  type="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                ></Form.Control>

                {formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  name="address"
                  placeholder="Enter your address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                ></Form.Control>

                {formik.errors.address ? (
                  <div className="error">{formik.errors.address}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                ></Form.Control>

                {formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Button className="button-submit" type="submit">
                  ADD
                </Button>
                <Button
                  className="button-cancle"
                  variant="secondary"
                  onClick={props.onHide}
                >
                  Close
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default AddUser11;
