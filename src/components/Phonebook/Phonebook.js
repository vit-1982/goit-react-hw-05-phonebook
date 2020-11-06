import React, { Component } from "react";
import styles from "./Phonebook.module.css";
import { v4 as uuidv4 } from "uuid";

export default class Phonebook extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const contact = {
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    };
    if (contact.name !== "") {
      this.props.onAddContact(contact);
      this.setState({ name: "", number: "" });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            className={styles.input}
            required
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            value={number}
            onChange={this.handleChange}
            name="number"
            className={styles.input}
            required
          />
        </label>
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    );
  }
}
