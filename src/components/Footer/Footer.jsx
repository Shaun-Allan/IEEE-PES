import React from "react";
import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-whole">
      <footer className="footer">
        <div className="footer-left">
          <h3>IEEE Power &amp; Energy Society</h3>
        </div>
        <div className="footer-center">
          <a
            href="https://www.instagram.com/ssn_ieee_pes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/company/ieeepes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:ieeepes@ssn.edu.in">
            <FaEnvelope />
          </a>
        </div>
        <div className="footer-right">
          <p>All rights reserved. 2024 &copy;</p>
        </div>
      </footer>

      <div className="divider"></div>

      <div className="footer-credits">
        <span>
          Built by Shaun Allan H, Prathiyangira Devi, Aswathy AR and Pradeep KM
        </span>
      </div>
    </div>
  );
};

export default Footer;
