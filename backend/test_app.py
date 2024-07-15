import unittest
from app import app

class TestSentimentAnalysis(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_sentiment_analysis(self):
        response = self.app.post('/analyze', json={'text': 'I love this product!'})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('sentiment', data)
        self.assertIn('sentiment_label', data)
        self.assertGreater(data['sentiment'], 0)  # Should be positive

    def test_negative_sentiment(self):
        response = self.app.post('/analyze', json={'text': 'I hate this product!'})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertLess(data['sentiment'], 0)  # Should be negative

if __name__ == '__main__':
    unittest.main()