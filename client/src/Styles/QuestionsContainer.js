import styled from 'styled-components'

export const QuestionsContainer = styled.div`
  width: 70%;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

export const QuestionCardsContainer = styled.div`
  max-height: 65vh;
  overflow-y: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;

  ::-webkit-scrollbar {
    width: 10px
  }

  ::-webkit-scrollbar-track {
    border: 1px solid ${props => props.theme.text};
    padding: 2px 0;
    background-color: ${props => props.theme.bg};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: ${props => props.theme.text};
    border: 1px solid #000;
  }

`;

export const QuestionHead = styled.div`
  display: inline;
  position: relative;
`;

export const QuestionsButtons = styled.button`
  & {
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #002a60;
    transition: background 0.5s;
    padding: 10px;
    text-align: center;
    max-height: 6vh;
    margin-top: 5px;
    margin-right: 20px;
    font-size: 14px;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
  }
  &: hover {
    background: #002a60;
  }
`;

export const SearchBar = styled.input`
  & {
    position: relative;
    border: 2px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: transparent;
    outline: #002a60;
    padding-left: 60px;
    width: 85%;
    height: 40px;
    margin-bottom: 15px;
    font-size: 1em;
    font-family: 'Josefin Sans', sans-serif;
  }
`;