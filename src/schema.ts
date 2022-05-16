interface Question{
    author?: string,
    image?: string,
    text: string,
    time: number
}

interface SelectAnswers{
    text: string,
    right: boolean
}

interface QuestionSelect extends Question{
    type: 'select',
    answers: SelectAnswers[]
}

interface QuestionEnter extends Question{
    type: 'enter',
    answer: string
}

export type QuestionType = QuestionSelect | QuestionEnter