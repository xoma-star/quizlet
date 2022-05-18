import {QuestionType} from "../schema";
import {useEffect, useRef, useState} from "react";

const useQuestionInput = (question: QuestionType) => {
    const inputRef = useRef(null)
    const [input, setInput] = useState('')
    useEffect(() => {setInput('')}, [question.text])
    return {input, setInput, inputRef}
}

export default useQuestionInput