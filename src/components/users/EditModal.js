import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";

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
  console.log(errors, "error logs ");
  return errors;
};

const EditModal = (props) => {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      name: props.data.name,
      phone: props.data.phone,
      email: props.data.email,
      address: props.data.address,
      password: props.data.password,
    },
    onSubmit: (values) => {
      axios
        .put(
          `https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone${props.data.id}`,
          values
        )
        .then((res) => {
          axios
            .get(
              `https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone`,
              values
            )
            .then((res) => {
              if (res) {
                props.onHide();
              }
            });
        });

      console.log(values, "values");
      console.log("Hello");
    },
    validate,
  });

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered={true}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      style={{
        overlay: { background: "green" },
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
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={props.data.name}
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
                placeholder={props.data.email}
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
                placeholder={props.data.phone}
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
                placeholder={props.data.address}
                value={formik.values.address}
                onChange={formik.handleChange}
              ></Form.Control>

              {formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Button className="button-submit" type="submit">
                Update
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
  );
};

export default EditModal;
