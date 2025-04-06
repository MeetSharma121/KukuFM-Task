import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  InputAdornment,
  TextField,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

// Mock data for demonstration
const mockLibraryItems = [
  {
    id: 1,
    title: 'Morning Motivation',
    mood: 'Motivated',
    duration: '5:30',
    createdAt: '2023-07-20',
    plays: 12,
  },
  {
    id: 2,
    title: 'Creative Storytelling',
    mood: 'Creative',
    duration: '8:45',
    createdAt: '2023-07-19',
    plays: 8,
  },
  {
    id: 3,
    title: 'Mindful Meditation',
    mood: 'Mindful',
    duration: '10:00',
    createdAt: '2023-07-18',
    plays: 15,
  },
]

function Library() {
  const [searchQuery, setSearchQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleMenuOpen = (event, item) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(item)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }

  const handleShare = () => {
    // Implement share functionality
    handleMenuClose()
  }

  const handleDelete = () => {
    // Implement delete functionality
    handleMenuClose()
  }

  const handlePlay = (item) => {
    // Implement play functionality
    console.log('Playing:', item.title)
  }

  const filteredItems = mockLibraryItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search your library"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { transform: 'translateY(-4px)', transition: '0.3s' },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Chip
                  label={item.mood}
                  size="small"
                  sx={{ mb: 1 }}
                  color="primary"
                />

                <Typography variant="body2" color="text.secondary" paragraph>
                  Duration: {item.duration}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Created: {item.createdAt}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Plays: {item.plays}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'center' }}>
                <IconButton
                  color="primary"
                  size="large"
                  onClick={() => handlePlay(item)}
                >
                  <PlayArrowIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleShare}>
          <ShareIcon sx={{ mr: 1 }} /> Share
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Library