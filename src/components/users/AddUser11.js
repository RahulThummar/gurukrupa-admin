import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

const AddUser11 = (props) => {
  const runforms = useRef();
  const [images, setImages] = useState([]);

  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     password: "",
  //   },
  //   onSubmit: async (values) => {
  //     await axios
  //       .post("https://62affa883bbf46a3522964c7.mockapi.io/crudDemo", values)
  //       .then((response) => {
  //         if (response) {
  //           props.onHide();
  //         }
  //       });
  //     console.log(values, "new added !!!!");
  //   },
  //   validate,
  // });

  const errorContainer = (form, field) => {
    return form.touched[field] && form.errors[field] ? (
      <span className="error text-danger">{form.errors[field]}</span>
    ) : null;
  };
  const formAttr = (form, field) => ({
    onBlur: form.handleBlur,
    onChange: form.handleChange,
    value: form.values[field],
  });

  const submitFormData = async (formData, resetForm) => {
    formData.img = images;
    await axios
      .post(
        "https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone",
        formData
      )
      .then((response) => {
        if (response) {
          props.onHide();
        }
      });
  };

  const handleRemoveProdImg = (e) => {
    var x = images;
    x.splice(e, 1);
    setImages([...x]);
  };

  const addImagesToProductList = (e) => {
    const selectedImages = e.target.files || e.dataTransfer.files;
    const imageArray = Array.from(selectedImages);
    setImages(imageArray);
    runforms.current.setFieldValue("img", imageArray);
    console.log(runforms, "runforms");
  };

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
            <Formik
              innerRef={runforms}
              enableReinitialize
              initialValues={{
                _id: Math.floor(100000 + Math.random() * 900000).toString(),
                createdAt: new Date().toISOString(),
                img: images,
                productName: "",
                price: "",
                color: "",
                badge: "",
                des: "",
              }}
              validationSchema={Yup.object({
                img: Yup.array()
                  .min(1, "imgs must have at least 1 element.")
                  .required("imgs is required."),
                productName: Yup.string().required("productName is required."),
                price: Yup.string().required("price is required."),
                color: Yup.string().required("color is required."),
                badge: Yup.string().required("badge is required."),
                des: Yup.string().required("description is required."),
              })}
              onSubmit={(formData, { resetForm }) =>
                submitFormData(formData, resetForm)
              }
            >
              {(runform) => (
                <form
                  className="row mb-0 frm-logo-top"
                  onSubmit={runform.handleSubmit}
                >
                  <div className="col-12 mb-3">
                    <label className="label-comn-text mb-2 d-block">
                      Images
                    </label>
                    <input
                      type="file"
                      name="img"
                      multiple
                      className="form-control comn-input-style"
                      accept="image/*"
                      onChangeCapture={(e) => addImagesToProductList(e)}
                    />
                    {errorContainer(runform, "img")}
                  </div>
                  {images.map((src, i) => {
                    return (
                      <>
                        <div className="product-img-div position-relative">
                          <img
                            key={i}
                            src={URL.createObjectURL(src)}
                            loading="lazy"
                            alt="Products"
                          />
                          <button
                            className="del-img-btn border-0"
                            onClick={() => handleRemoveProdImg(i)}
                          >
                            -
                          </button>
                        </div>
                      </>
                    );
                  })}
                  <div className="col-12 mb-3">
                    <label className="label-comn-text mb-2 d-block">
                      Product Name
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        name="productName"
                        {...formAttr(runform, "productName")}
                        className="form-control comn-input-style"
                        placeholder="Enter productName"
                      />
                    </div>
                    {errorContainer(runform, "productName")}
                  </div>
                  <div className="col-12 mb-3">
                    <label className="label-comn-text mb-2 d-block">
                      Price
                    </label>
                    <div className="position-relative">
                      <input
                        type="number"
                        name="price"
                        {...formAttr(runform, "price")}
                        className="form-control comn-input-style"
                        placeholder="Enter price"
                      />
                    </div>
                    {errorContainer(runform, "price")}
                  </div>
                  <div className="col-12 mb-3">
                    <label className="label-comn-text mb-2 d-block">
                      Color
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        name="color"
                        {...formAttr(runform, "color")}
                        className="form-control comn-input-style"
                        placeholder="Enter color"
                      />
                    </div>
                    {errorContainer(runform, "color")}
                  </div>
                  <div className="col-12 mb-3">
                    <label className="label-comn-text mb-2 d-block">
                      Badge
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        name="badge"
                        {...formAttr(runform, "badge")}
                        className="form-control comn-input-style"
                        placeholder="Enter badge"
                      />
                    </div>
                    {errorContainer(runform, "badge")}
                  </div>
                  <div className="col-12 mb-3">
                    <label className="label-comn-text mb-2 d-block">
                      Description
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        name="des"
                        {...formAttr(runform, "des")}
                        className="form-control comn-input-style"
                        placeholder="Enter des"
                      />
                    </div>
                    {errorContainer(runform, "des")}
                  </div>

                  <div className="col-12 pt-md-4 pt-3 text-center">
                    <button type="submit" className="btn-comn-class w-100">
                      Add
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default AddUser11;
