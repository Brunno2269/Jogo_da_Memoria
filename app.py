from flask import Flask, render_template, request
import webbrowser
from threading import Timer
import os

app = Flask(__name__)

# Variável para controlar se o navegador já foi aberto
browser_opened = False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/shutdown', methods=['POST'])
def shutdown():
    # Encerra o servidor
    os._exit(0)
    return '', 204

def open_browser():
    global browser_opened
    if not browser_opened:
        webbrowser.open_new('http://127.0.0.1:5000/')
        browser_opened = True

if __name__ == '__main__':
    # Verifica se o servidor está em modo de depuração
    if os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        # Abre o navegador automaticamente após 1 segundo
        Timer(1, open_browser).start()
    app.run(debug=True)