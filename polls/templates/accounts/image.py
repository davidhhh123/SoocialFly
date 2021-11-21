from PIL import Image
from numpy import asarray
import numpy as np
from numpy import reshape
# load the image
image = Image.open('a.jpg')
image1 = Image.open('b.jpg')
new_image = image.resize((300, 300))
new_image1 = image1.resize((300, 300))
greyscale_image = new_image.convert('L')
greyscale_image1 = new_image1.convert('L')
# convert image to numpy array
data = asarray(greyscale_image)
data1 = asarray(greyscale_image1)

print(type(data))
# summarize shape
print(data.shape)
print(data1.shape)

# create Pillow image
image2 = Image.fromarray(data)
image3 = Image.fromarray(data1)
print(type(image2))

# summarize image details
print(image2.mode, image3.mode)
print(image2.size, image3.size)


inverse = np.linalg.inv(data1)

r = np.dot(data, inverse)
print(float(np.linalg.det(r)))


