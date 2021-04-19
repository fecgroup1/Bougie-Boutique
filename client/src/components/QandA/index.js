import React from 'react'
import WidgetContainer from '../../Styles'
import Questions from './Questions.js'

const QandA = ({store}) => (
  <div>I am a Question thing {store.currentProductId}
    <Questions currentProductId={store.currentProductId}/>
  </div>
  )

export default QandA;