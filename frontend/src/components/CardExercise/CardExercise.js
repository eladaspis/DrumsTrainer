import React, { useCallback } from 'react';
import styles from "./CardExercise.module.scss";

class CardHeader extends React.Component {
render() {
  return (
    <header className={styles.cardHeader}>
      <button className={`${styles.button} ${styles.buttonMore}`} onClick={this.props.onClick} >Start Train !</button>
      <img src={this.props.header_image} className={styles.cardHeaderImage}/>
    </header>
  )
}
}

class CardBody extends React.Component {
render() {
  return (
    <section className={styles.cardBody}>
      <h2>{this.props.show_title}</h2>
      <p>{this.props.show_description}</p>
    </section>
  )
}
}

class Card extends React.Component {
render() {
  return (
    <article className={styles.card}>
      <CardHeader onClick={this.props.onclick} {...this.props.details}/>
      <CardBody {...this.props.details}/>
    </article>
  )
}
}

class CardExercise extends React.Component{
  constructor(props) {
    super();
    let card_data =  {
      "header_image": props.header_image,
      "show_title": props.title,
      "show_description": props.description
    }
    this.state = {
      card_info: {}
    }
  }

  componentWillMount() {
    this.setState({
      card_info: this.props
    })
  }
  render() {
    return (
      <Card onClick={this.props.onClick} details={this.state.card_info}/>
    )
  }
}





export default CardExercise;
