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
import {getQAResponse, getQAAnswers} from './../Utils/dummyQA.json'

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

    const questions = screen.getAllByLabelText(/renderedQuestion/i);
    expect(questions.length).toEqual(1);
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
    const Answers = screen.getAllByLabelText(/renderedAnswer/i);
    expect(Answers.length).toEqual(1);
});

test('<RenderAnswer/> to open a photo when clicked on', () => {
    const div = document.createElement('div')
    const {getByText, getByTestId} = render(
        <ThemeProvider theme={light}>
            <RenderAnswer answer={getQAAnswers[0]} index={1}/>, div
        </ThemeProvider>
    )
    const photoModal = getByTestId('photoModal');
    fireEvent.click(photoModal)
    const htmlElement = document.querySelector('[data-testid="openImgModal"]');
    expect(htmlElement).toBeInTheDocument();
    const openImgModal = getByTestId('openImgModal')
    fireEvent.click(openImgModal)
    expect(htmlElement).not.toBeInTheDocument();
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
            <Questions index={1} product={{"name": "Camo Onesie"}}
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

    const questionBodyText = getByTestId('questionBodyText')
    const questionBodyNickname = getByTestId('questionBodyNickname')
    const questionBodyEmail = getByTestId('questionBodyEmail')


    fireEvent.change(questionBodyText, { target : { value: 'Question'} })
    fireEvent.change(questionBodyNickname, { target : { value: 'Person'} })
    fireEvent.change(questionBodyEmail, { target : { value: 'not a valid email'} })


    const submitAttempt = getByTestId('submitQuestionModal')
    fireEvent.click(submitAttempt)
    await waitFor(() => {
        const invalidHtmlElement = document.querySelector('[data-testid="questionModal"]');
        expect(invalidHtmlElement).toBeInTheDocument();
        });

    const closeModal = getByTestId('closeQuestionModal')
    fireEvent.click(closeModal)
    await waitFor(() => {
        const oldHtmlElement = document.querySelector('[data-testid="questionModal"]');
        expect(oldHtmlElement).not.toBeInTheDocument();
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
          <Questions index={1} product={{"name": "Camo Onesie"}}
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

    const answerBodyText = getByTestId('answerBodyText')
    const answerBodyNickname = getByTestId('answerBodyNickname')
    const answerBodyEmail = getByTestId('answerBodyEmail')


    fireEvent.change(answerBodyText, { target : { value: 'Answer'} })
    fireEvent.change(answerBodyNickname, { target : { value: 'Person'} })
    fireEvent.change(answerBodyEmail, { target : { value: 'not a valid email'} })


    const submitAttempt = getByTestId('submitAnswerModal')
    fireEvent.click(submitAttempt)
    await waitFor(() => {
      const invalidHtmlElement = document.querySelector('[data-testid="answerModal"]');
      expect(invalidHtmlElement).toBeInTheDocument();
      });

    // Need to refactor for actual image upload
    const answerPhotoUpload = getByTestId('addAnswerPhoto')
    fireEvent.change(answerPhotoUpload, { target : { value: ''}})

    const closeModal = getByTestId('closeAnswerModal')
    fireEvent.click(closeModal)
    await waitFor(() => {
      const oldHtmlElement = document.querySelector('[data-testid="answerModal"]');
      expect(oldHtmlElement).not.toBeInTheDocument();
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
          <Questions index={1} product={{"name": "Camo Onesie"}}
          getAnswers={() => {return answerPromise}} getQuestions={() => {return questionPromise}} productId={'13023'}/>, div
      </ThemeProvider>
    )

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/questionNull/i))
      .then(() => {
      getByText('What fabric is the top made of?', { exact: false});
      const Questions = screen.getAllByLabelText(/renderedQuestion/i);
      expect(Questions.length).toEqual(2);
      })
    const loadMoreQuestions = getByTestId('moreQuestions');
    fireEvent.click(loadMoreQuestions)
    await waitFor(() => {
        getByText('Hello World', { exact: false});
    });
    const moreQuestions = screen.getAllByLabelText(/renderedQuestion/i);
    expect(moreQuestions.length).toEqual(4);
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
      const Answers = screen.getAllByLabelText(/renderedAnswer/i);
      expect(Answers.length).toEqual(2);
      })
    const loadMoreAnswers = getByTestId('moreAnswers');
    fireEvent.click(loadMoreAnswers)
    getByText('glass', { exact: false});
    const moreAnswers = screen.getAllByLabelText(/renderedAnswer/i);
    expect(moreAnswers.length).toEqual(4);

    const collapseAnswers = getByTestId('lessAnswers');
    fireEvent.click(collapseAnswers)
    getByTestId('moreAnswers')
    const lessAnswers = screen.getAllByLabelText(/renderedAnswer/i);
    expect(lessAnswers.length).toEqual(2);

    jest.resetAllMocks()
});

  test('<Questions/> to load more questions when scrolling', async () => {
    const div = document.createElement('div')
    const answerPromise = Promise.resolve(getQAAnswers)
    const questionPromise = Promise.resolve(getQAResponse)
    axios.get.mockResolvedValue(getQAAnswers)
    const {getByText, getByTestId} = render(
      <ThemeProvider theme={light}>
          <Questions index={1} product={{"name": "Camo Onesie"}}
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
    const moreQuestions = screen.getAllByLabelText(/renderedQuestion/i);
    expect(moreQuestions.length).toEqual(4);

    const scrollDownWidget = getByTestId('scroll');
    fireEvent.scroll(scrollDownWidget, {y: 300})
    await waitFor(() => {
        getByText('3rd fabric question', { exact: false})
    });

    const scrolledQuestion = screen.getAllByLabelText(/renderedQuestion/i);
    expect(scrolledQuestion.length).toEqual(5);
    jest.resetAllMocks()
});

  test('<Questions/> filters when search parameter passed in', async () => {
    const div = document.createElement('div')
    const answerPromise = Promise.resolve(getQAAnswers)
    const questionPromise = Promise.resolve(getQAResponse)
    axios.get.mockResolvedValue(getQAAnswers)
    const {getByText, getByTestId} = render(
      <ThemeProvider theme={light}>
          <Questions index={1} product={{"name": "Camo Onesie"}}
          getAnswers={() => {return answerPromise}} getQuestions={() => {return questionPromise}} productId={'13023'}/>, div
      </ThemeProvider>
    )

    const rerender = await waitForElementToBeRemoved(() => screen.getAllByLabelText(/questionNull/i))
      .then(() => {
      getByText('What fabric is the top made of?', { exact: false});
      })
    const questions = screen.getAllByLabelText(/renderedQuestion/i);
    expect(questions.length).toEqual(2);
    const filterQuestions = getByTestId('searchQuestions');
    fireEvent.change(filterQuestions, { target : { value: 'Expanded'} })
    await waitFor(() => {
      expect(filterQuestions.value).toBe('Expanded')
      getByText('Expanded', { exact: false })
      const filteredOutQuestion = screen.queryByText('top made of')
      expect(filteredOutQuestion).not.toBeInTheDocument()
      const filteredQuestions = screen.getAllByLabelText(/renderedQuestion/i);
      expect(filteredQuestions.length).toEqual(1);
    })

    jest.resetAllMocks()
});
