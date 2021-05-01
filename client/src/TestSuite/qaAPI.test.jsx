import React from 'react'
import axios from 'axios';
import { render, fireEvent, waitFor, screen, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom'
import Questions from '../components/QandA/Questions.js';
import RenderQuestion from '../components/QandA/RenderQuestion.js';
import RenderAnswer from '../components/QandA/RenderAnswer.js';
import Answers from '../components/QandA/Answers.js';
import QandA from '../components/QandA'
import styled, { ThemeProvider } from 'styled-components';
import { Body, dark, light } from '../Styles';

var getQAResponse =
    [
        {
            "question_id": 66299,
            "question_body": "What fabric is the top made of?",
            "question_date": "2018-01-04T00:00:00.000Z",
            "asker_name": "yankeelover",
            "question_helpfulness": 13,
            "reported": false,
            "answers": {
                "630244": {
                    "id": 630244,
                    "body": "Something pretty soft but I can't be sure",
                    "date": "2018-01-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 7,
                    "photos": [
                        "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80",
                        "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
                        "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
                    ]
                },
                "630296": {
                    "id": 630296,
                    "body": "Suede",
                    "date": "2018-11-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 9,
                    "photos": []
                },
                "630334": {
                    "id": 630334,
                    "body": "Supposedly suede, but I think its synthetic",
                    "date": "2018-12-04T00:00:00.000Z",
                    "answerer_name": "metslover",
                    "helpfulness": 3,
                    "photos": []
                },
                "1719523": {
                    "id": 1719523,
                    "body": "glass",
                    "date": "2021-04-25T00:00:00.000Z",
                    "answerer_name": "jackson11",
                    "helpfulness": 0,
                    "photos": []
                }
            }
        },
        {
            "question_id": 183063,
            "question_body": "Expanded question about the fabric",
            "question_date": "2021-04-25T00:00:00.000Z",
            "asker_name": "AFA",
            "question_helpfulness": 7,
            "reported": false,
            "answers": {
                "1719548": {
                    "id": 1719548,
                    "body": "This is a boldness test",
                    "date": "2021-04-26T00:00:00.000Z",
                    "answerer_name": "Seller",
                    "helpfulness": 0,
                    "photos": []
                }
            }
        },
        {
            "question_id": 183087,
            "question_body": "4th fabric q",
            "question_date": "2021-04-26T00:00:00.000Z",
            "asker_name": "Subject 98",
            "question_helpfulness": 1,
            "reported": false,
            "answers": {}
        },
        {
            "question_id": 183085,
            "question_body": "Hello World",
            "question_date": "2021-04-26T00:00:00.000Z",
            "asker_name": "Shane",
            "question_helpfulness": 1,
            "reported": false,
            "answers": {
                "1719555": {
                    "id": 1719555,
                    "body": "Goodbye world",
                    "date": "2021-04-26T00:00:00.000Z",
                    "answerer_name": "Shai",
                    "helpfulness": 0,
                    "photos": [
                        "https://hr-fec-group12.s3.amazonaws.com/Frog_on_palm_frond.jpg",
                        "https://hr-fec-group12.s3.amazonaws.com/Ap_Creative_Stock_Header.jpg",
                        "https://hr-fec-group12.s3.amazonaws.com/Keyboard-Mouse-And-Smartphone-On-Wooden-Desk-800x600.jpg",
                        "https://hr-fec-group12.s3.amazonaws.com/photo-1518770660439-4636190af475.jpeg"
                    ]
                }
            }
        }
    ]

var getQAAnswers =
    [
        {
            "answer_id": 630296,
            "body": "Suede",
            "date": "2018-11-04T00:00:00.000Z",
            "answerer_name": "metslover",
            "helpfulness": 9,
            "photos": []
        },
        {
            "answer_id": 630244,
            "body": "Something pretty soft but I can't be sure",
            "date": "2018-01-04T00:00:00.000Z",
            "answerer_name": "metslover",
            "helpfulness": 7,
            "photos": [
                {
                    "id": 529294,
                    "url": "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                },
                {
                    "id": 529295,
                    "url": "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                },
                {
                    "id": 529296,
                    "url": "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
                }
            ]
        },
        {
            "answer_id": 630334,
            "body": "Supposedly suede, but I think its synthetic",
            "date": "2018-12-04T00:00:00.000Z",
            "answerer_name": "metslover",
            "helpfulness": 3,
            "photos": []
        },
        {
            "answer_id": 1719523,
            "body": "glass",
            "date": "2021-04-25T00:00:00.000Z",
            "answerer_name": "jackson11",
            "helpfulness": 0,
            "photos": []
        }
    ]

var store = {}
store.state = getQAResponse
store.getQuestions = getQAResponse
store.getAnswers = getQAAnswers

jest.mock('axios')

test('<QandA/> to render widget', async () => {
    const div = document.createElement('div')
    const {getByText} = render(
        <ThemeProvider theme={light}>
            <QandA store={store}/>, div
        </ThemeProvider>
    )
    await getByText('Loading', { exact: false});
  });


test('<RenderQuestion/> to render questions', async () => {
  const div = document.createElement('div')
  const promise = Promise.resolve(getQAAnswers)
  axios.get.mockResolvedValue(getQAAnswers)
  const {getByText} = render(
    <ThemeProvider theme={light}>
        <RenderQuestion question={getQAResponse[0]} index={1} product={{"name": "Camo Onesie"}}
        getAnswers={() => {return promise}} productId={'13023'}/>, div
    </ThemeProvider>
  )

  const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/answerNull/i))
    .then(() => {
    getByText('What fabric is the top made of?', { exact: false});
    })
  jest.resetAllMocks()
});


test('<RenderAnswer/> to render answers', () => {
const div = document.createElement('div')
const {getByText} = render(
    <ThemeProvider theme={light}>
        <RenderAnswer answer={getQAAnswers[0]} index={1}/>, div
    </ThemeProvider>
)
const answerBody = getByText('Suede', { exact: false});
});


test('Question to post helpful if helpful is clicked', async () => {
    const div = document.createElement('div')
    const promise = Promise.resolve(getQAAnswers)
    const {getByTestId} = render(
    <ThemeProvider theme={light}>
      <RenderQuestion question={getQAResponse[0]} index={1} product={{"name": "Camo Onesie"}}
        getAnswers={() => {return promise}} productId={'13023'}/>, div
    </ThemeProvider>
    )

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/answerNull/i))
    axios.put.mockResolvedValue({question_id: 66299});
    const helpful = getByTestId('questionHelpful');
    fireEvent.click(helpful)

    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toHaveBeenCalledWith('qa/questions/66299/helpful', null)
    jest.resetAllMocks()
  });

