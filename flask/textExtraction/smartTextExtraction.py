import Algorithmia

def extract_text(url):

    data = url
    client = Algorithmia.client('simWe97NtJhjsrvkB0qrvKXPijo1')
    algo = client.algo('ocr/RecognizeCharacters/0.3.0')
    result = algo.pipe(data).result
    return {"result": result}

