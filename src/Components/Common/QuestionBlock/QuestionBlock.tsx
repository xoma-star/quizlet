import {Button, Caption, Card, Div, FormItem, Header, Input, Progress} from "@vkontakte/vkui";
import {QuestionType} from "../../../schema";
import {useState} from "react";
import './QuestionBlock.css'
import useQuestionTimer from "../../../Hooks/useQuestionTimer";
import useQuestionInput from "../../../Hooks/useQuestionInput";
import {useTypedSelector} from "../../../Hooks/useTypedSelector";

interface props{
    type: 'game' | 'waiting' | 'check',
    question: QuestionType,
    callback?: (i: string | number) => void,
    disabled?: boolean,
    right?: boolean
}

const QuestionBlock = ({question, type, callback, disabled = false, right}: props) => {
    const [itemClicked, setItemClicked] = useState(0)
    const { progressState, ratio } = useQuestionTimer(question, type)
    const {input, setInput} = useQuestionInput(question)
    const {vkid} = useTypedSelector(s => s.user)

    const clickHandler = (i: number) => {
        setItemClicked(i)
        if (callback) callback(i)
    }

    const color = (i: number) => {
        if(question.type !== 'select') return 'secondary'
        if(type === 'check') {
            if(question.answers[i].right) return 'commerce'
            if(!question.answers[i].right && question.usersAnswers.find(x => x.id === vkid)?.answer === i) return 'destructive'
            return 'secondary'
        }
        if(disabled) {
            if(i === itemClicked){
                if(right) return 'commerce'
                else return 'destructive'
            }
            return 'secondary'
        }

        return 'secondary'
    }
    const inputColor = () => {
        if(type === 'game') return !disabled ? 'default' : (right ? 'valid' : 'error')
        if(question.answeredRight.indexOf(vkid) >= 0) return "valid"
        return 'error'
    }

    return <Div>
        <Card mode={"shadow"} style={{padding: 20}}>
            <Header className={'questionTitle'} multiline>{question.text}</Header>
            {question.type === 'select' &&
                question.answers.map((v, i) =>
                    <Button
                        key={v.text}
                        mode={color(i)}
                        style={{margin: '10px 0'}}
                        onClick={() => clickHandler(i)}
                        disabled={disabled || ratio < 0}
                        stretched
                        size={'m'}>{v.text}</Button>
                )
            }
            {question.type === 'enter' && <FormItem status={inputColor()}>
                <Input
                    className={'enterInput'}
                    placeholder={'Введите ответ'}
                    value={type === 'check' ? question.usersAnswers.find(x => x.id === vkid)?.answer : input}
                    disabled={disabled || ratio < 0}
                    onKeyDown={event => {if(event.key === 'Enter') if(callback) callback(input)}}
                    onChange={event => setInput(event.currentTarget.value)}
                />
                {type === 'check' && <Caption
                    weight={'2'}
                    style={{marginTop: 12, color: 'var(--content_placeholder_text)'}}>Правильный ответ: {question.answer}</Caption>}
                {type !== 'check' && <Button size={'l'} style={{marginTop: 20}}
                                             stretched disabled={disabled || ratio < 0}
                                             onClick={() => {if(callback) callback(input)}}>Подтвердить</Button>}
            </FormItem>}
            {type !== 'check' && <Progress className={`timerProgress ${progressState}`} value={ratio}/>}
        </Card>
    </Div>
}

export default QuestionBlock