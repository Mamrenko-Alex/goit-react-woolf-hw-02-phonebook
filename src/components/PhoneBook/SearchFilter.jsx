import styles from "./PhoneBook.module.css";
import { Component } from "react";

export class SearchFilter extends Component {
    render() {
        const { value, onChange  } = this.props

        return (
            <>
                <label className={styles.label_search} htmlFor="search_input">Find the contacts by name </label>
                <input
                    type="text"
                    className={styles.search}
                    onChange={onChange}
                    id="search_input"
                    name="filter"
                    value={value}
                    title='Find the numer in yor phonebook by name'
                />
            </>
        )
    }
}