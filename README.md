# Sentiment Analysis Web Application using BERT & DistilBERT

This project is a **full-stack Sentiment Analysis Web Application** that predicts the sentiment of a given text using **Transformer-based models (BERT, ALBERT & DistilBERT)** along with **Traditional Machine Learning models**. The application provides real-time sentiment prediction with confidence scores and evaluation metrics.

---

## 🚀 Features

* ✅ Text-based sentiment prediction
* ✅ Supports **BERT, DistilBERT & ALBERT** models
* ✅ Option to include traditional ML models (Naive Bayes, SVM, Logistic Regression)
* ✅ Displays **prediction, confidence, accuracy, precision, recall, F1-score**
* ✅ **Modern responsive UI using Tailwind CSS**
* ✅ Interactive and colorful frontend
* ✅ Fast and scalable backend using **FastAPI**

---

## 🛠️ Tech Stack

### Frontend:

* React.js
* **Tailwind CSS**
* HTML, CSS, JavaScript
* Axios for API calls

---

## 📁 Project Structure

```
sentiment-analysis-project/
│
├── backend/
│   ├── app.py
│   ├── models/
│   │   ├── bert/
│   │   ├── distilbert/
│   │   ├── albert/
│   │   ├── svm.pkl
│   │   └── naive_bayes.pkl
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── dataset/
│   ├── train.csv
│   └── test.csv
│
└── README.md
```

---

## 📊 Dataset

* The dataset contains two files:

  * `train.csv`
  * `test.csv`
* Each file contains the following columns:

  * `text` → Input sentence
  * `sentiment` → Output label

---

## ⚙️ Installation & Setup

### 1️⃣ Project Setup

* Download the project as a ZIP file or copy the source code manually into your local system.
* Extract the folder and open it in **VS Code** or any preferred IDE.

---

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Run the backend server:

```bash
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## 🧠 Model Training

* **BERT, DistilBERT, and ALBERT models** are trained using the Kaggle dataset
* Training is done in **Google Colab** and saved as model folders
* Each trained model folder contains:

  * `config.json`
  * `pytorch_model.bin` / `model.safetensors`
  * `tokenizer files`
* The trained models are loaded into the backend for live predictions

---

## 🧪 API Endpoint Example

```http
POST /predict
```

Request Body:

```json
{
  "text": "The movie was absolutely fantastic!"
}
```

Response:

```json
{
  "model": "BERT / DistilBERT / ALBERT",
  "sentiment": "Positive",
  "confidence": 0.94
}
```

---

## 📈 Evaluation Metrics

* Accuracy
* Precision
* Recall
* F1-Score

These metrics are displayed for each selected model.

---

## 📌 Future Enhancements

* Advanced comparison dashboard for BERT, DistilBERT & ALBERT
* Deploy using AWS / Render
* User authentication

---

<img width="584" height="612" alt="Screenshot 2025-06-15 130128" src="https://github.com/user-attachments/assets/6eea182f-afaf-4744-9cab-e247b46fc0ad" />

## 👩‍💻 Developer

**Name:** Ambika Gunji
**Domain:** Artificial Intelligence & Machine Learning
**College:** RVR & JC College of Engineering

---

## ⭐ Acknowledgements

* Kaggle Datasets
* Google Colab
* FastAPI Documentation
* React Documentation

---



✅ *If you like this project, give it a star on GitHub!*
