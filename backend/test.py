import requests

# Define the GraphQL endpoint URL
url = 'https://ctf-questions.onrender.com/'

# Define the introspection query
query_template = '''

    query IntrospectionQuery {
      __schema {
        
        queryType { name }
        mutationType { name }
        subscriptionType { name }
        types {
          ...FullType
        }
        directives {
          name
          description
          
          locations
          args {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      description
      
      
      fields(includeDeprecated: true) {
        name
        description
        args {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      description
      type { ...TypeRef }
      defaultValue
      
      
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
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