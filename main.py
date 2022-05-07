from bs4 import BeautifulSoup
import praw, json, re, requests

def link_scraper(t):
    query = t

    search = query.replace('', '+')
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
    
    print(a)

def reddit_method(links):    
    reddit = praw.Reddit(client_id ='zkx-1C4UeAGQrvd-UDC92g',
                    client_secret ='aDpjcO0AUzDpEqfa1zoJvMxQI72Bvg',
                    user_agent ='redview.com by /u/redview_script',)
    
    submission = reddit.submission(url=links)
    comments = submission.comments
    for comment in comments: #returns a comment object
        print(comment.body) 
        print(comment.author)
        print('\n')

print(reddit_method('https://www.reddit.com/r/VacuumCleaners/comments/nfurvt/the_recommended_vacuums_list_has_been_upgraded_to/'))

