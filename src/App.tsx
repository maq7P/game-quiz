import React from 'react'
import {fetchQuizQuestions} from './API'
// Components
import QuestionsCard from './components/QuestionsCard'
// Types
import {QuestionState, Difficulty} from './API'

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}
const TOTAL_QUESTIONS = 10
const App = () => {
    const [loading, setLoading] = React.useState(false)
    const [questions, setQuestions] = React.useState<QuestionState[]>([])
    const [number, setNumber] = React.useState(0)
    const [userAnswers, setUserAnswers] = React.useState<AnswerObject[]>([])
    const [score, setScore] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(true)

    const startTrivia = async () => {
        setLoading(true)
        setGameOver(false)

        const newQuestion = await fetchQuizQuestions(
            TOTAL_QUESTIONS,
            Difficulty.EASY
        )
        setQuestions(newQuestion)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
    }
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!gameOver){
            //user answer
            const answer = e.currentTarget.value
            //check answer against correct answer
            const correct = questions[number].correct_answer === answer
            //add score if answer is correct
            setScore(correct ? score + 1: score)
            //save answer in the array for user answers
            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            }
            setUserAnswers((prev) => [...prev, answerObject])
        }
    }
    const nextQuiz = () => {
        //move on to the next question if that isn't last question
        const nextQuestion =  number + 1
        if(nextQuestion === TOTAL_QUESTIONS){
            setGameOver(true)
        } else{
            setNumber(nextQuestion)
        }

    }
    return (
    <div className="App">
        <h1>CAN WIN THIS QUIZ?</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS
            ? (<button className="start" onClick={startTrivia}>Start</button>)
            : null
        }
        {!gameOver
            ? <p className="score">Score: {score}</p>
            : null
        }
        {loading
            ? <p>Loading question...</p>
            : null
        }
        {!loading && !gameOver
            ?
            <QuestionsCard
                questionNumber={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : null}
                callback={checkAnswer}
            />
            : null
        }
        {!loading
            && !gameOver
            && userAnswers.length === number+1
            && number+1 !== TOTAL_QUESTIONS

            && <button className="next" onClick={nextQuiz}>Next Quiz</button>}
    </div>
    )
}

export default App

