from flask import Flask, request, jsonify
import re

def assess_strength(password):
    length = len(password) >= 8
    upper = bool(re.search(r'[A-Z]', password))
    lower = bool(re.search(r'[a-z]', password))
    number = bool(re.search(r'[0-9]', password))
    special = bool(re.search(r'[\W_]', password))

    score = sum([length, upper, lower, number, special])
    if score <= 2:
        return "Weak"
    elif score == 3 or score == 4:
        return "Medium"
    else:
        return "Strong"

@app.route('/check', methods=['POST'])
def check_password():
    data = request.get_json()
    print("Data:",data)
    password = data.get('password', '')
    strength = assess_strength(password)
    return jsonify({'strength': strength})

if __name__ == '__main__':
    app.run(debug=True)