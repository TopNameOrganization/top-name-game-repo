import { Paper, Typography, Stack, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function EndGameScreen() {
  const navigate = useNavigate()

  return (
    <Paper
      elevation={24}
      sx={{
        backgroundColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '24px 32px',
      }}>
      <Typography
        variant="h1"
        component="div"
        sx={{
          flexGrow: 1,
          color: 'red',
          fontFamily: 'VT323',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: '150px',
        }}>
        GAME OVER
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'row' }}
        spacing={6}
        alignItems={{ xs: 'center', sm: 'flex-end', md: 'flex-end' }}
        justifyContent="center">
        <Button variant="contained" color="error">
          try again
        </Button>
        <Button
          onClick={() => navigate(ROUTES.leaderBoard)}
          variant="contained"
          color="error">
          leaderboard
        </Button>
        <Button
          onClick={() => navigate(ROUTES.home)}
          variant="contained"
          color="error">
          quit
        </Button>
      </Stack>
    </Paper>
  )
}
