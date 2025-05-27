export const editBook = (id, { title, genre, author_id }) => {
    return fetch(`http://localhost:8080/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, author_id }),
    }).then((res) => res.json())
}
