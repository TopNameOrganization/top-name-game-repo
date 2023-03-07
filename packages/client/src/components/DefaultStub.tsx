import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ROUTES } from '../constants'

interface Props {
  title?: string
  subTitle?: string
  text?: string
  action?: React.ReactNode
}

export const DefaultStub = ({
  title = 'Error',
  subTitle = 'Oops, something went wrong',
  text,
  action,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>
      <Container maxWidth="md">
        <Typography variant="h1">{title}</Typography>
        <Typography variant="h6">{subTitle}</Typography>
        {!!text && <Typography variant="body1">{text}</Typography>}
        {action || (
          <Button
            component={RouterLink}
            to={ROUTES.home}
            variant="contained"
            sx={{ mt: 1 }}>
            Back Home
          </Button>
        )}
      </Container>
    </Box>
  )
}
