import { Box, Typography, Button, Grid, Card, CardContent, Fade } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import MoodIcon from '@mui/icons-material/Mood'
import ShareIcon from '@mui/icons-material/Share'
import ParticleBackground from '../components/ParticleBackground'

const features = [
  {
    icon: <MoodIcon sx={{ fontSize: 60 }} />,
    title: 'Mood-Based Content',
    description: 'Generate personalized audio content based on your current mood and interests.'
  },
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 60 }} />,
    title: 'Smart Storytelling',
    description: 'AI-powered narratives that adapt to your preferences and listening history.'
  },
  {
    icon: <ShareIcon sx={{ fontSize: 60 }} />,
    title: 'Share & Connect',
    description: 'Share your favorite AI-generated content with friends and build a community.'
  }
]

function Home() {
  const navigate = useNavigate()
  const [animatedItems, setAnimatedItems] = useState([])

  useEffect(() => {
    // Staggered animation for feature cards
    const timer = setTimeout(() => {
      const items = []
      features.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index])
        }, index * 200)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Box 
      sx={{ 
        textAlign: 'center', 
        py: 4,
        pb: 12, // Added extra padding at bottom for player bar
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'transparent',
        color: '#fff',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(139, 0, 0, 0.6) 100%)',
          animation: 'pulse 4s ease-in-out infinite',
          zIndex: -1
        },
        '@keyframes pulse': {
          '0%': { opacity: 0.3 },
          '50%': { opacity: 0.7 },
          '100%': { opacity: 0.3 }
        },
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }}>
      <ParticleBackground />
      
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          transform: 'perspective(1000px)',
          transformStyle: 'preserve-3d',
          mb: 6
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            mb: 2,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 900,
            position: 'relative',
            textShadow: '0 0 30px rgba(255, 0, 0, 0.9), 0 0 60px rgba(255, 0, 0, 0.5)',
            fontFamily: 'Georgia, serif'
          }}
        >
          Create Personalized Audio Content with AI
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            mb: 5,
            textShadow: '0 0 15px rgba(255, 0, 0, 0.9)',
            fontStyle: 'normal',
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            fontWeight: 700,
            letterSpacing: '0.05em',
            opacity: 0.9,
            display: 'block',
            lineHeight: 1.8
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              mb: 3,
              color: '#ffcccc',
              opacity: 0.9,
              animation: 'fadeIn 1s ease-out',
              textShadow: '0 0 10px rgba(255, 0, 0, 0.3)',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 0.9, transform: 'translateY(0)' }
              }
            }}
          >
            Transform your ideas into engaging audio experiences powered by AI
          </Typography>
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/create')}
        sx={{
          mb: 10,
          px: 6,
          py: 2.5,
          fontSize: '1.3rem',
          borderRadius: '50px',
          background: 'linear-gradient(45deg, #FF0000 30%, #FF3333 90%)',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          boxShadow: '0 10px 30px rgba(255, 0, 0, 0.4)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF3333 30%, #FF6666 90%)',
            transform: 'translateY(-7px) scale(1.05)',
            boxShadow: '0 15px 30px rgba(255, 0, 0, 0.5)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            transition: 'all 0.6s ease',
          },
          '&:hover::before': {
            left: '100%',
          },
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        Start Creating
      </Button>

      <Grid container spacing={5} justifyContent="center" sx={{ position: 'relative', zIndex: 2, mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Fade in={animatedItems.includes(index)} timeout={1000}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  background: 'rgba(80, 0, 0, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(139, 0, 0, 0.3)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.1) 0%, rgba(255, 0, 0, 0) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    zIndex: 0
                  },
                  '&:hover': {
                    transform: 'scale(1.05) translateY(-15px) rotateY(10deg)',
                    boxShadow: '0 30px 40px rgba(139, 0, 0, 0.4)',
                    background: 'rgba(139, 0, 0, 0.3)',
                    '& .MuiTypography-root': {
                      color: '#ff4d4d'
                    },
                    '&::before': {
                      opacity: 1
                    }
                  },
                  '&:hover .icon-container': {
                    transform: 'translateZ(30px) scale(1.2)',
                  },
                  '&:hover .title-container': {
                    transform: 'translateZ(20px)',
                  },
                  '&:hover .description-container': {
                    transform: 'translateZ(10px)',
                  }
                }}
              >
                <CardContent sx={{ 
                  flexGrow: 1, 
                  textAlign: 'center',
                  p: 4,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Box 
                    className="icon-container"
                    sx={{ 
                      color: 'primary.main', 
                      mb: 3,
                      transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255,0,0,0.2) 0%, rgba(255,0,0,0) 70%)',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -1
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    className="title-container"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      textShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    color="text.secondary"
                    className="description-container"
                    sx={{
                      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      fontSize: '1.05rem',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Home