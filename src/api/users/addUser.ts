export const addUser = ({ name, email }) => {
    return fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
    }).then((res) => res.json())
}
