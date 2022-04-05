import TableComponent from "./TableComponent";
import "../styles/customers.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

function Customers() {
  const { currentUser } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState({});
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [loading, setLoading] = useState(false);
  let secret = currentUser.token;
  const headers = {
    authorization: secret,
  };
  const columns = ["customer_id", "name", "email", "phone", "status"];
  const [data, setData] = useState([]);
  async function fetchCustomers() {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://54.167.27.9:1994/api/customer/CustomerList",
        {
          headers: headers,
        }
      );
      setData(res.data.rows);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(async () => {
    fetchCustomers();
  }, []);
  async function DeleteCustomer({ row }) {
    console.log(row);
    try {
      const res = axios.put(
        "http://54.167.27.9:1994/api/customer/DeleteCustomer",
        { customer_id: row.id },
        {
          headers: headers,
        }
      );
      console.log("Delete Customer Success", res);
      fetchCustomers();
    } catch (error) {
      console.log("Delete Customer Error", error);
    }
  }
  const actions = (row) => (
    <>
      <button
        onClick={() => {
          openModal();
          setEditData(row);
        }}
        style={{ background: "#00963F" }}
      >
        Edit
      </button>
      <button
        onClick={() => DeleteCustomer(row)}
        style={{ background: "#FD6074" }}
      >
        Delete
      </button>
    </>
  );
  return (
    <div className="customers_main">
      <div className="customers_header">
        <div className="cus_head_first">
          <div className="cus_first_title">
            <h1>Customers</h1>
          </div>
          <div class="breadcrumb">
            <Link to="/">Home</Link>
            <div class="breadcrumb__separator">/</div>
            <Link to="/customers">Customers</Link>
          </div>
        </div>
        <div className="cus_head_second">
          <button onClick={openModal} className="success_btn">
            {" "}
            + Add Customers
          </button>
          <button className="success_btn"> + Bulk Uploads</button>
          <button className="success_outline_btn"> + Sample Excel File</button>
        </div>
      </div>
      <div className="customers_tableCard">
        {loading ? (
          "loading...."
        ) : (
          <TableComponent
            actions={actions}
            extraCol="actions"
            data={data}
            columns={columns}
          />
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}></Modal>
    </div>
  );
}

export default Customers;
