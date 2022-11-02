require('isomorphic-fetch');

test("Delete User", async () => {
    const newMap = {
        "deleteUser": {
            "name": "Joe Mama",
            "username": "To be deleted",
            "email": "JoeMama@JoeMama.com",
            "hash": "4567",
            "bio": "Software Engineer"
        }
    };

    let res = await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            createUser(name: "Joe Mama", username: "To be deleted", email: "JoeMama@JoeMama.com", hash: "4567", bio: "Software Engineer"){
              id,
            }
          }` 
        })
    })
    .then(res => res.json())
    
    let idnum = res.data.createUser.id;

    return fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            deleteUser(id: "${idnum}"){
              name,
              username,
              email,
              hash,
              bio,
            }
          }` 
        })
    })
    .then(res => res.json())
    // The test condition itself2
    .then(res => expect(res.data).toEqual(newMap));
})