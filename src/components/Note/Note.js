import React from "react";
import styles from "./Note.module.css";

export default class Note extends React.Component {
  componentDidMount() {
    setTimeout(this.props.timeout, 2000);
  }
  render() {
    return <div className={styles.box}>Contact already exist!</div>;
  }
}
