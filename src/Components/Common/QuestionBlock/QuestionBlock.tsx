import {Button, Caption, Card, Div, FormItem, Header, IconButton, Input, Progress} from "@vkontakte/vkui";
import {QuestionType} from "../../../schema";
import {useEffect, useState} from "react";
import './QuestionBlock.css'
import useQuestionTimer from "../../../Hooks/useQuestionTimer";
import {Icon16Done} from "@vkontakte/icons";
import useQuestionInput from "../../../Hooks/useQuestionInput";
import error from "@vkontakte/icons/dist/typings/24/error";

interface props{
    type: 'game' | 'waiting',
    question: QuestionType,
    callback: (i: string | number) => void,
    disabled?: boolean,
    right?: boolean
}

const QuestionBlock = ({question, type, callback, disabled = false, right}: props) => {
    const [itemClicked, setItemClicked] = useState(0)
    const { progressState, ratio } = useQuestionTimer(question)
    const {input, setInput, inputRef} = useQuestionInput(question)

    const clickHandler = (i: number) => {
        setItemClicked(i)
        callback(i)
    }

    const color = (i?: number) => disabled ? (i === itemClicked ? (right ? 'commerce' : 'destructive') : 'secondary') : 'secondary'
    const inputColor = () => !disabled ? 'default' : (right ? 'valid' : 'error')

    return <Div>
        <Card mode={"shadow"} style={{padding: 20}}>
            <Header className={'questionTitle'} multiline>{question.text}</Header>
            {question.type === 'select' &&
                question.answers.map((v, i) =>
                    <Button
                        mode={color(i)}
                        style={{margin: '10px 0'}}
                        onClick={() => clickHandler(i)}
                        disabled={disabled}
                        stretched
                        size={'m'}>{v.text}</Button>
                )
            }
            {question.type === 'enter' && <FormItem status={inputColor()}>
                <Input
                    getRef={inputRef}
                    className={'enterInput'}
                    placeholder={'Введите ответ'}
                    value={input}
                    disabled={disabled}
                    onChange={event => setInput(event.currentTarget.value)}
                    // after={<IconButton><Icon16Done onClick={inputHandler}/></IconButton>}
                />
                <Button size={'l'} style={{marginTop: 20}} stretched disabled={disabled} onClick={() => callback(input)}>Подтвердить</Button>
            </FormItem>}
            <Progress className={`timerProgress ${progressState}`} value={ratio}/>
        </Card>
        {type === 'waiting' &&
            <Caption style={{textAlign: 'center', color: 'var(--content_placeholder_icon)', marginTop: 10}}>Тренировочный режим. Ответы не засчитываются.</Caption>
        }
    </Div>
}

export default QuestionBlock