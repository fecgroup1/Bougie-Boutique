import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ThemeConsumer } from 'styled-components'

const CompareModal = ({product, comparisonProduct, resetCompare}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (comparisonProduct) {
      console.log('i fired')
      setModalIsOpen(true);
    }
  }, [comparisonProduct])

  return(
    <ThemeConsumer>
      { theme =>
          <Modal
          isOpen={modalIsOpen}
          onRequestClose = {() => {setModalIsOpen(false); resetCompare(null)}}
          style={{
            overlay: {
              backdropFilter: 'blur(5px)', backgroundColor: 'none',
              zIndex: '1'
            },
            content: {
              backgroundColor: theme.bg
            }
          }}
        >
          {console.log(theme)}
        </Modal>
      }

    </ThemeConsumer>
  )
}
export default CompareModal