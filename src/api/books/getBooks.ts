export const getBooks = () => {
    return fetch('http://localhost:8080/books').then((res) => res.json())
}
