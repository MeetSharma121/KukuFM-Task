import { useState } from 'react'
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Slider,
  Stack,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import ShareIcon from '@mui/icons-material/Share'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'

function Player() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30)
  const [volume, setVolume] = useState(80)

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (event, newValue) => {
    setProgress(newValue)
  }

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        background: 'linear-gradient(45deg, #FF0000 30%, #FFFFFF 90%)',
        color: '#333',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton 
          color="inherit" 
          onClick={handlePlayPause}
          sx={{
            transform: 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)'
            }
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {formatTime(progress)}
          </Typography>
          <Slider
            size="small"
            value={progress}
            onChange={handleProgressChange}
            max={180}
            sx={{
              color: '#FF0000',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                backgroundColor: '#FF0000',
              },
              '& .MuiSlider-rail': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {formatTime(180)}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ minWidth: 150 }}
        >
          <VolumeDownIcon />
          <Slider
            size="small"
            value={volume}
            onChange={handleVolumeChange}
            sx={{
              color: '#FF0000',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                backgroundColor: '#FF0000',
              },
              '& .MuiSlider-rail': {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
              },
            }}
          />
          <VolumeUpIcon />
        </Stack>

        <IconButton color="inherit">
          <ShareIcon />
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default Player