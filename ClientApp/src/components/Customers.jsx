import TableComponent from "./TableComponent";
import "../styles/customers.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { FiEdit2, FiTrash } from "react-icons/fi";
function Customers() {
  const { currentUser } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const initialState = {
    name: "",
    phone: "",
    land_mark: "",
    state: "",
    address: "",
    email: "",
    phone: "",
    pin_code: "",
    cust_gstn: "",
    city: "",
  };
  const [form, setForm] = useState(initialState);
  const [states, setStates] = useState([]);
  function setEditValues(row) {
    setForm({
      name: row.name,
      phone: row.phone,
      land_mark: row.land_mark,
      state: row.state,
      address: row.address,
      email: row.email,
      phone: row.phone,
      pin_code: row.pin_code,
      cust_gstn: row.cust_gstn,
      city: row.city,
    });
  }
  const [toggleAddr, setToggleAddr] = useState(false);
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
  const columns = [
    { name: "customer_id", title: "ID" },
    { name: "name", title: "Name" },
    { name: "email", title: "Email" },
    { name: "phone", title: "Mobile" },
    { name: "status", title: "Status" },
  ];
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
  useEffect(async () => {
    try {
      const res = await axios.get(
        "http://54.167.27.9:1994/api/selection/StatesList",
        { headers: headers }
      );
      setStates(res.data.rows);
    } catch (error) {
      console.log("States Api Errors", error);
    }
  }, []);
  async function DeleteCustomer(row) {
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
  const [edit, setEdit] = useState(false);
  const actions = (row) => (
    <>
      <button
        onClick={() => {
          openModal();
          setEdit(true);
          setEditValues(row);
        }}
        style={{ background: "#00963F" }}
        className="icon_btns"
      >
        <FiEdit2 />
      </button>
      <button
        onClick={() => DeleteCustomer(row)}
        className="icon_btns"
        style={{ background: "#FD6074" }}
      >
        <FiTrash />
      </button>
    </>
  );
  async function updateCustomer() {
    try {
      const res = await axios.put(
        "http://54.167.27.9:1994/api/customer/UpdateCustomerProfile",
        form,
        {
          headers: headers,
        }
      );
      console.log("Edit REsponse", res);
      if (res.data.status === 200) closeModal();
      fetchCustomers();
    } catch (error) {
      console.log("Edit Api", error);
    }
  }
  async function addCustomer() {
    try {
      const res = await axios.post(
        "http://54.167.27.9:1994/api/customer/NewCustomer",
        form,
        {
          headers: headers,
        }
      );
      console.log("Add Custo REsponse", res);
      if (res.data.status === 200) closeModal();
      fetchCustomers();
    } catch (error) {
      console.log("Add Custo Api", error);
    }
  }
  function handleChange(e) {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }
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
          <button
            onClick={() => {
              openModal();
              setEdit(false);
              setForm(initialState);
            }}
            className="success_btn"
          >
            {" "}
            + Add Customers
          </button>
          <button className="success_btn"> + Upload Bulk Customers</button>
          <button className="success_outline_btn"> + Sample Excel File</button>
        </div>
      </div>
      <div className="customers_tableCard">
        <div className="cus_float_right">
          <input
            type="text"
            name=""
            placeholder="type here....."
            className="cus_search_input"
            id=""
          />
        </div>
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
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="modal-header">
          <h3>{edit ? "Edit" : "Add"}Customer</h3>
          <button onClick={closeModal}>&#x2715;</button>
        </div>
        <div className="input-wrapper">
          <label htmlFor="name">Customer Name</label>
          <input
            onChange={handleChange}
            value={form.name}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            value={form.email}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="phone">Mobile No</label>
          <input
            onChange={handleChange}
            value={form.phone}
            type="number"
            maxLength={10}
            name="phone"
            id="phone"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="gstin">GST</label>
          <input
            onChange={handleChange}
            value={form.cust_gstn}
            type="text"
            name="cust_gstn"
            id="gstin"
          />
        </div>
        <div className="modal_button_wrapper">
          <small>Do you want to add address for this customer?</small>
          <button
            style={{
              padding: "3px",
              border: "1px solid black",
            }}
            onClick={() => setToggleAddr(!toggleAddr)}
          >
            {toggleAddr ? "Hide" : "Show"}
          </button>
        </div>
        {toggleAddr ? (
          <>
            <div className="input-wrapper">
              <label htmlFor="address">Address</label>
              <input
                onChange={handleChange}
                value={form.address}
                type="text"
                name="address"
                id="address"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="landmark">Landamark</label>
              <input
                onChange={handleChange}
                value={form.land_mark}
                type="text"
                name="land_mark"
                id="landmark"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="state">State</label>
              <select
                onChange={handleChange}
                value={form.state}
                name="state"
                id="state"
              >
                {states.map((state) => (
                  <option value={state.id}>{state.state_name}</option>
                ))}
              </select>
            </div>
            <div className="input-wrapper">
              <label htmlFor="city">City</label>
              <input
                onChange={handleChange}
                value={form.city}
                type="text"
                name="city"
                id="city"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="zipcode">Zipcode</label>
              <input
                onChange={handleChange}
                value={form.pin_code}
                type="number"
                name="pin_code"
                id="zipcode"
              />
            </div>
          </>
        ) : (
          ""
        )}
        <div className="modal-footer">
          <button
            className="success_btn"
            onClick={edit ? updateCustomer : addCustomer}
          >
            Submit
          </button>
          <button
            className="success_btn"
            style={{ background: "#F1388B" }}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Customers;
