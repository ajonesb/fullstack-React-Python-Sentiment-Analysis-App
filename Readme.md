# Sentiment Analysis Application

This project is a full-stack application that performs sentiment analysis on user-input text. It consists of a React frontend and a Python Flask backend.

## Frontend

The frontend is built with React and TypeScript, styled using Tailwind CSS, and structured with modular components.

## Project Structure

frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── SentimentForm.tsx
│ │ └── SentimentResult.tsx
│ ├── App.tsx
│ ├── index.tsx
│ └── types.ts
├── package.json
├── tsconfig.json
└── README.md

## Key Features

- TypeScript for type safety
- Modular component structure
- Tailwind CSS for styling

## Setup

- Navigate to the frontend directory:
- cd frontend

- Install the required packages:
  `npm install`

- Install TypeScript and type definitions:
  `npm install --save-dev typescript @types/react @types/react-dom @types/node`

## Running the Frontend

- From the frontend directory, run:
  `npm start`
  The application will be available at http://localhost:3000.

## Components

- App.tsx: The main component that renders the application structure and manages the overall state.
- SentimentForm.tsx: Renders the form for text input and handles the sentiment analysis request.
- SentimentResult.tsx: Displays the results of the sentiment analysis, including a visual representation of the sentiment score.

## Types

- The types.ts file contains TypeScript interfaces used throughout the application, including:

`export interface AnalysisResult {
  text: string;
  sentiment: number;
  sentiment_label: string;
}`

## Styling

The application uses Tailwind CSS for styling. The main styles are applied in the individual component files.

## Testing

To run the frontend tests:
`npm test`

## Building for Production

To create a production build:
`npm run build`
This will generate optimized static files in the build directory.

## Backend

The backend is built with Python using the Flask framework and TextBlob for sentiment analysis.

### Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Create and activate a virtual environment:

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### Running the Backend

From the `backend` directory, run:

```
python app.py
```

The server will start on `http://localhost:5000`.

## Using the Application

1. Ensure both the backend and frontend servers are running.
2. Open a web browser and go to `http://localhost:3000`.
3. Enter text in the provided textarea and click "Analyze".
4. The sentiment analysis results will be displayed below the input field.

## API Endpoint

The backend provides a single API endpoint:

- **URL**: `/analyze`
- **Method**: POST
- **Body**: JSON object with a `text` field
- **Response**: JSON object with `text`, `sentiment` (score), and `sentiment_label`

Example curl request:

```
curl -X POST -H "Content-Type: application/json" -d '{"text":"I love this product!"}' http://localhost:5000/analyze
```

## Testing

### Backend Tests

From the `backend` directory, run:

```
python -m unittest test_app.py
```

### Frontend Tests

From the `frontend` directory, run:

```
npm test
```

## Future Improvements

- Implement user authentication
- Add support for analyzing multiple texts at once
- Integrate with social media APIs for real-time sentiment analysis
- Improve sentiment analysis accuracy with machine learning models

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
