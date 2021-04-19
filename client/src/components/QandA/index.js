import React from 'react'
import WidgetContainer from '../../Styles'
import Questions from './Questions.js'

const QandA = ({store}) => (
<<<<<<< HEAD
  <div>I am a Question thing{store.state.currentProductId}</div>
=======
  <div>I am a Question thing {store.currentProductId}
    <Questions currentProductId={store.currentProductId}/>
  </div>
>>>>>>> rendering 2 questions on the QA widget
  )

export default QandA;