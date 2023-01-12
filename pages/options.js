import { nanoid } from 'nanoid'
import {Stack} from '@mui/material'
import AnswerList from '../components/answerList'


const initialItems = [
  {
    id: nanoid(),
    text: "Do Nothing",
    edit: false
  },
  {
    id: nanoid(),
    text: "Invest $50k",
    edit: false
  }
]

export default function Options() {
  return (
    <Stack direction="column" spacing={2}>
      <AnswerList initialItems={initialItems}></AnswerList>
    </Stack>
  )
}