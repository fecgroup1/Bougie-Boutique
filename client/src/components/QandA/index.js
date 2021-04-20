import React from 'react'
import WidgetContainer from '../../Styles'
import Questions from './Questions.js'

const QandA = ({store}) => (
  <div>I am a Question thing {store.state.currentProductId}
    <Questions currentProductId={store.state.currentProductId}/>
  </div>
  )

export default QandA;