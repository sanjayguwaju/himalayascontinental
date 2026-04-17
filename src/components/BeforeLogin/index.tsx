import React from "react";

const BeforeLogin: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: "#003087" }}>
        Himalayas Continental Pvt. Ltd.
      </h2>
      <p style={{ fontSize: "1rem", color: "#64748b", marginBottom: "1.5rem" }}>
        <b>Authorized Distributor & Wholesaler of Medical Equipment</b>
        <br />
        Exclusive Medical Equipment Partner in Nepal
      </p>
      <div
        style={{
          backgroundColor: "#f1f5f9",
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          color: "#64748b",
        }}
      >
        Please sign in with your admin credentials to manage products, pages, and site content.
      </div>
    </div>
  );
};

export default BeforeLogin;