test('Answers to post helpful if helpful is clicked', () => {
const div = document.createElement('div')
const {getByTestId} = render(
<ThemeProvider theme={light}>
    <RenderAnswer answer={getQAAnswers[0]} index={1}/>, div
</ThemeProvider>
)
axios.put.mockResolvedValue({answer_id: 630296});
const helpful = getByTestId('answerHelpful');
fireEvent.click(helpful)

expect(axios.put).toHaveBeenCalledTimes(1)
expect(axios.put).toHaveBeenCalledWith('qa/answers/630296/helpful', null)
jest.resetAllMocks()
});

test('Question to report if report is clicked', async () => {
    const div = document.createElement('div')
    const promise = Promise.resolve(getQAAnswers)
    const {getByTestId} = render(
    <ThemeProvider theme={light}>
      <RenderQuestion question={getQAResponse[0]} index={1} product={{"name": "Camo Onesie"}}
       getAnswers={() => {return promise}} productId={'13023'}/>, div
    </ThemeProvider>
    )

    axios.put.mockResolvedValue({question_id: 66299});
    const report = getByTestId('questionReport');
    fireEvent.click(report)

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/answerNull/i))
    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(axios.put).toHaveBeenCalledWith('qa/questions/66299/report', null)
    jest.resetAllMocks()
  });

test('Answer to report if report is clicked', () => {
const div = document.createElement('div')
const {getByTestId} = render(
<ThemeProvider theme={light}>
    <RenderAnswer answer={getQAAnswers[0]} index={1}/>, div
</ThemeProvider>
)

axios.put.mockResolvedValue({answer_id: 630296});
const report = getByTestId('answerReport');
fireEvent.click(report)

expect(axios.put).toHaveBeenCalledTimes(1)
expect(axios.put).toHaveBeenCalledWith('qa/answers/630296/report', null)
jest.resetAllMocks()
});

