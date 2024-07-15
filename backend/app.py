# Import necessary libraries
from flask import Flask, request, jsonify  # Flask for creating the web server, request to handle HTTP requests, jsonify to convert Python objects to JSON
from flask_cors import CORS  # CORS (Cross-Origin Resource Sharing) to allow requests from different domains
from textblob import TextBlob  # TextBlob for natural language processing and sentiment analysis

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes in the app, allowing requests from any origin
CORS(app)

# Define a route for the '/analyze' endpoint that only accepts POST requests
@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    # Extract the JSON data from the incoming request
    data = request.json
    
    # Get the 'text' field from the JSON data
    text = data['text']
    
    # Perform sentiment analysis
    blob = TextBlob(text)  # Create a TextBlob object from the input text
    sentiment = blob.sentiment.polarity  # Get the sentiment polarity (-1 to 1)
    
    # Classify sentiment based on the polarity score
    if sentiment > 0:
        sentiment_label = 'Positive'  # Positive if polarity > 0
    elif sentiment < 0:
        sentiment_label = 'Negative'  # Negative if polarity < 0
    else:
        sentiment_label = 'Neutral'  # Neutral if polarity = 0
    
    # Return the analysis results as a JSON response
    return jsonify({
        'text': text,  # The original input text
        'sentiment': sentiment,  # The raw sentiment score
        'sentiment_label': sentiment_label  # The classified sentiment label
    })

# Check if this script is being run directly (not imported as a module)
if __name__ == '__main__':
    # Run the Flask application
    app.run(debug=True, port=5000)  # debug=True enables debug mode, port=5000 sets the port number