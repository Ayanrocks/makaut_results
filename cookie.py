import requests
from bs4 import BeautifulSoup

session = requests.session()
response = session.get(
    'https://makaut.ucanapply.com/smartexam/public/result-details')
cookie = session.cookies.get_dict()
formatted_cookie = "XSRF-TOKEN=" + \
    cookie["XSRF-TOKEN"] + "; examination_session=" + \
    cookie["examination_session"]+";"

soup = BeautifulSoup(response.content, "lxml")
meta = soup.findAll("meta")
token = meta[3]["content"]
print(token)

print(formatted_cookie)
