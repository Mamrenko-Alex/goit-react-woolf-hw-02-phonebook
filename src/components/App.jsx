import { nanoid } from "nanoid";
import { Component } from "react";
import styles from "./PhoneBook/PhoneBook.module.css";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }
  
  handleChange = (event) => {
    const field = event.target.name;
    this.setState({ [field]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number
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
  }

  handlerDeleteNumber = (deleteId) => {
    const newContact = this.state.contacts.filter(({ id }) => id !== deleteId)
    this.setState({ contacts: newContact })
  }

  render() {
    const { name, number, filter, contacts } = this.state;
    return (
      <div className={styles.container}>

          <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label} htmlFor="name_input">Name </label>
          <input
            className={styles.input}
            onChange={this.handleChange}
            id="name_input"
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <br/>
          <label className={styles.label} htmlFor="number_input">Number </label>
          <input
            className={styles.input}
            onChange={this.handleChange}
            id="number_input"
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button className={styles.button} type="submit">Add contact</button>
        </form>
        <h2 className={styles.title}>Contacts</h2>
        <label className={styles.label_search} htmlFor="search_input">Find the contacts by name</label>
        <input
          type="text"
          className={styles.search}
          onChange={this.handleChange}
          id="search_input"
          name="filter"
          value={filter}
          title='Find the numer in yor phonebook by name'
        />
        <ul className={styles.contacts_list}>
          {contacts.map(({ id, name, number}) => (
            <li key={id} className={styles.contact_item}>
              {name} {number}
              <button type="button" onClick={() => this.handlerDeleteNumber(id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
