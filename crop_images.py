from PIL import Image
import os

def crop_center(img, target_width, target_height):
    width, height = img.size
    
    # Calculate target aspect ratio
    target_ratio = target_width / target_height
    img_ratio = width / height
    
    if img_ratio > target_ratio:
        # Image is wider than target: crop width
        new_width = int(height * target_ratio)
        left = (width - new_width) / 2
        top = 0
        right = (width + new_width) / 2
        bottom = height
    else:
        # Image is taller than target: crop height
        new_height = int(width / target_ratio)
        left = 0
        top = (height - new_height) / 2
        right = width
        bottom = (height + new_height) / 2
        
    return img.crop((left, top, right, bottom))

# Main image (16:9 aspect ratio)
main_path = "public/projects/umay/umay_main.png"
if os.path.exists(main_path):
    img = Image.open(main_path)
    cropped = crop_center(img, 16, 9)
    cropped.save(main_path)
    print("Cropped umay_main.png to 16:9")

# Side image (9:16 aspect ratio or roughly 1:2)
# Side images are usually phone mockups, so 9:16 is good.
side_path = "public/projects/umay/umay_side.png"
if os.path.exists(side_path):
    img = Image.open(side_path)
    cropped = crop_center(img, 9, 16)
    cropped.save(side_path)
    print("Cropped umay_side.png to 9:16")

