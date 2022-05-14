# redview
a simple web app with flask and node.js using Reddit's API via PRAW to simplify google-reddit searches.


https://redview.herokuapp.com

Description//
A web app used to simplify the reddit searching process for non-reddit users. More and more people put "site:reddit.com: at the end of google searches to find what they're looking for because Google searches are cluttered with blog posts and articles that are just ads, marketing and unreliable information. Reddit has become the best resource for honest information from real people. Redview simply consolidates all the comments from the top 10 Reddit posts in relation to a search query, in a one page, easy to digest way, rather than clicking on link after link in Google.

Known Issues//
PRAW is slow, so the app takes a few seconds to grab the results. Need to find a way to make it faster. Worst case run time so far has been 12 seconds D:
