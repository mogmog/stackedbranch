import React, { Component } from 'react';
import styles from './BubbleMock.less';

export default class BubbleTooltip extends Component {

  render() {
    const { lines } = this.props;

    if (!lines) return null;
    const translations = {'Alto': 'High', 'Medio-Alto': 'Medium High', 'Medio': 'Medium', 'Bajo': 'Low'};

    return (
      <ul>
        <li><strong>TYPE</strong> {lines[2]}</li>
        <li><strong>GENDER</strong> {lines[0]}</li>
        <li><strong>STATUS</strong> {translations[lines[3]]}</li>
        <li><strong>TOTAL</strong> {lines[1]}</li>
      </ul>
    );
  }
}
