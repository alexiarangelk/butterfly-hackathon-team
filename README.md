# 🦋 butterfly-hackathon-team 🦋
2023 AI Hackathon Butterfly + Flower model app team!
Alexia Rangel Krashenitsa
Jay Rosen
Amber Weihrich
Sonya Babski

- App created wtih React
- Using Github for project tracking, collaboration, and organization
- Butterfly + flower identification classification model will be created with python

## 🔎 Project Name:
Butterfly AI

## 🔎 Elevator Pitch: 
`Provide a short tagline for the project.`
What is that? A butterfly, hopefully! Butterfly AI is an application that utilizes machine learning to identify and provide additional information on various butterfly species.


---

## 🔎 Project Story
### > 🌼 About the project

#### About
Despite rarely being thought about, entomology is one of the most prevalent fields in everyday life. Over 150 species of butterfly are native to Florida but over 115,000 species of lepidoptera have been described globally. Identification apps have become crucial tools to those in the field of entomology or even to the curious hiker, but they aren't always the most user friendly for finding specific information. Thus, we were inspired to develop a tool that people can use to not only identify butterflies, but also extract specific information through the use of a chat feature to simplify the current encyclopedia format most apps currently use as well as store user-specific information of recorded sightings for future reference.

#### Dataset Development
Naturally, the development of a butterfly application requires a lot of butterfly data. We began the process by finding an available butterfly dataset, however we found that many of the species included were not present in Florida. With the Florida Museum of Natural History in mind, we then decided to expand our dataset based on the museum's catalog and ended up finding images for over 70 additional species. This was done by mass downloading images of each species, then manually going through each folder to remove images that were either irrelevant or of an incorrect species.

#### Model Development

The model was developed using Tenserflow / Keras in Google Colab. It is a deep-learning image classifier for butterflies and moths. We used our filtered initial dataset with Florida Butterflies and moths to train the model. The final model had 85.40% accuracy. 

#### Challenges

We encountered our biggest challenges with model training and React. The butterfly dataset we found had many species, but not many images for each species. This resulted in our fitted model being overfitted, with a high training accuracy but a low validation accuracy. A lot of time was spent refining this model until the accuracy was high enough to identify new, untrained images correctly. React was our initial idea for a web app, but it came with a lot of challenges. We had issues starting up the webapp on different laptops and integrating the model into the front-end. 

#### Future Development

Our vision with this project is to expand our web app to include more accurate image classification, more species of butterflies, moths, and other insects and aracnids, and a more specialized image identification about the bug (like diseases, environments, age, and more). Our initial idea also included a chat app, which would activate after a butterfly/moth was classified. This chatapp would be open to specific questions about the identified butterfly. Chat history and location of the specific butterfly/moth would be recorded.

### > 🌼 Built with
**Languages:**
Python
Flask
Tensorflow
Javascript
HTML

**APIs:**
ArcGIS Python API

**Databases:**
GBIF (Global Biodiversity Information Facility)

**Machine Learning:**
Tenserflow
Keras
Sequential Model

**Software:**
ArcGIS Online
ArcGIS Pro
Leaflet JS Library


### > 🌼 "Try it out" links
[Github Repository](https://github.com/alexiarangelk/butterfly-hackathon-team)
[Model Process Document](https://github.com/alexiarangelk/butterfly-hackathon-team/blob/main/Butterfly%20Image%20Classifier%20Process.md)


## 🔎 Project Media
### > 🌼Image gallery
```
JPG, PNG or GIF format, 5 MB max file size. For best results, use a 3:2 ratio.
```
![](https://hackmd.io/_uploads/ByVqx2K-6.png)
![](https://hackmd.io/_uploads/rJ1s-2K-6.png)
![](https://hackmd.io/_uploads/SJujbhF-a.png)
![](https://hackmd.io/_uploads/B1Iuw3Kba.jpg)
![](https://hackmd.io/_uploads/r12MRhKZT.png)
![](https://hackmd.io/_uploads/B1N70nFW6.png)

### > 🌼Video demo link

