import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('renders sentiment analysis form', () => {
  render(<App />);
  const titleElement = screen.getByText(/Sentiment Analysis/i);
  expect(titleElement).toBeInTheDocument();
});

test('submits text for analysis', async () => {
  axios.post.mockResolvedValue({ 
    data: { text: 'Test', sentiment: 0.5, sentiment_label: 'Positive' } 
  });

  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter text to analyze/i);
  fireEvent.change(input, { target: { value: 'Test' } });
  
  const button = screen.getByText(/Analyze/i);
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/Analysis Result:/i)).toBeInTheDocument();
  });
});