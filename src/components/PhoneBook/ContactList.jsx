import styles from "./PhoneBook.module.css";
import { Component } from "react";

export class ContactList extends Component {
    render() {
        const { contacts, onDeleteContact } = this.props;

        return (
        <ul className={styles.contacts_list}>
          {contacts.map(({ id, name, number}) => (
            <li key={id} className={styles.contact_item}>
              {name} {number}
              <button type="button" onClick={() => onDeleteContact(id)}>Delete</button>
            </li>
          ))}
        </ul>
        )
    }
}
