import React, { useState } from "react";
import img from "../../img/img.png";

export const EstiloContact = () => {
 
  return (
    <div className="container">
      <div className="card mb-3">
        <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img id="card" src={img} className="img-fluid p-3" alt="Card image" />
        </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <div className="d-flex flex-column align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <p className="card-text mb-0">dfvfvgf</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fa-solid fa-phone me-2"></i>
                  <p className="card-text mb-0">dfvfvgf</p>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-envelope me-2"></i>
                  <p className="card-text mb-0">dfvfvgf</p>
                </div>
              </div>
              <div>
                <div className="position-absolute top-0 end-0 p-3">
                  <i className="fa-solid fa-pencil me-2"></i>
                  <i className="fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

