from flask import Flask, render_template, send_file
import glob
app = Flask(__name__)


routing_dict = {
    'home': 'home.html',
    'contact': 'contact.html',
    'kontakt': 'contact.html',
    'prices': 'prices.html',
    'test': 'test.html',
}


@app.route('/resources/<resource>')
def send_js(resource):
    if '..' in resource or '//' in resource:
        return None
    return send_file(f'./resources/{resource}')


@app.route('/portfolio')
def render_portfolio():
    pictures = glob.glob('static/portfolio/*.jpg')
    return render_template('portfolio.html', pictures=pictures)


@app.route('/<page>')
def render_page(page):
    if page not in routing_dict.keys():
        return None
    return render_template(routing_dict[page])


@app.route('/')
def home():
    return render_template('home.html')


if __name__ == '__main__':
    app.run()
