import React from 'react'
//Types
import {AnswerObject} from '../App'

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | null,
    questionNumber: number,
    totalQuestions: number
}
const QuestionsCard:React.FC<Props> = ({
    question, 
    answers,
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestions
}) => {
    return (
        <div>
            <p className="number">
                Question: {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{__html: question}}/>
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{__html: answer}}></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionsCard
