import Algorithmia

def classify_real_estate(url):

    input_dict = {
      "image": url,
      "numResults": 20
    }
    client = Algorithmia.client('simWe97NtJhjsrvkB0qrvKXPijo1')
    algo = client.algo('deeplearning/RealEstateClassifier/0.2.21')
    return algo.pipe(input_dict).result['predictions']


