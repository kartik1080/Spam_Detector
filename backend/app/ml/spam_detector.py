import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re

class SpamDetector:
    def __init__(self):
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
        
        self.stop_words = set(stopwords.words('english'))
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(
                stop_words='english',
                max_features=5000,
                ngram_range=(1, 2)
            )),
            ('classifier', MultinomialNB())
        ])
        
        # Train the model with some initial data
        self._train_initial_model()
    
    def _preprocess_text(self, text):
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords
        tokens = [t for t in tokens if t not in self.stop_words]
        
        return ' '.join(tokens)
    
    def _train_initial_model(self):
        # Initial training data
        spam_texts = [
            "URGENT! You have won a lottery! Click here to claim your prize!",
            "CONGRATULATIONS! You've been selected for a free iPhone!",
            "Your account has been compromised. Click here to verify.",
            "You've won a free gift card! Click here to claim.",
            "URGENT: Your bank account needs verification.",
        ]
        
        ham_texts = [
            "Meeting scheduled for tomorrow at 2 PM.",
            "Please review the attached document.",
            "Your order has been shipped.",
            "Thank you for your purchase.",
            "The project deadline has been extended.",
        ]
        
        X = spam_texts + ham_texts
        y = [1] * len(spam_texts) + [0] * len(ham_texts)
        
        # Preprocess texts
        X = [self._preprocess_text(text) for text in X]
        
        # Train the model
        self.model.fit(X, y)
    
    def predict(self, text):
        # Preprocess the text
        processed_text = self._preprocess_text(text)
        
        # Get prediction and probability
        prediction = self.model.predict([processed_text])[0]
        probabilities = self.model.predict_proba([processed_text])[0]
        
        # Get confidence score (probability of the predicted class)
        confidence_score = probabilities[prediction]
        
        return bool(prediction), float(confidence_score)
    
    def update_model(self, text, is_spam):
        """
        Update the model with new training data
        """
        processed_text = self._preprocess_text(text)
        self.model.fit([processed_text], [int(is_spam)]) 