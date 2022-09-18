import React from "react";
import classes from "./Footer.module.css";
import logo from '../../../Assets/logo.jpeg'

const Footer = () => {

  return (
    <footer className={classes["footer-distributed"]}>
      <div className={classes["footer-left"]}>
        <img src={logo} alt='Fast Food Logo'/>
        <h3>
          <span> FastFrankies</span>
        </h3>

        <p className={classes["footer-company-name"]}>
          © 2020 Fast Food pvt. ltd
        </p>
      </div>

      <div className={classes["footer-center"]}>
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>c-206 - Frankie Shop, building no 23,Gandhi Road,</span>
            Navi Mumbai - 400710
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+91 8369288158</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>

          <p>

              ritikchoudhary961.com
          </p>
        </div>
      </div>
      <div className={classes["footer-right"]}>
        <p className="footer-company-about">
          <span>About the company </span>
          We Provide delecious Frankies in different price range and with
          various varaties
        </p>
        {/* <div className="footer-icons">
          <a href="https://www.facebook.com/ritik.choudhary.9066">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/ritikchoudhary_25/">
            <i className="fa fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/ritik-choudhary-0932b6202/">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://www.youtube.com/">
            <i className="fa fa-youtube"></i>
          </a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;