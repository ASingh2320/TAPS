require('isomorphic-fetch');

test("Update User", async () => {
    const newUser = {
        "updateUser": {
            "name": "Bobby Shmurda",
            "username": "Changed",
            "email": "GoNewYorkGoNewYorkGo@gmail.com",
            "hash": "4567",
            "bio": "Mechanical Engineer"
        }
    };

    await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            updateUser(id: "63629a7c161eda1dd75b47e4", name: "Bobby Shmurda", username: "Changed", email: "GoNewYorkGoNewYorkGo@gmail.com", hash: "4567", bio: "Mechanical Engineer"){
              name,
              username,
              email,
              hash,
              bio
            }
          }` 
        })
    })
    .then(res => res.json())
    .then(res => expect(res.data).toEqual(newUser));

    await fetch('https://taps416.herokuapp.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // The query we are sending to the GraphQL API
    body: JSON.stringify({ query: 
        `mutation{
            updateUser(id: "63629a7c161eda1dd75b47e4", name: "Kevin", username: "Kev", email: "kevinduong@yahoo.com", hash: "1234", bio: "Software Engineer"){
              name,
              username,
              email,
              hash,
              bio,
            }
          }` 
        })
    })
    .then(res => res.json());
})
