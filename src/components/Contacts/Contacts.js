import React from "react";
import ContactItem from "../ContactItem/ContactItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./Contacts.module.css";
import groupStyles from "../Transitions/group.module.css";
import PropTypes from "prop-types";

function Contacts({ contacts, onDelete }) {
  return (
    <TransitionGroup component="ul" className={styles.list}>
      {contacts.map((contact) => (
        <CSSTransition key={contact.id} timeout={250} classNames={groupStyles}>
          <ContactItem cont={contact} onItemDelete={onDelete} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string).isRequired),
  onDelete: PropTypes.func,
};

export default Contacts;
