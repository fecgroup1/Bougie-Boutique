import React from 'react';
import Modal from 'react-modal';

import { Loading, MainImg, MainNull } from './../../../Styles/Overview';

const overlayStyles = {
  zIndex: 10,
}


// Add x in corner to close Modal
const ExpandedView = ({styles, currImg, isOpen, handleModalOpen}) => {

  return (
    <Modal
      style={{ overlay: overlayStyles }}
      isOpen={isOpen}
      onRequestClose={() => handleModalOpen(false)}
      appElement={document.getElementById('app')}>
      <div>Hello I am a Modal.</div>
    </Modal>
  );
};

export default ExpandedView;