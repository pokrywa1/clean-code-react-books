export const deleteUser = (id) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
    })
