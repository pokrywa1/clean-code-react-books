export const deleteBook = (id) => {
    return fetch(`http://localhost:8080/books/${id}`, {
        method: 'DELETE',
    })
}
