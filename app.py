from flask import Flask, render_template, request, redirect,  send_from_directory, jsonify
import csv
import pandas as pd
import json

app = Flask(__name__)

# Load websites data from CSV file
def load_dex():
    dex = []
    with open('butterfly_dex.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            dex.append(row)
    return dex

@app.route('/')
def index():
    dex = load_dex()
    return render_template('dex.html', dex=dex)


def read_csv_data(file_path):
    data = []
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

@app.route('/Butterfly/<butterfly>')
def butterfly_page(butterfly):
    # Replace %20 with spaces in the butterfly parameter
    butterfly = butterfly.replace('%20', ' ')

    dex = load_dex()

    # Look up the butterfly in the dex
    butterfly_info = next((item for item in dex if item['Butterfly'] == butterfly), None)

    if butterfly_info is None:
        return "Butterfly not found", 404

    return render_template('butterfly_single.html', butterfly=butterfly_info)


@app.route('/camera')
def camera():
    df = pd.read_csv('butterfly_dex.csv')
    df.fillna('N/A', inplace=True)  # Replace NaN values with 'N/A'
    dex = df.to_dict(orient='records')
    return render_template('camera.html', dex=json.dumps(dex))


@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/update-csv', methods=['POST'])
def update_csv():
    id_str = request.form['id']
    if id_str:
        id_value = int(id_str)
    else:
        # Handle the case where the 'id' field is empty
        # You can either ignore it or provide a default value
        id_value = -1  # or any other default value

    column = request.form['column']
    value = request.form['value']
    
    df = pd.read_csv('websites.csv')
    matching_rows = df[df['id'] == id_value]
    
    if not matching_rows.empty:
        index = matching_rows.index[0]
        df.at[index, column] = value
        df.to_csv('websites.csv', index=False)
        return 'success'
    else:
        return 'ID not found', 404


@app.route('/images/path:filename')
def serve_image(filename):
    return send_from_directory('images', filename)



if __name__ == '__main__':
#   app.run(debug=True)
    app.run(debug=True, host="0.0.0.0", port=3000)

