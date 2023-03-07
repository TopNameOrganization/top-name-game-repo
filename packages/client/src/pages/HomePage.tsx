import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { GeneralLayout } from '../layouts'
import brick from '../assets/appLayout/brick2.png'
import cassette from '../assets/appLayout/cassette.png'
import game_controller from '../assets/appLayout/game_controller.png'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

export const HomePage = () => {
  return (
    <GeneralLayout>
      <Paper
        elevation={24}
        sx={{
          backgroundImage: `url(${brick})`,
          backgroundSize: 'cover',
          backgroungPosition: 'center',
          height: '50vh',
          width: '100%',
        }}>
        <Container fixed>
          <Grid container>
            <Grid item md={6}>
              <div>
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{ marginTop: '30px', color: '#fff' }}>
                  Top name game
                </Typography>
                <Typography
                  component="h5"
                  color="#fff"
                  paragraph
                  maxWidth="70%">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique perferendis repudiandae nemo quod eum esse minus qui
                  quaerat? Repudiandae inventore voluptatem amet ex hic harum
                  accusamus sapiente quia fugit sed.
                </Typography>
                <Button variant="contained" color="secondary">
                  forum
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Paper>
      <Grid container sx={{height: 'calc(50vh - 48px)', overflow: 'hidden'}}>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            opacity: 0.2,
            zIndex: '0',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <img
            src={game_controller}
            style={{ objectFit: 'cover', height: '150%' }}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            marginTop: '20px',
            opacity: 0.2,
            height: '100%'
          }}>
          <img src={cassette} style={{ objectFit: 'cover', height: '70%'  }} />
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          top: '546px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'translateY(-50%)',
          left: 0,
          right: 0,
        }}>
        <Button
          disableRipple={true}
          sx={{
            transform: 'translateX(10%)',
            ':hover': {
              backgroundColor: 'transparent',
            },
          }}>
          <PlayArrowIcon
            sx={{
              color: 'black',
              height: '400px',
              width: '400px',
            }} />
        </Button>
        <Button
          disableRipple={true}
          sx={{
            color: 'black',
            ':hover': {
              backgroundColor: 'transparent',
            },
          }}>
          <Typography variant="h1">
            CLICK
            <br />
            FOR PLAY!
          </Typography>
        </Button>
      </Box>
    </GeneralLayout>
  )
}
