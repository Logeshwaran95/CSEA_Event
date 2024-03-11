import React from 'react';
import styles from './Footer.module.css'; // Assuming you're using CSS modules

function Footer() {
  return (
    <footer className={styles.footer}>
      <p
        style={{
          color: "white",
          fontSize: "1.3rem",
          letterSpacing: "0.1rem",
        }}
      >
        CSEA presents Fantasy League
      </p>
    </footer>
  );
}

export default Footer;
