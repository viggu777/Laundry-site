import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Order document data:", data); // Debug log
          ordersData.push({ id: doc.id, ...data });
        });
        console.log("All orders data:", ordersData); // Debug log
        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Helper function to get email from different possible field names
  const getEmail = (order) => {
    return (
      order.userEmail ||
      order.email ||
      order.user_email ||
      order.customerEmail ||
      "Not provided"
    );
  };

  // Helper function to format items for display
  const formatItems = (items) => {
    if (!items || !Array.isArray(items)) return "No items";

    return items
      .map(
        (item) =>
          `${item.item || "Unknown"} (${item.category || "N/A"}) - Qty: ${
            item.quantity || 0
          }`
      )
      .join(", ");
  };

  // Helper function to get details from the order
  const getDetails = (order) => {
    const parts = [];

    if (order.items && Array.isArray(order.items)) {
      parts.push(`Items: ${formatItems(order.items)}`);
    }

    if (order.status) {
      parts.push(`Status: ${order.status}`);
    }

    if (order.createdAt) {
      const date = new Date(order.createdAt).toLocaleString();
      parts.push(`Created: ${date}`);
    }

    return parts.length > 0 ? parts.join(" | ") : "No details available";
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      backgroundColor: "#ffffff",
      padding: "20px 30px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      color: "#1e293b",
      fontSize: "28px",
      fontWeight: "bold",
      margin: 0,
    },
    logoutButton: {
      backgroundColor: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
      outline: "none",
    },
    logoutButtonHover: {
      backgroundColor: "#b91c1c",
    },
    ordersSection: {
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      minHeight: "400px",
    },
    sectionTitle: {
      color: "#1e293b",
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "25px",
      borderBottom: "3px solid #3b82f6",
      paddingBottom: "10px",
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
      color: "#64748b",
    },
    loadingSpinner: {
      width: "40px",
      height: "40px",
      border: "4px solid #e2e8f0",
      borderTop: "4px solid #3b82f6",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginBottom: "20px",
    },
    loadingText: {
      fontSize: "16px",
      fontWeight: "500",
    },
    noOrders: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "18px",
      padding: "60px 20px",
      backgroundColor: "#f8fafc",
      borderRadius: "8px",
      border: "2px dashed #cbd5e1",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    tableHeader: {
      backgroundColor: "#f1f5f9",
      borderBottom: "2px solid #e2e8f0",
    },
    tableHeaderCell: {
      padding: "16px 20px",
      textAlign: "left",
      fontWeight: "600",
      color: "#374151",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    tableRow: {
      borderBottom: "1px solid #e2e8f0",
      transition: "background-color 0.2s",
    },
    tableRowHover: {
      backgroundColor: "#f8fafc",
    },
    tableCell: {
      padding: "16px 20px",
      color: "#4b5563",
      fontSize: "14px",
      maxWidth: "200px",
      wordWrap: "break-word",
    },
    orderIdCell: {
      fontFamily: "monospace",
      fontSize: "12px",
      backgroundColor: "#f1f5f9",
      color: "#1e293b",
      fontWeight: "500",
      borderRadius: "4px",
      padding: "4px 8px",
      display: "inline-block",
    },
    emailCell: {
      color: "#3b82f6",
      fontWeight: "500",
    },
    detailsCell: {
      maxWidth: "300px",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .logout-btn:hover {
            background-color: #b91c1c !important;
          }
          
          .table-row:hover {
            background-color: #f8fafc !important;
          }
        `}
      </style>

      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <button
          style={styles.logoutButton}
          className="logout-btn"
          onClick={handleAdminLogout}
        >
          Logout Admin
        </button>
      </div>

      <div style={styles.ordersSection}>
        <h2 style={styles.sectionTitle}>All Laundry Orders</h2>

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading orders data...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={styles.noOrders}>
            <p>No orders found.</p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Order ID</th>
                <th style={styles.tableHeaderCell}>User Email</th>
                <th style={styles.tableHeaderCell}>Status</th>
                <th style={styles.tableHeaderCell}>Items</th>
                <th style={styles.tableHeaderCell}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  style={styles.tableRow}
                  className="table-row"
                >
                  <td style={styles.tableCell}>
                    <span style={styles.orderIdCell}>{order.id}</span>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.emailCell }}>
                    {getEmail(order)}
                  </td>
                  <td style={styles.tableCell}>
                    <span
                      style={{
                        ...styles.orderIdCell,
                        backgroundColor:
                          order.status === "Pending" ? "#fef3c7" : "#dcfce7",
                        color:
                          order.status === "Pending" ? "#92400e" : "#166534",
                      }}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.detailsCell }}>
                    {formatItems(order.items)}
                  </td>
                  <td style={styles.tableCell}>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
