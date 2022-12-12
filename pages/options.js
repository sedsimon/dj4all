import Questions from '../components/questions'
import { nanoid } from 'nanoid'
import {Stack, Link} from '@mui/material'


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
      <Questions initialItems={initialItems}></Questions>
      <Stack direction="row" spacing={2}>
        <Link href="/options/0/outcomes">Prev</Link>
        <Link href="/options/0/outcomes">Next</Link>
      </Stack>
    </Stack>
  )
}