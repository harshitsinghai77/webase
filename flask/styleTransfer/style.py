import Algorithmia

def get_style(url):

    filePath = "data://.algo/deeplearning/DeepFilter/perm/result_styleTransfer.jpg"
    data = {
      "images": [
        url
      ],
      "savePaths": [filePath],
      "filterName": "smooth_ride"
    }
    client = Algorithmia.client('simWe97NtJhjsrvkB0qrvKXPijo1')
    algo = client.algo('deeplearning/DeepFilter/0.6.0')
    processImage = algo.pipe(data).result

    result = client.file(filePath).getBytes()
    return result




