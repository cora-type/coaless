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
    a = []
    for link in links:
        link_href = link.get('href')
        if "url?q=" in link_href and not "webcache" in link_href:
            title = link.find_all('h3')
            if len(title) > 0:
                try:
                    a+=reddit_method(link.get('href').split("?q=")[1].split("&sa=U")[0])
                except:
                    print('got an invalid link')
                    continue
                
    #create a dictionary for each comment containing crucial attributes, pass as JSON to Node.js backend
    postlist = []
    for comment in a:
        post = {} # put this here
        post['Author'] = str(comment.author) #parsable author string
        post['Comment'] = comment.body_html #the actual comment
        post['Score'] = comment.score #the score of the comment
        post['Post'] = comment.submission.title #title from submission object within the comment object
        post['Permalink'] = comment.permalink #link to comment
        postlist.append(post)
    return postlist
    # print(a)


def reddit_method(link): #should return a list of objects
    comments_list = []
    reddit = praw.Reddit(client_id ='zkx-1C4UeAGQrvd-UDC92g',
                    client_secret ='aDpjcO0AUzDpEqfa1zoJvMxQI72Bvg',
                    user_agent ='redview.com by /u/redview_script',)

    submission = reddit.submission(url=link)
    comments = submission.comments
    
    for comment in comments:
        if comment.author == 'AutoModerator':
            pass
        elif comment.body == '[deleted]' or comment.body =='[removed]':
            pass
        else:
            comments_list.append(comment)
    
    return comments_list #return a list of all comment objects

# print(link_scraper('whats the best mattress'))