import requests
from bs4 import BeautifulSoup


session = requests.session()
response = session.get(
    'https://makaut.ucanapply.com/smartexam/public/result-details')
cookie = session.cookies.get_dict()
formatted_cookie = "XSRF-TOKEN=" + cookie["XSRF-TOKEN"] + "; examination_session=" + cookie["examination_session"]
# post = requests.post("http://localhost:5000/get_cookie", data=cookie)

html = requests.get("https://makaut.ucanapply.com/smartexam/public/result-details")
soup = BeautifulSoup(html.content, "lxml")
meta = soup.findAll("meta")
token = meta[3]["content"]
print(token)
print(formatted_cookie)
# post = requests.post("http://localhost:5000/get_token", data=token)
