import Algorithmia

def nsfw_predict(url):

    client = Algorithmia.client('simWe97NtJhjsrvkB0qrvKXPijo1')
    algo = client.algo('spullara/YahooOpenNSFW/0.1.1')
    return algo.pipe(url).result
