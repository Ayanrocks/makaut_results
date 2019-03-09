import requests
from bs4 import BeautifulSoup

def get_cookie():

    session = requests.session()
    response = session.get(
        'https://makaut.ucanapply.com/smartexam/public/result-details')
    cookie = session.cookies.get_dict()

    soup = BeautifulSoup(response.content, "lxml")
    meta = soup.findAll("meta")
    token = meta[3]["content"]
    formatted_cookie = "XSRF-TOKEN=" + \
        cookie["XSRF-TOKEN"] + "; examination_session=" + \
        cookie["examination_session"]+";"
    diction = dict({
        "token": token,
        "cookie": formatted_cookie
    })

    return diction
