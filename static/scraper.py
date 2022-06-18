from types import new_class
from bs4 import BeautifulSoup
import praw, json, re, requests

#grabs top 10 links from search query(t) and returns JSON
def link_scraper(t):
    query = t

    search = query.replace(' ', '+')
    results = 10
    url = (f"https://www.google.com/search?q=site:reddit.com+{search}&num={results}")

    requests_results = requests.get(url)
    soup_link = BeautifulSoup(requests_results.content, "html.parser")
    links = soup_link.find_all("a")

    #scrapes the reddit URL's from google search results and appends to list a
    counter = 0
    alpha = {}
    for link in links:
        link_href = link.get('href')
        if "url?q=" in link_href and not "webcache" in link_href:
            title = link.find_all('h3')
            if len(title) > 0:
                try:
                    praw_comments(link.get('href').split("?q=")[1].split("&sa=U")[0], alpha, counter)
                    counter += 1
                except:
                    print('got an invalid link')
                    continue
    return alpha           


def praw_comments(submission, dict, counter): #should return a list of objects
    comments_list = []
    reddit = praw.Reddit(client_id ='zkx-1C4UeAGQrvd-UDC92g',
                    client_secret ='aDpjcO0AUzDpEqfa1zoJvMxQI72Bvg',
                    user_agent ='redview.com by /u/redview_script',)

    post = reddit.submission(url=submission)

    post_object = {} # put this here
    post_object['Post'] = post.title #title from submission object within the comment object
    post_object['Permalink'] = post.permalink #link to comment

    for comment in post.comments:
        comments_list.append(comment_creator(comment))
    post_object['Comments'] = comments_list
    dict[counter] = post_object #create dictionary k/v


def comment_creator(comment):
    obj = {}
    if comment.author == 'AutoModerator':
        pass
    elif comment.body == '[deleted]' or comment.body =='[removed]':
        pass
    else:
        obj['Author'] = str(comment.author)
        obj['Comment'] = comment.body_html
        obj['Score'] = comment.score
        obj['Permalink'] = comment.permalink
    
    return obj

print(link_scraper('whats the best vaccuum'))