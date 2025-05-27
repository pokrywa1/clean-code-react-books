export const getUsers = () => {
    return fetch('http://localhost:8080/users').then((res) => res.json())
}
