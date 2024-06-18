import requests
import json

payload = json.dumps({
    "base_model_id": "sdxlV8DwajSa",
    "model_name": "your_model_name",
    "headshot_optimizer": True,
    "training_images_url": "http://training-cheri.s3-website-us-east-1.amazonaws.com/cherie.zip",
    "steps": 2000,
    "subject": "woman",
    "learning_rate": 0.00001,
    "instance_prompt": "photo of skw woman",
    "resolution": [
        1024,
        1024
    ],
    "sample_generation_job": {
        "prompt": "photo of skw woman, professional portrait, neutral background",
        "negative_prompt": "",
        "seed": -1,
        "sampler_name": "DPM++ 2M SDE Karras",
        "num_generations":5,
        "steps": 30,
        "cfg_scale": 7,
        "width": 1024,
        "height": 1024
    }
})
url = "https://api.lightsketch.ai/v1/training/dreambooth"

headers = {
  'Content-Type': 'application/json',
  'api_key': '68151bc0-ae3a-4542-8e86-5dd51fca6719'
}

training_response = requests.request("POST", url, headers=headers, data=payload)
print(training_response)