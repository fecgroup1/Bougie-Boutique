import styled from 'styled-components'

export const QuestionsContainer = styled.div`
  min-width: 50%;
  max-width: 1200px;
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
    width: 90%;
    height: 40px;
    margin-bottom: 15px;
    font-size: 1em;
    font-family: 'Josefin Sans', sans-serif;
  }
`;

export const QAModalInput = styled.input`
  & {
    margin-left: 10px;
    margin-top: 5px;
    width: 70%;
    font-size: 14px;
    background: transparent;
    border: none;
    border-bottom: 1px solid ${props => props.theme.text};
    font-family: 'Josefin Sans', sans-serif;
    }
  &:: placeholder {
    color: rgb(100, 100, 100)
    font-family: 'Josefin Sans', sans-serif;
  }
  &: focus {
    border-bottom: 1px solid ${props => props.theme.text};
    outline: none;
  }
`;

export const CloseModalButton = styled.button`
  & {
    border: none;
    display: inline-block;
    padding: 8px 16px;
    vertical-align: middle;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    background-color: inherit;
    text-align: center;
    cursor: pointer;
    white-space: nowrap;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 22px;
  }
  &: hover {
    cursor: pointer;
  }
`;

export const Warning = styled.p`
  & {
    font-size: 13px;
    font-family: 'Josefin Sans', sans-serif;
  }
`;

export const Required = styled.p`
  & {
    padding-top: 10px;
    font-size: 14px;
    font-family: 'Josefin Sans', sans-serif;
  }
`;

export const MoreAnswers = styled.a`
  & {
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    text-decoration: underline;
    padding-bottom: 20px;
    margin-left: 26px;
  }
  &: hover {
    cursor: pointer;
  }
`;

export const HelpfulButton = styled.a`
  & {
    margin-left: 10px;
    text-decoration: underline;
  }
  &: hover {
    cursor: pointer;
  }
`;

export const ReportButton = styled.a`
  & {
    font-size: 14px;
    color: ${props => props.theme.text};
    margin-left: 15px;
    opacity: 0.65;
  }
  &: hover {
    cursor: pointer;
  }
`;

export const AddAnswerButton = styled.a`
  & {
    float: right;
    margin: 0px;
    font-size: 14px;
    padding-left: 5px;
    text-decoration: underline;
  }
  &: hover {
    cursor: pointer;
  }
`;