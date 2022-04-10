import React, { useEffect, useState } from "react";
import styles from "./createbill.module.css";
import { FiSearch, FiEdit2, FiTrash } from "react-icons/fi";
import TableComponent from "../../TableComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
function CreateBill() {
  const { currentUser } = useSelector((state) => state.auth);

  const [customers, setCustomers] = useState([]);
  const headers = {
    authorization: currentUser.token,
  };
  async function fetchCustomers() {
    try {
      const res = await axios.get(
        "http://54.167.27.9:1994/api/customer/CustomerList",
        {
          headers: headers,
        }
      );
      setCustomers(res.data.rows);
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  }
  useEffect(async () => {
    fetchCustomers();
  }, []);

  const columns = [
    { name: "customer_id", title: "Item" },
    { name: "name", title: "Qty" },
    { name: "email", title: "Price/Item" },
    { name: "phone", title: "Tax Amt" },
    { name: "status", title: "Tax%" },
    { name: "status", title: "Sub Total" },
  ];
  const actions = (row) => (
    <>
      <button style={{ background: "#00963F" }} className="icon_btns">
        <FiEdit2 />
      </button>
      <button className="icon_btns" style={{ background: "#FD6074" }}>
        <FiTrash />
      </button>
    </>
  );
  const data = [];
  const [filteredCustomer, setFilteredCustomer] = useState("");
  const [searchText, setSearchText] = useState();
  const filterCustomers = () => {
    const filtered = customers.find((cus) => cus.phone === searchText);
    setFilteredCustomer(filtered);
  };
  const history = useHistory();
  return (
    <main className={styles.container}>
      <div className={styles.pageHeader}>
        <div className={styles.inputIcons}>
          <input
            type="text"
            placeholder="Enter Customer Mobile Number"
            className={styles.input}
            onChange={(e) => setSearchText(e.target.value)}
            name=""
            id=""
          />
          <FiSearch
            onClick={filterCustomers}
            style={{
              float: "right",
              position: "relative",
              top: "-27px",
              left: "-20px",
              color: "black",
              fontSize: "15px",
            }}
          />
        </div>
        <strong className={styles.pageTitle}>Create Bill</strong>
      </div>
      {filteredCustomer !== undefined ? (
        <div>{filteredCustomer.phone}</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          No Customers
          <button
            onClick={() => history.push("/customers")}
            className="success_btn"
            style={{
              width: "17%",
              textAlign: "center",
            }}
          >
            Add Customer
          </button>
        </div>
      )}
      <div className={styles.pageBody}>
        <div className={styles.pageBodyLeft}>
          <div className={styles.card}>
            <input
              type="search"
              placeholder="search here..."
              className={styles.input}
              name=""
              id=""
            />
          </div>
        </div>
        <div className={styles.pageBodyRight}>
          <div className={styles.card}>
            <div className={styles.bodyRightCardHeader}>
              <strong>Anekam Cart</strong>
            </div>
            <div className={styles.bodyRightCardBody}>
              <TableComponent
                actions={actions}
                extraCol="actions"
                data={data}
                columns={columns}
              />
              {!data.length > 0 && (
                <div style={{ margin: "15% 40%" }}>Nothing To Show</div>
              )}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.bodyRightFooterCard}></div>
          </div>
          <div className={styles.buttonWrapper}>
            <button
              className="success_btn"
              style={{
                width: "15%",
                textAlign: "center",
              }}
            >
              Pay
            </button>
            <button
              className="success_btn"
              style={{
                width: "15%",
                textAlign: "center",
              }}
            >
              Save
            </button>
            <button
              className="success_btn"
              style={{
                width: "15%",
                textAlign: "center",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pageFooter}></div>
    </main>
  );
}

export default CreateBill;
