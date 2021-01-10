import React from 'react';
import { Answer } from './index';

const AnswersList = ({ answers }) => {
  return (
    <div className="c-grid__answer">
      {
        answers.map((value, index) => {
          return <Answer content={value.content} key={index} />
        })
      }
    </div>
  )
}

export default AnswersList
