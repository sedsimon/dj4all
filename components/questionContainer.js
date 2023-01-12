import {Box, Stack, Link} from '@mui/material'

export default function QuestionContainer({children}) {
  return (
    <Stack spacing={2} sx={{border: "1 black"}}>
      <Box minHeight={400}>
        {children}
      </Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Link href="/options/0/outcomes">Prev</Link>
        <Link href="/options/0/outcomes">Next</Link>
      </Stack>
      
    </Stack>
  )
}