import React from "react";

export default function Loading() {
  return (
    <div className="loading-screen">
      <img src="/images/logo2.png" alt="Logo" className="loading-logo" />
      <div className="spinner"></div>
      <h1>Loading...</h1>
    </div>
  );
}

