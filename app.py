import os.path

from flask import Flask, render_template, send_file
import tomli
import glob
app = Flask(__name__)


CFG_FILE = "./config.toml"
ROUTING_DICT = {
    'home': 'home.html',
    'contact': 'contact.html',
    'kontakt': 'contact.html',
    'prices': 'prices.html',
    'test': 'test.html',
    '3d': '3d.html',
}
CONFIG_DEPS = {
    'home': 'carousel',
    '3d': '3d'
}


@app.route('/resources/<resource>')
def send_js(resource):
    if '..' in resource or '//' in resource:
        return None
    return send_file(f'./resources/{resource}')


@app.route('/portfolio')
def render_portfolio():
    return render_image_wall('static/portfolio/*.jpg', 'Portfolio')


@app.route('/plans')
def render_plans():
    return render_image_wall('static/plans/*.jpg', 'Plánky')


def render_image_wall(img_path, title):
    return render_template('image_wall.html', pictures=glob.glob(img_path), title=title)


@app.route('/<page>')
def render_page(page):
    if page not in ROUTING_DICT.keys():
        return None
    if page in CONFIG_DEPS.keys():
        if os.path.isfile(CFG_FILE):  # TODO: log this
            with open(CFG_FILE, "rb") as f:
                toml_dict = tomli.load(f)
            return render_template(ROUTING_DICT[page], config=toml_dict[CONFIG_DEPS[page]])

    return render_template(ROUTING_DICT[page], config={})


@app.route('/')
def home():
    return render_page('home')


if __name__ == '__main__':
    app.run()
