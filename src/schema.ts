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

interface playerInRoom{
    name?: string,
    ava?: string,
    score?: number,
    id: string
}

export interface room{
    id: string,
    players: playerInRoom[],
    questions: QuestionType[],
    theme: string,
    mode: string
}

export const themes = [
    {id: 'history', name: 'История'},
    {id: 'math', name: 'Математика'},
    {id: 'english', name: 'Английский язык'},
    {id: 'geo', name: 'География'},
    {id: 'russian', name: 'Русский язык'},
    {id: 'tech', name: 'Технологии'}
]

export const modes = [
    {id: 'oneVSone', name: 'Дуэль'},
    {id: 'oneVSall', name: 'Один против всех'},
    {id: 'teamVSteam', name: 'Команда против команды'},
    {id: 'teamVSall', name: 'Команда против других команд'},
    {id: 'one', name: 'Тренировка'}
]