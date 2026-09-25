import torch
import torch.nn as nn
from PIL import Image
from torchvision import models, transforms

DEVICE = torch.device("cpu")
MODEL_PATH = "ai/models/mobilenet_v3_e_waste.pth"
CLASSES = [
    'CABLE_WIRE', 'COMPUTER_LAPTOP', 'FRIDGE_AC', 'MOBILE_TABLET',
    'NOT_SURE', 'OTHER_ELECTRONICS', 'TV_MONITOR', 'WASHING_APPLIANCE'
]
CONFIDENCE_THRESHOLD = 0.85

def load_model():
    model = models.mobilenet_v3_small(weights=None)
    in_features = model.classifier[3].in_features
    model.classifier[3] = nn.Linear(in_features, len(CLASSES))
    
    state_dict = torch.load(MODEL_PATH, map_location=DEVICE)
    model.load_state_dict(state_dict)
    model.eval()
    return model

model = load_model()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict(pil_image: Image.Image) -> dict:
    image_rgb = pil_image.convert("RGB")
    tensor = transform(image_rgb).unsqueeze(0).to(DEVICE)
    
    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        conf, pred_idx = torch.max(probabilities, dim=0)
        
        raw_class = CLASSES[pred_idx.item()]
        confidence_score = round(conf.item(), 4)

    if confidence_score < CONFIDENCE_THRESHOLD:
        final_class = "NOT_SURE"
        requires_manual = True
    else:
        final_class = raw_class
        requires_manual = False

    return {
        "status": "success",
        "predicted_class": final_class,
        "raw_prediction": raw_class,
        "confidence": confidence_score,
        "requires_manual_review": requires_manual,
        "class_probabilities": {
            cls_name: round(prob.item(), 4) 
            for cls_name, prob in zip(CLASSES, probabilities)
        }
    }