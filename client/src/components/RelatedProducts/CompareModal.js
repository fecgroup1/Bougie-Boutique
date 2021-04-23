import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ThemeConsumer } from 'styled-components'
import Chart from './Chart.js'

const CompareModal = ({product, comparisonProduct, resetCompare}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (comparisonProduct) {
      setModalIsOpen(true);
    }
  }, [comparisonProduct])

  return(
    <ThemeConsumer>
      { theme =>
          <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose = {() => {setModalIsOpen(false); resetCompare(null)}}
          style={{
            overlay: {
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0,0,0, 0.5)',
              zIndex: '1'
            },
            content: {
              position: 'relative',
              backgroundColor: theme.bg,
              inset: 'unset',
              width: 'max-content',
              margin: 'auto',
              marginTop: '15vh',
              border: `15px solid ${theme.bluGry}`,
              boxShadow: `10px 15px 15px #cccccc`
            }
          }}
          overlayClassName={{
            base: 'compareModalOverlay',
            afterOpen: 'compareModalOverlay-in',
            beforeClose: 'compareModalOverlay-out'
          }}
        >
          <Chart
            product={product}
            comparison={comparisonProduct}
            theme={theme}
           />
        </Modal>
      }

    </ThemeConsumer>
  )
}
export default CompareModal