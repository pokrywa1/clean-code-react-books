export const editUser = (id, { name, email }) => {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
    }).then((res) => res.json())
}
