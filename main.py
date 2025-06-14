from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api", methods=["GET", "POST"])
def qa():
    if request.method == "POST":
        data = request.get_json()
        question = data.get('question', '')
        # Here you can process the question and generate a response
        response = f"You asked: {question}. This is a sample response from Shoaib's AI!"
        return jsonify({"result": response})
    
    data = {"result": "Shoaib is Here!"}
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)