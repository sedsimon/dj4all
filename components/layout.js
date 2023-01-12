import Head from 'next/head';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

const title = 'Decision Journal for All';
export const siteTitle = 'DJ 4 All';

export default function Layout({ children}) {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          border: 1
        }}
      >
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Decision Journal for All"
          />
          <title>{siteTitle}</title>
        </Head>
        <header>
          
              <h1>{title}</h1>
              
        </header>
        <main>
          {children}
        </main>
      </Box>
    </Container>
  );
}