test('<Questions/> to open question modal when clicked', async () => {
  const div = document.createElement('div')
  const answerPromise = Promise.resolve(getQAAnswers)
  const questionPromise = Promise.resolve(getQAResponse)
  axios.get.mockResolvedValue(getQAAnswers)
  const {getByText, getByTestId} = render(
    <ThemeProvider theme={light}>
        <Questions question={getQAResponse[0]} index={1} product={{"name": "Camo Onesie"}}
        getAnswers={() => {return answerPromise}} getQuestions={() => {return questionPromise}} productId={'13023'}/>, div
    </ThemeProvider>
  )

  const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/questionNull/i))
    .then(() => {
    getByText('What fabric is the top made of?', { exact: false});
    })
  const newQuestion = getByTestId('addQuestion');
  fireEvent.click(newQuestion)
  await waitFor(() => {
    const htmlElement = document.querySelector('[data-testid="questionModal"]');
    expect(htmlElement).toBeInTheDocument();
  });
  jest.resetAllMocks()
});

test('<Questions/> to open answer modal when clicked', async () => {
    const div = document.createElement('div')
    const answerPromise = Promise.resolve(getQAAnswers)
    const questionPromise = Promise.resolve([getQAResponse[0]])
    axios.get.mockResolvedValue(getQAAnswers)
    const {getByText, getByTestId} = render(
      <ThemeProvider theme={light}>
          <Questions question={getQAResponse[0]} index={1} product={{"name": "Camo Onesie"}}
          getAnswers={() => {return answerPromise}} getQuestions={() => {return questionPromise}} productId={'13023'}/>, div
      </ThemeProvider>
    )

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/questionNull/i))
      .then(() => {
      getByText('What fabric is the top made of?', { exact: false});
      })
    const newAnswer = getByTestId('addAnswer');
    fireEvent.click(newAnswer)
    await waitFor(() => {
      const htmlElement = document.querySelector('[data-testid="answerModal"]');
      expect(htmlElement).toBeInTheDocument();
    });
    jest.resetAllMocks()
  });

  test('<Questions/> to load more 2 more questions when more questions button clicked', async () => {
    const div = document.createElement('div')
    const answerPromise = Promise.resolve(getQAAnswers)
    const questionPromise = Promise.resolve(getQAResponse)
    axios.get.mockResolvedValue(getQAAnswers)
    const {getByText, getByTestId} = render(
      <ThemeProvider theme={light}>
          <Questions question={getQAResponse[0]} index={1} product={{"name": "Camo Onesie"}}
          getAnswers={() => {return answerPromise}} getQuestions={() => {return questionPromise}} productId={'13023'}/>, div
      </ThemeProvider>
    )

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/questionNull/i))
      .then(() => {
      getByText('What fabric is the top made of?', { exact: false});
      })
    const loadMoreQuestions = getByTestId('moreQuestions');
    fireEvent.click(loadMoreQuestions)
    await waitFor(() => {
        getByText('Hello World', { exact: false});
    });
    jest.resetAllMocks()
  });

  test('<Answers/> to load all ansewrs when more questions button clicked and collapse back to 2 when collapse button clicked', async () => {
    const div = document.createElement('div')
    const answerPromise = Promise.resolve(getQAAnswers)
    const questionPromise = Promise.resolve(getQAResponse)
    axios.get.mockResolvedValue(getQAAnswers)
    const {getByText, getByTestId} = render(
      <ThemeProvider theme={light}>
          <Answers questionId={'66299'} index={1} product={{"name": "Camo Onesie"}}
          getAnswers={() => {return answerPromise}}/>, div
      </ThemeProvider>
    )

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/answerNull/i))
      .then(() => {
      getByText('Something pretty soft but I can\'t be sure', { exact: false});
      })
    const loadMoreAnswers = getByTestId('moreAnswers');
    fireEvent.click(loadMoreAnswers)
    getByText('glass', { exact: false});

    const collapseAnswers = getByTestId('lessAnswers');
    fireEvent.click(collapseAnswers)
    getByTestId('moreAnswers')

    jest.resetAllMocks()
  });
