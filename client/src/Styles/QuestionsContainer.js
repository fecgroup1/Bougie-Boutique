import styled from 'styled-components'

export const QuestionsContainer = styled.div`
  width: 70%;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

export const QuestionCardsContainer = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  ::-webkit-scrollbar {
    width: 10px
  }

  ::-webkit-scrollbar-track {
    border: 1px solid #000;
    padding: 2px 0;
    background-color: #404040;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #737272;
    border: 1px solid #000;
  }

`;