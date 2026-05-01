from PIL import Image
import os

def crop_center(img, target_width, target_height):
    width, height = img.size
    target_ratio = target_width / target_height
    img_ratio = width / height
    
    if img_ratio > target_ratio:
        new_width = int(height * target_ratio)
        left = (width - new_width) / 2
        top = 0
        right = (width + new_width) / 2
        bottom = height
    else:
        new_height = int(width / target_ratio)
        left = 0
        top = (height - new_height) / 2
        right = width
        bottom = (height + new_height) / 2
        
    return img.crop((left, top, right, bottom))

path = "public/projects/umay/umay_side_v2.png"
if os.path.exists(path):
    img = Image.open(path)
    cropped = crop_center(img, 16, 9)
    cropped.save(path)
    print("Cropped umay_side_v2.png to 16:9")
