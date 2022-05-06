import requests
from bs4 import BeautifulSoup
import re

query = "site:Reddit.com shampoo for oily hair"
search = query.replace(' ', '+')
results = 10
url = (f"https://www.google.com/search?q={search}&num={results}")

requests_results = requests.get(url)
soup_link = BeautifulSoup(requests_results.content, "html.parser")
links = soup_link.find_all("a")

for link in links:
    link_href = link.get('href')
    if "url?q=" in link_href and not "webcache" in link_href:
      title = link.find_all('h3')
      if len(title) > 0:
          print(link.get('href').split("?q=")[1].split("&sa=U")[0])
          print(title[0].getText())





# # and request libraries of python.
# import requests
# import bs4

# # Make two strings with default google search URL
# # 'https://google.com/search?q=' and
# # our customized search keyword.
# # Concatenate them
# text= "cool videos"
# url = 'https://google.com/search?q=site:Reddit.com' + text

# # Fetch the URL data using requests.get(url),
# # store it in a variable, request_result.
# request_result=requests.get( url )

# # Creating soup from the fetched request
# soup = bs4.BeautifulSoup(request_result.text,
# 						"html.parser")

# mydivs = soup.find_all("div", {"class": "egMi0 kCrYT"})
# for div in mydivs: 
# 	print (div)

