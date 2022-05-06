import requests
from bs4 import BeautifulSoup
import re

query = ' shampoo for oily hair' #input goes here

search = query.replace(' ', '+')
results = 10
url = (f"https://www.google.com/search?q=site:reddit.com+{search}&num={results}")

requests_results = requests.get(url)
soup_link = BeautifulSoup(requests_results.content, "html.parser")
links = soup_link.find_all("a")

a = []
for link in links:
    link_href = link.get('href')
    if "url?q=" in link_href and not "webcache" in link_href:
      title = link.find_all('h3')
      if len(title) > 0:
          a.append(link.get('href').split("?q=")[1].split("&sa=U")[0])

print("Values of a:", a)    
