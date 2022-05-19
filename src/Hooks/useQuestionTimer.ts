import {QuestionType} from "../schema";
import {useEffect, useState} from "react";

const useQuestionTimer = (question: QuestionType, type: string) => {
    const [timer, setTimer] = useState(question.time)
    useEffect(() => {
        if (type === 'check') return
        setTimer(question.time)
        const clear = setInterval(() => {setTimer(t => t - 1)}, 1000)
        return () => clearInterval(clear)
    }, [question.text])

    const ratio = timer / question.time * 100
    let progressState = 'good'
    if(ratio < 70) progressState = 'medium'
    if(ratio < 35) progressState = 'bad'

    return {timer, progressState, ratio}
}

export default useQuestionTimer