import * as React from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Container,
  Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants'
import { UserDropdown } from '../components/UserDropdown'
import { HeaderLinks } from '../components/HeaderLinks'
import { useAuth } from '../context/AuthContext'

export const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth()
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }} component="main">
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            color="inherit"
            component={Link}
            to={ROUTES.home}
            sx={{ textDecoration: 'none' }}>
            Lode runner
          </Typography>
          {auth.user.data ? (
            <>
              <HeaderLinks />
              <UserDropdown />
            </>
          ) : (
            <Box>
              <Button component={Link} to={ROUTES.login} variant="contained">
                Login
              </Button>
              <Button
                component={Link}
                to={ROUTES.signup}
                variant="contained"
                sx={{ ml: 1 }}>
                Sign up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {children}
      <Paper
        sx={{
          marginTop: 'calc(10% + 60px)',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
        component="footer"
        square
        variant="outlined">
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              display: 'flex',
              my: 1,
            }}>
            <Typography variant="caption" color="initial">
              Copyright ©2023.
            </Typography>
          </Box>
        </Container>
      </Paper>
    </Box>
  )
}
