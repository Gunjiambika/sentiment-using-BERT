from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import (
    BertTokenizer, BertForSequenceClassification,
    AlbertTokenizer, AlbertForSequenceClassification,
    DistilBertTokenizer, DistilBertForSequenceClassification
)
import joblib
import numpy as np

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Deep Learning Models
models = {
    "BERT": BertForSequenceClassification.from_pretrained("./models/bert_model"),
    "ALBERT": AlbertForSequenceClassification.from_pretrained("./models/albert_model"),
    "DistilBERT": DistilBertForSequenceClassification.from_pretrained("./models/distilbert_model"),
    "Naive Bayes": joblib.load("./models/naive_bayes_model.pkl"),
    "SVM": joblib.load("./models/svm_model.pkl"),
}

# Load Tokenizers
tokenizers = {
    "BERT": BertTokenizer.from_pretrained("./models/bert_model"),
    "ALBERT": AlbertTokenizer.from_pretrained("./models/albert_model"),
    "DistilBERT": DistilBertTokenizer.from_pretrained("./models/distilbert_model"),
}

# Load Vectorizer for SVM and Naive Bayes
vectorizer = joblib.load("./models/tfidf_vectorizer.pkl")

# Request body format
class SentimentRequest(BaseModel):
    text: str
    model: str

@app.post("/analyze/")
async def analyze_sentiment(request: SentimentRequest):
    text = request.text
    model_name = request.model

    if model_name in ["BERT", "ALBERT", "DistilBERT"]:
        tokenizer = tokenizers[model_name]
        model = models[model_name]

        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        outputs = model(**inputs)
        probs = torch.nn.functional.softmax(outputs.logits, dim=1)
        confidence = probs.detach().numpy().flatten()

        labels = ["negative", "positive"]
        primary = labels[np.argmax(confidence)]

        if max(confidence) < 0.5:
            primary = "neutral"

        confidence_dict = {
            "positive": float(confidence[1]) * 100,
            "negative": float(confidence[0]) * 100,
            "neutral": 0.0,
        }

    else:
        # For Naive Bayes and SVM models
        model = models[model_name]
        transformed_text = vectorizer.transform([text])

        try:
            probas = model.predict_proba(transformed_text)[0]
            labels = ["negative", "positive"]
            max_proba = np.max(probas)
            max_label = labels[np.argmax(probas)]

            # Calculate difference between probabilities of positive and negative class
            diff = abs(probas[1] - probas[0])

            # Adjust the threshold for neutral sentiment dynamically
            neutral_threshold = 0.15  # Experiment with this value
            if diff < neutral_threshold:
                primary = "neutral"
            else:
                primary = max_label

            confidence_dict = {
                "positive": float(probas[1]) * 100,
                "negative": float(probas[0]) * 100,
                "neutral": 100.0 - (float(probas[0]) * 100 + float(probas[1]) * 100) if primary == "neutral" else 0.0,
            }

        except AttributeError:
            # If predict_proba not available
            preds = model.predict(transformed_text)[0]

            if isinstance(preds, (np.integer, int)):
                primary = "positive" if preds == 1 else "negative"
            elif isinstance(preds, str):
                primary = preds.lower()
            else:
                primary = "neutral"

            confidence_dict = {
                "positive": 70.0 if primary == "positive" else 10.0,
                "negative": 70.0 if primary == "negative" else 10.0,
                "neutral": 20.0,
            }

    response = {
        "primary_sentiment": primary.capitalize(),
        "confidence_scores": confidence_dict,
        "technical_details": {
            "model": model_name,
            "type": "Deep Learning" if model_name in ["BERT", "ALBERT", "DistilBERT"] else "Statistical",
            "description": f"{model_name} model for Sentiment Analysis",
        },
        "comparison_metrics": {
            "BERT": {"accuracy": 92.9, "precision": 93.0, "recall": 89.6, "f1_score": 92.2},
            "ALBERT": {"accuracy": 88.1, "precision": 90.2, "recall": 87.2, "f1_score": 91.6},
            "DistilBERT": {"accuracy": 88.2, "precision": 88.6, "recall": 89.9, "f1_score": 90.1},
            "Naive Bayes": {"accuracy": 79.8, "precision": 81.7, "recall": 78.6, "f1_score": 78.7},
            "SVM": {"accuracy": 82.3, "precision": 84.5, "recall": 79.3, "f1_score": 83.9},
        }
    }

    return response
# Root endpoint to confirm server is live
@app.get("/")
def root():
    return {"message": "Sentiment analysis backend is running"}
