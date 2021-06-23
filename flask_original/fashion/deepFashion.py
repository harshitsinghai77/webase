import Algorithmia

def deep_fashion(url):

    data = {
      "image": url,
      "model": "mid",
      "tags_only": True
    }
    client = Algorithmia.client('simWe97NtJhjsrvkB0qrvKXPijo1')
    algo = client.algo('algorithmiahq/DeepFashion/1.3.0')
    result = algo.pipe(data).result['articles']
    final_result = []
    for values in result:
        values.pop("bounding_box")
        final_result.append(values)
        
    return final_result

def detectGender(url):
    client = Algorithmia.client('simWe97NtJhjsrvkB0qrvKXPijo1')
    algo = client.algo('deeplearning/GenderClassification/2.0.0')
    result = algo.pipe(url).result['results']
    final_result = []
    for values in result:
        values.pop('bbox')
        final_result.append(values)
    return final_result



