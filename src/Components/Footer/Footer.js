// Footer.js
import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p
      style={{
        color:"white",
        fontSize:"1.3rem",
        letterSpacing:"0.1rem",
      }}
      >CSEA present's Fantasy League </p>
    </footer>
  );
}

export default Footer;
