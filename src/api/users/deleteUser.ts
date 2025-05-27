export const deleteUser = (id) => {
    return fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
    })
}
