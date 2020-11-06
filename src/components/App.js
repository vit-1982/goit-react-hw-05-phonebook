import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import MainTitle from "./MainTitle/MainTitle";
import Phonebook from "./Phonebook/Phonebook";
import Note from "./Note/Note";
import Contacts from "./Contacts/Contacts";
import Filter from "./Filter/Filter";
import scaleStyles from "./Transitions/scale.module.css";
import itemAppearStyles from "./Transitions/itemAppear.module.css";
import noteAppearStyles from "./Transitions/noteAppear.module.css";

export default class Add extends Component {
  state = {
    contacts: [],
    filter: "",
    inList: false,
  };

  componentDidMount() {
    const storage = localStorage.getItem("contacts");
    if (storage) {
      this.setState({
        contacts: JSON.parse(storage),
      });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  resetInListValue = () => setTimeout(this.setState({ inList: false }), 2000);

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  addContact = ({ id, name, number }) => {
    const nameInList = this.state.contacts.find(
      (contact) => contact.name === name
    );
    if (nameInList) {
      this.setState({ inList: true });
      return;
    }
    this.setState((prevState) => ({
      contacts: [{ id, name, number }, ...prevState.contacts],
      inList: false,
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter, inList } = this.state;
    const filtredContacts = this.getFilteredContacts();
    return (
      <div>
        <MainTitle message="Phonebook" />

        <CSSTransition
          in={inList}
          appear
          timeout={250}
          classNames={noteAppearStyles}
          unmountOnExit
        >
          <Note timeout={this.resetInListValue} />
        </CSSTransition>

        <Phonebook onAddContact={this.addContact} />
        <CSSTransition
          in={contacts.length > 0}
          appear
          timeout={250}
          classNames={itemAppearStyles}
        >
          <>
            <CSSTransition
              in={contacts.length > 1}
              classNames={scaleStyles}
              timeout={250}
              unmountOnExit
            >
              <Filter value={filter} onChangeFilter={this.changeFilter} />
            </CSSTransition>

            <Contacts
              contacts={filtredContacts}
              onDelete={this.deleteContact}
            />
          </>
        </CSSTransition>
      </div>
    );
  }
}
