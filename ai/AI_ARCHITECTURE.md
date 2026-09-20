# AI Architecture

## Day 1 Flow

Mobile App
    ↓
Backend API
    ↓
AI Service
    ↓
Material Classification
    ↓
Prediction
    ↓
Backend API
    ↓
Mobile App

## AI Service

Technology:
- Python
- FastAPI

Endpoint:
- POST /analyze

Input:
- Scrap/e-waste image

Output:
- Material category
- Confidence
- Simulated status

## Material Categories

PCB
Cable
Battery
Motor
CRT
LCD
Mixed Plastic
Other

## Day 1 Status

The AI endpoint is functional, but the prediction is simulated.

A trained material-classification model will be integrated after the initial prototype setup.