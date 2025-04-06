import { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

const voices = [
  { id: 'voice1', name: 'Sarah', accent: 'American' },
  { id: 'voice2', name: 'James', accent: 'British' },
  { id: 'voice3', name: 'Priya', accent: 'Indian' },
  { id: 'voice4', name: 'Alex', accent: 'Australian' },
]

function Create() {
  const [content, setContent] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value)
  }

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsGenerating(true)
      // Simulate AI audio generation
      setTimeout(() => {
        setIsGenerating(false)
        setIsPlaying(true)
      }, 1500)
    } else {
      setIsPlaying(false)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {moods.map((mood) => (
              <Grid item xs={12} sm={6} md={4} key={mood.name}>
                <Card
                  sx={{
                    border: selectedMood?.name === mood.name ? 2 : 0,
                    borderColor: 'primary.main',
                  }}
                >
                  <CardActionArea onClick={() => handleMoodSelect(mood)}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h2" sx={{ fontSize: '3rem', mb: 1 }}>
                        {mood.icon}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {mood.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {mood.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )

      case 1:
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              label="What would you like to hear about?"
              value={contentSettings.topic}
              onChange={handleSettingsChange('topic')}
              margin="normal"
            />
            <Typography gutterBottom>Duration (minutes)</Typography>
            <Slider
              value={contentSettings.duration}
              onChange={handleSettingsChange('duration')}
              min={1}
              max={30}
              valueLabelDisplay="auto"
              marks
              sx={{ mb: 4 }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Voice</InputLabel>
              <Select
                value={contentSettings.voice}
                onChange={handleSettingsChange('voice')}
                label="Voice"
              >
                {voices.map((voice) => (
                  <MenuItem key={voice.id} value={voice.id}>
                    {voice.name} ({voice.accent})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Style</InputLabel>
              <Select
                value={contentSettings.style}
                onChange={handleSettingsChange('style')}
                label="Style"
              >
                <MenuItem value="narrative">Narrative</MenuItem>
                <MenuItem value="conversational">Conversational</MenuItem>
                <MenuItem value="poetic">Poetic</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )

      case 2:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Content Summary
              </Typography>
              <Typography variant="body1" paragraph>
                Mood: {selectedMood?.name}
              </Typography>
              <Typography variant="body1" paragraph>
                Topic: {contentSettings.topic}
              </Typography>
              <Typography variant="body1" paragraph>
                Duration: {contentSettings.duration} minutes
              </Typography>
              <Typography variant="body1" paragraph>
                Voice: {voices.find((v) => v.id === contentSettings.voice)?.name}
              </Typography>
              <Typography variant="body1" paragraph>
                Style: {contentSettings.style}
              </Typography>
              <Button
                variant="contained"
                onClick={handleGenerate}
                disabled={isGenerating}
                sx={{ mt: 2 }}
              >
                {isGenerating ? 'Generating...' : 'Generate Audio'}
              </Button>
            </Paper>
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4, color: '#333' }}>
          Create Audio Content
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Type your content here"
            value={content}
            onChange={handleContentChange}
            variant="outlined"
            placeholder="Start typing what you want to hear..."
          />

          <FormControl fullWidth>
            <InputLabel>Select Voice</InputLabel>
            <Select
              value={selectedVoice}
              onChange={handleVoiceChange}
              label="Select Voice"
            >
              {voices.map((voice) => (
                <MenuItem key={voice.id} value={voice.id}>
                  {voice.name} ({voice.accent})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={isPlaying ? <StopIcon /> : <PlayArrowIcon />}
              onClick={handlePlayPause}
              disabled={!content || isGenerating}
              sx={{
                minWidth: 200,
                py: 1.5,
                background: 'linear-gradient(45deg, #FF0000 30%, #FF3333 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF3333 30%, #FF6666 90%)',
                },
              }}
            >
              {isGenerating ? 'Generating...' : isPlaying ? 'Stop' : 'Preview'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Create