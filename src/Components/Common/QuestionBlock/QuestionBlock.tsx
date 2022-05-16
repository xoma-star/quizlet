import {Button, Caption, Card, Div, Header, Input, Progress} from "@vkontakte/vkui";
import {QuestionType} from "../../../schema";
import {useEffect, useState} from "react";
import './QuestionBlock.css'

interface props{
    type: 'game' | 'waiting',
    question: QuestionType,
    callback?: () => void
}

const QuestionBlock = ({question, type}: props) => {
    const [timer, setTimer] = useState(question.time)

    useEffect(() => {
        const clear = setInterval(() => {setTimer(t => t - 1)}, 1000)
        return () => clearInterval(clear)
    })

    const ratio = timer / question.time * 100
    let progressState = 'good'
    if(ratio < 70) progressState = 'medium'
    if(ratio < 35) progressState = 'bad'

    return <Div>
        <Card mode={"shadow"} style={{padding: 20}}>
            <Header className={'questionTitle'} multiline>{question.text}</Header>
            {question.type === 'select' &&
                question.answers.map(v =>
                    <Button mode={'secondary'} style={{margin: '10px 0'}} stretched size={'m'}>{v.text}</Button>
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