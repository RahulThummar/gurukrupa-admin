import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ViewData from "../users/ViewData";
import EditModal from "../users/EditModal";
import { useParams } from "react-router-dom";
import AddUser11 from "../users/AddUser11";

const Home = () => {
  const { id } = useParams();
  const [users, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const [dataForModel, setDataForModel] = useState({});
  const [viewdata, setViewData] = useState(false);
  const [addData, setAddData] = useState(false);

  //----handleview

  const handleView = (viewdata) => {
    setViewData(true);
    console.log(viewdata);
    setDataForModel(viewdata);
  };

  const handleViewClose = () => {
    setViewData(false);
  };

  //--------handleshowAdd
  const handleShowAdd = (addData) => {
    setAdd(true);
    setAddData(addData);
  };

  const handleCloseAdd = () => {
    setAdd(false);
    axios
      .get(`https://62affa883bbf46a3522964c7.mockapi.io/crudDemo`)
      .then((respone) => {
        setUser(respone.data);
      });
  };

  //---handleshow

  const handleShow = (dataForModel) => {
    setShow(true);
    axios.put(
      `https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone${id}`,
      users
    );
    setDataForModel(dataForModel);
  };
  console.log(dataForModel, "Data for modal ");

  const handleClose = () => {
    setShow(false);
    axios
      .get(`https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone`)
      .then((respone) => {
        setUser(respone.data);
      });
  };

  //-------------------------------------------------------------
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (id) => {
    const result = await axios.get(
      "https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone"
    );
    setUser(result.data);
  };
  console.log(users, "rahul thummar");
  const deleteUser = async (id) => {
    await axios.delete(
      `https://653d3798f52310ee6a9a00c9.mockapi.io/apione/productlistone${id}`
    );
    loadUsers();
  };

  return (
    <>
      <nav> 
        <div>
          {/* ------ addbutton ------- */}
          <button
            className="btn btn-outline-success m-3"
            onClick={() => handleShowAdd()}
          >
            Add
          </button>
        </div>
      </nav>

       

      <div className="table-striped table-hover table table-sm ">
        <div className="py-2 ">
          <table className="table border shadow">
            <thead className="table-info shadow">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Product Name</th>
                <th scope="col">Description</th>
                <th scope="col">Color</th>
                <th scope="col">price</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr>
                  <th scope="row">{user._id}</th>
                  <td>{user.productName}</td>
                  <td>{user.des}</td>
                  <td>{user.color}</td>
                  <td>{user.price}</td>
                  <td>
                    <div
                      className="btn btn-outline-success mr-2"
                      onClick={() => handleView(user)}
                    >
                      View
                    </div>
                  </td>
                  <td>
                    <div
                      className="btn btn-outline-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {add ? (
        <AddUser11 show={true} onHide={handleCloseAdd} data={addData} />
      ) : null}

      {show ? (
        <EditModal show={show} onHide={handleClose} data={dataForModel} />
      ) : null}

      {viewdata ? (
        <ViewData show={true} onHide={handleViewClose} data={dataForModel} />
      ) : null}
    </>
  );
};

export default Home;
