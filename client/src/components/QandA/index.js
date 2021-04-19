import React from 'react'
import WidgetContainer from '../../Styles'
import Question from './Question.js'

const QandA = ({store}) => (
  <div>I am a Question thing{store.state.currentProductId}</div>
  )

export default QandA;