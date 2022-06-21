from types import new_class
from bs4 import BeautifulSoup
import praw, requests, datetime, time

#grabs top 10 links from search query(t)
def link_scraper(t):
    query = t

    search = query.replace(' ', '+')
    results = 10
    url = (f"https://www.google.com/search?q=site:reddit.com+{search}&num={results}")

    requests_results = requests.get(url)
    soup_link = BeautifulSoup(requests_results.content, "html.parser")
    links = soup_link.find_all("a")

    #scrapes the reddit URL's from google search results
    counter = 0
    data = {}
    for link in links:
        link_href = link.get('href')
        if "url?q=" in link_href and not "webcache" in link_href:
            title = link.find_all('h3')
            if len(title) > 0:
                try:
                    praw_comments(link.get('href').split("?q=")[1].split("&sa=U")[0], data, counter)
                    counter += 1
                except:
                    print('got an invalid link')
                    continue
    return data           


def praw_comments(submission, dict, counter): #should return a list of objects
    comments_list = []
    reddit = praw.Reddit(client_id ='zkx-1C4UeAGQrvd-UDC92g',
                    client_secret ='aDpjcO0AUzDpEqfa1zoJvMxQI72Bvg',
                    user_agent ='redview.com by /u/redview_script',)

    post = reddit.submission(url=submission)

    post_object = {}
    post_object['title'] = post.title #title from submission object
    post_object['permalink'] = post.permalink #link to comment
    post_object['author'] = str(post.author)
    ts = datetime.datetime.fromtimestamp(post.created_utc)
    r = ts.strftime('%m-%d-%y')
    post_object['date'] = r

    for comment in post.comments:
        if comment.author == 'AutoModerator':
            pass
        elif comment.body == '[deleted]' or comment.body =='[removed]' or comment.body == 'undefined':
            pass
        else: 
            comments_list.append(comment_creator(comment))
    post_object['comments'] = comments_list
    dict[counter] = post_object #create dictionary k/v


def comment_creator(comment):
    obj = {}
    obj['author'] = str(comment.author)
    obj['body'] = comment.body_html
    obj['score'] = comment.score
    obj['permalink'] = comment.permalink
    ts = datetime.datetime.fromtimestamp(comment.created_utc)
    r = ts.strftime('%Y-%m-%d')
    obj['date'] = r
    return obj