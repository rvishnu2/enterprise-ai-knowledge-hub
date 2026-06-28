import requests
from bs4 import BeautifulSoup

def secret_message(url):
    url = url.strip()
    html = requests.get(url, timeout=20)
    html.raise_for_status()

    rtn = BeautifulSoup(html.text, "html.parser")

    ordinates = {}
    x_width = 0
    x_height = 0

    for r in rtn.select("tr")[1:]:
        cells = r.find_all("td")
        if len(cells) != 3:
            continue

        try:
            x = int(cells[0].get_text(strip=True))
            symbol = cells[1].get_text(strip=True)
            y = int(cells[2].get_text(strip=True))
        except ValueError:
            continue

        ordinates[(x, y)] = symbol

        if x > x_width:
            x_width = x
        if y > x_height:
            x_height = y

    output = []

    for y in range(x_height, -1, -1):
        line = []
        for x in range(x_width + 1):
            line.append(ordinates.get((x, y), " "))
        output.append("".join(line).rstrip())

    print("\n".join(output))

secret_message("https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub")