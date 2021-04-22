import styled from 'styled-components'

export const QuestionsContainer = styled.div`
  width: 85%;
  padding: 0 2vw;
  max-height: 70vh;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px
  }

  ::-webkit-scrollbar-track {
    border: 1px solid #000;
    padding: 2px 0;
    background-color: #404040;
  }

  .QABody::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #737272;
    border: 1px solid #000;
  }

`;