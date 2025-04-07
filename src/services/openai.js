import OpenAI from 'openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('OpenAI API key is not set in environment variables');
}

const OPENAI_ORGANIZATION_ID = import.meta.env.OPENAI_ORGANIZATION_ID;

const openaiConfig = {
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
};

if (OPENAI_ORGANIZATION_ID) {
  openaiConfig.organization = OPENAI_ORGANIZATION_ID;
}

const openai = new OpenAI(openaiConfig);

export const generateContent = async (prompt) => {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is missing. Please check your .env configuration.');
    }
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid API key provided. Please check your OpenAI API key.');
    } else if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded or insufficient quota.');
    }
    throw error;
  }
};

export const generateSpeech = async (text, voice = 'alloy') => {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is missing. Please check your .env configuration.');
    }
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text,
    });
    
    const arrayBuffer = await mp3.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating speech:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid API key provided. Please check your OpenAI API key.');
    } else if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded or insufficient quota.');
    }
    throw error;
  }
};