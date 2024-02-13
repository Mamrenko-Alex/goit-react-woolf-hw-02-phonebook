import { nanoid } from "nanoid";
import { Component } from "react";
import styles from "./PhoneBook/PhoneBook.module.css";
import { ContactForm } from './PhoneBook/ContactForm';
import { ContactList } from "./PhoneBook/ContactList";
import { SearchFilter } from './PhoneBook/SearchFilter'

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    return
  };

  addContact = (event) => {
    event.preventDefault();
    console.log(event.target.name.value);
    const newContact = {
      id: nanoid(),
      name: event.target.name.value,
      number: event.target.number.value
    };
    if (this.state.contacts.find(({ name }) => name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`)
      return
    }
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: ''
    }));
    return
  }

  deleteContact = (deleteId) => {
    const newContact = this.state.contacts.filter(({ id }) => id !== deleteId)
    this.setState({ contacts: newContact })
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase())
    })
    console.log(filteredContacts);
    return (
      <div className={styles.container}>
        <h1 className={styles.hero}>Phonebook</h1>
        <ContactForm handleSubmit={this.addContact}/>
        <h2 className={styles.title}>Contacts</h2>
        <SearchFilter value={filter} onChange={this.handleChange}/>
        <ContactList
          contacts={filter === '' ? contacts : filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
