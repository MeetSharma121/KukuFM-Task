# KuKu FM Text-to-Speech Application

A React application that uses OpenAI's API to generate content and convert text to speech.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install OpenAI package:
```bash
npm install openai
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
VITE_OPENAI_API_KEY=your-api-key-here
```

4. Start the development server:
```bash
npm run dev
```

## Features

- Text-to-speech conversion using OpenAI's API
- Multiple voice options
- Content generation capability
- Real-time audio playback

## Usage

1. Enter text in the content field or let the AI generate content for you
2. Select a voice from the dropdown menu
3. Click the Preview button to generate and play the audio
4. Use the stop button to stop playback

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required)

## Important Note

Make sure to keep your OpenAI API key secure and never commit it to version control.