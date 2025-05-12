export const addBook = (book) =>
    fetch('http://localhost:8080/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    }).then((res) => res.json())
