import React from 'react';
import styles from './Footer.module.css'; // Assuming you're using CSS modules

function Footer() {
  return (
    <footer className={styles.footer}>
      <p
        style={{
          color: "white",
          fontSize: "1rem",
          letterSpacing: "0.1rem",
          paddingTop: "6px"
        }}
      >
        &copy; Copyright 2024 CSEA-CEG. All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
