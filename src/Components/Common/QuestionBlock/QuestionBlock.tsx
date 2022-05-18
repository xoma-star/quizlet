import {Button, Caption, Card, Div, Header, Input, Progress} from "@vkontakte/vkui";
import {QuestionType} from "../../../schema";
import {useEffect, useState} from "react";
import './QuestionBlock.css'

interface props{
    type: 'game' | 'waiting',
    question: QuestionType,
    callback: (i: string | number) => void,
    disabled?: boolean
}

const QuestionBlock = ({question, type, callback, disabled = false}: props) => {
    const [timer, setTimer] = useState(question.time)

    useEffect(() => {
        setTimer(question.time)
        const clear = setInterval(() => {setTimer(t => t - 1)}, 1000)
        return () => clearInterval(clear)
    }, [question.text])

    const ratio = timer / question.time * 100
    let progressState = 'good'
    if(ratio < 70) progressState = 'medium'
    if(ratio < 35) progressState = 'bad'

    return <Div>
        <Card mode={"shadow"} style={{padding: 20}}>
            <Header className={'questionTitle'} multiline>{question.text}</Header>
            {question.type === 'select' &&
                question.answers.map((v, i) =>
                    <Button mode={'secondary'} style={{margin: '10px 0'}} onClick={() => callback(i)} disabled={disabled} stretched size={'m'}>{v.text}</Button>
                )
            }
            {question.type === 'enter' && <Input className={'enterInput'} placeholder={'Введите ответ'}/> }
            <Progress className={`timerProgress ${progressState}`} value={ratio}/>
        </Card>
        {type === 'waiting' &&
            <Caption style={{textAlign: 'center', color: 'var(--content_placeholder_icon)', marginTop: 10}}>Тренировочный режим. Ответы не засчитываются.</Caption>
        }
    </Div>
}

export default QuestionBlock