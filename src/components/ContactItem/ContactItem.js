import React from "react";
import styles from "./ContactItem.module.css";

const ContactItem = ({ cont, onItemDelete }) => {
  const { id, name, number } = cont;
  return (
    <li className={styles.listItem}>
      <p className={styles.p}>
        {name}
        <span>{number}</span>
      </p>
      <button
        type="button"
        className={styles.button}
        onClick={() => onItemDelete(id)}
      ></button>
    </li>
  );
};

export default ContactItem;
