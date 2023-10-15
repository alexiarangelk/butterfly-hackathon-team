# Butterfly Image Classifier Process
By Alexia Rangel Krashenitsa

**Referenced:**
* [*Build a Deep CNN Image Classifier with ANY Images* by Nicholas Renotte](https://https://youtu.be/jztwpsIzEGc?si=q6WQdeSIJ3_AtLl4)
* [*Image Classification* by TenserFlow Documentation](https://https://www.tensorflow.org/tutorials/images/classification#compile_and_train_the_model)

## **Data Collection**
We found a [100 butterfly dataset](https://https://www.kaggle.com/datasets/gpiosenka/butterfly-images40-species) on Kaggle to start us off. To save on resources and provide easier means for demoing later, we filtered our data to only include butterflies and moths in Florida or in the [Florida Museum of Natural History](https://https://www.floridamuseum.ufl.edu/exhibits/butterfly-rainforest/searchable-id-gallery/) in Gainesville. As the Kaggle dataset didn't include many butterflies/months in the museum, we also used a chrome extension to mass download images from google images of more butterflies/moths that are in the museum. This new data was unfortunately very limited due to time, available online images, and filtering that had to be done manually to ensure the right images were being stored for each butterfly/moth. 

## **Image Classification Information**
Image classification was carried out using Tenserflow and Keras. Input was the image of the butterfly/moth, and output was the species name. The Kaggle dataset already split the image data between test, train, and validation, so that split was utilized within the python program.

Below is 10 images in one batch of the training data, correctly labelled and loaded into the program. 

![](https://hackmd.io/_uploads/Skib4sOb6.png)

Preprocessing included resizing the image to 224 x 244 and scaling the data to 255. 


## **Model Training Part 1**
Model layers were as follows:

    model = Sequential([
      layers.Conv2D(16, (3,3), 1, activation='relu', input_shape=(224,224,3)),
      layers.MaxPooling2D(),
      layers.Conv2D(32, (3,3), 1, activation='relu'),
      layers.MaxPooling2D(),
      layers.Conv2D(16, (3,3), 1, activation='relu'),
      layers.MaxPooling2D(),
      layers.Flatten(),
      layers.Dense(224, activation='relu'),
      layers.Dense(num_classes, name="outputs")
    ])


Training went on for about 1 hour. 

![](https://hackmd.io/_uploads/S1hV09db6.png)
![](https://hackmd.io/_uploads/SJxrCquWT.png)

The result charts showed that the model was **overfitting**, probably because there wasn't enough images for every butterfly. This is further evident when I tested the model on new images. No matter the high accuracy, the model predicted incorrectly with 100% confidence. To overcome this, I applied data augementation and dropout as layers to the model. 

## **Model Training Part 2**

Model layers were as follows:

    model = Sequential([
      data_augmentation,
      layers.Rescaling(1./255),
      layers.Conv2D(16, (3,3), 1, activation='relu', input_shape=(224,224,3)),
      layers.MaxPooling2D(),
      layers.Conv2D(32, (3,3), 1, activation='relu'),
      layers.MaxPooling2D(),
      layers.Conv2D(16, (3,3), 1, activation='relu'),
      layers.MaxPooling2D(),
      layers.Dropout(0.2),
      layers.Flatten(),
      layers.Dense(224, activation='relu'),
      layers.Dense(num_classes, name="outputs")
    ])
    
where
```
data_augmentation = keras.Sequential(
      [
        layers.RandomFlip("horizontal", input_shape=(224,224,3)),
        layers.RandomRotation(0.2),
        layers.RandomZoom(0.2),
      ]
    )
```

Results:

![](https://hackmd.io/_uploads/rJfYQoYZp.png)
![](https://hackmd.io/_uploads/HyFKQiKb6.png)

All the adjustments to the model resulted in great difference between the training and validation data in terms of accuracy and loss. I knew I had to find a middle ground.


## **Model Training Part 3**
I tried many different layers, different methods of data augmentation, and so on. Most of the attempts were still overfitted, but it was starting to look better. My best attempt so far was model 3, with the following model layers, and fit with 10 epochs:

```
model = Sequential([
  data_augmentation,
  layers.Conv2D(16, (3,3), 1, activation='relu', input_shape=(224,224,3)),
  layers.MaxPooling2D(),
  layers.Conv2D(32, (3,3), 1, activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(16, (3,3), 1, activation='relu'),
  layers.MaxPooling2D(),
  layers.Flatten(),
  layers.Dense(224, activation='relu'),
  layers.Dense(num_classes, name="outputs")
])

model.compile('adam', loss=tf.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=['accuracy'])
```
Where

```
data_augmentation = keras.Sequential(
  [
    layers.RandomFlip("horizontal", input_shape=(224,224,3)),
    layers.RandomRotation(0.2),
  ], name="data_augmentation_layer"
)
```

Results:
![](https://hackmd.io/_uploads/Bky0ViFWa.png)
![](https://hackmd.io/_uploads/BkSCVoFWp.png)

I tried again with 20 epochs, and got the accuracy up to 85.40% (model4) with a loss of 73.85%. 

Results:
![](https://hackmd.io/_uploads/SJzjTnt-T.png)
![](https://hackmd.io/_uploads/SkPsThtWp.png)

## **Post-Training Reflection**
Still, I wondered if I could take this further. My model isn't perfect by any means, especially since it's the first image classifier I made using Tenserflow and Keras deep-learning. If I had more time, I would continue to refine this last model. 

## **Testing**
For each of the training models, I loaded a butterfly image from outside the dataset and used the model to predict the butterfly/moth. 

## **Future Work / Things that can be Improved**
The biggest issue with our model lies in the dataset size. There are many different species of butterflies and moths, but the amount of images we have for each of these species is limited. This prevented our model from being trained with without bias. In a long-term project, we would spend considerable amount of time building a worthy dataset consisting of a large amount of image data for each species. 