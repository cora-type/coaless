from bs4 import BeautifulSoup
import praw, json, re, requests

#grabs top 10 links from search query(t) and returns JSON
def link_scraper(t):
    query = t

    search = query.replace('', '+')
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
                a += reddit_method(link.get('href').split("?q=")[1].split("&sa=U")[0])
                
    #create a dictionary for each comment containing crucial attributes, pass as JSON to Node.js backend
    postlist = []
    for comment in a:
        post = {} # put this here
        post['Author'] = str(comment.author)
        post['Comment'] = comment.body_html
        post['Score'] = comment.score
        post['Post'] = comment.link_id
        post['Permalink'] = comment.permalink
        postlist.append(post)

    jsonStr = json.dumps(postlist)
    print (jsonStr)


def reddit_method(link): #should return a list of objects
    comments_list = []
    reddit = praw.Reddit(client_id ='zkx-1C4UeAGQrvd-UDC92g',
                    client_secret ='aDpjcO0AUzDpEqfa1zoJvMxQI72Bvg',
                    user_agent ='redview.com by /u/redview_script',)

    submission = reddit.submission(url=link)
    comments = submission.comments
    for _, comment in zip(range(5), comments):
        comments_list.append(comment)
    
    return comments_list #return a list of all comment objects

print(link_scraper('best shampoo'))