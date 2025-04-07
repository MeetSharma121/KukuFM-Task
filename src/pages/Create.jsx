import { useState, useRef, useEffect } from 'react'
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
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import { generateContent, generateSpeech } from '../services/openai'

const voices = [
  { id: 'voice1', name: 'Sarah', accent: 'American' },
  { id: 'voice2', name: 'James', accent: 'British' },
  { id: 'voice3', name: 'Priya', accent: 'Indian' },
  { id: 'voice4', name: 'Alex', accent: 'Australian' },
]

function Create() {
  const [content, setContent] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('alloy')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioStream, setAudioStream] = useState(null)
  const audioRef = useRef(null)
  const mediaRecorderRef = useRef(null)

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioStream(stream)
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const audioChunks = []
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const reader = new FileReader()
        reader.readAsDataURL(audioBlob)
        reader.onloadend = async () => {
          const base64Audio = reader.result
          // Here you would typically send this to a speech-to-text API
          // For now, we'll just set it as content
          setContent('Speech to text conversion would happen here')
        }
      }
      
      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      setError('Unable to access microphone. Please check your permissions.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      audioStream.getTracks().forEach(track => track.stop())
      setAudioStream(null)
      setIsRecording(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [audioStream])

  const handlePlayPause = async () => {
    try {
      if (!isPlaying) {
        setIsGenerating(true)
        setError('')
        
        let textToSpeak = aiResponse
        
        // If no AI response exists, generate one
        if (!textToSpeak) {
          const prompt = content.trim() || 'Generate a short, engaging paragraph about any interesting topic.'
          const generatedContent = await generateContent(prompt)
          setAiResponse(generatedContent)
          textToSpeak = generatedContent
        }
        
        // Generate speech from the text
        const audioUrl = await generateSpeech(textToSpeak, selectedVoice)
        
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
        
        const audio = new Audio(audioUrl)
        audio.onended = () => {
          setIsPlaying(false)
          audio.src = ''
          URL.revokeObjectURL(audioUrl)
        }
        
        audioRef.current = audio
        await audio.play()
        
        setIsGenerating(false)
        setIsPlaying(true)
      } else {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
        setIsPlaying(false)
      }
    } catch (err) {
      console.error('Error:', err)
      let errorMessage = 'Failed to generate audio. Please try again.'
      if (err.message.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your OpenAI API key configuration.'
      } else if (err.message.includes('insufficient_quota')) {
        errorMessage = 'OpenAI API quota exceeded. Please check your usage limits.'
      }
      setError(errorMessage)
      setIsGenerating(false)
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
          bgcolor: 'black',
          color: 'white',
          borderRadius: '16px',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
          Create Audio Content
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, color: 'white', '& .MuiAlert-message': { color: 'white' } }}>
            {error}
          </Alert>
        )}
        <Stack spacing={3}>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Type your content or question here"
              value={content}
              onChange={handleContentChange}
              variant="outlined"
              placeholder="Start typing what you want to hear or ask a question..."
              sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'black',
                color: 'white',
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                }
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: 'white'
                }
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)'
              }
            }}
            />
            <IconButton
              onClick={isRecording ? stopRecording : startRecording}
              sx={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                color: isRecording ? 'red' : 'white',
                '&:hover': {
                  color: isRecording ? '#ff4444' : '#dddddd',
                },
              }}
            >
              {isRecording ? <MicOffIcon /> : <MicIcon />}
            </IconButton>
          </Box>

          {aiResponse && (
            <TextField
              fullWidth
              multiline
              rows={4}
              label="AI Response"
              value={aiResponse}
              InputProps={{ 
                readOnly: true,
                style: { color: 'white' }
              }}
              variant="outlined"
              sx={{
                mb: 2,
                backgroundColor: 'black',
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  '&.Mui-focused': {
                    color: 'white'
                  }
                }
              }}
            />
          )}

          <FormControl fullWidth sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              }
            },
            '& .MuiInputLabel-root': {
              color: 'white',
              '&.Mui-focused': {
                color: 'white'
              }
            },
            '& .MuiSelect-icon': {
              color: 'white'
            }
          }}>
            <InputLabel sx={{ color: 'white' }}>Select Voice</InputLabel>
            <Select
              value={selectedVoice}
              onChange={handleVoiceChange}
              label="Select Voice"
              sx={{
                color: 'white',
                '& .MuiMenuItem-root': {
                  color: 'black'
                }
              }}
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
                background: 'black',
              color: 'white',
              border: '1px solid white',
              '&:hover': {
                background: '#333',
                borderColor: 'white'
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