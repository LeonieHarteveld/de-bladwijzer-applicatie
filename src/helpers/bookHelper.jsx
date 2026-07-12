
export function enrichBooks(books, authors, genres) {
    return books.map((book) => {
        const author = authors.find(
            (author) => author.id === book.authorId
        );

        const genre = genres.find(
            (genre) => genre.id === book.genreId
        );

        return {
            ...book,
            author,
            genre,
        };
    });
}


export function filterBooks(
    books,
    selectedGenre = null,
    searchTerm = ''
) {
    const normalizedSearchTerm =
        searchTerm.trim().toLowerCase();

    return books.filter((book) => {
        if (normalizedSearchTerm !== '') {
            const matchesTitle = book.title
                .toLowerCase()
                .includes(normalizedSearchTerm);

            const matchesAuthor = book.author?.name
                .toLowerCase()
                .includes(normalizedSearchTerm);

            const matchesIsbn = book.isbn
                .toLowerCase()
                .includes(normalizedSearchTerm);

            return (
                matchesTitle ||
                matchesAuthor ||
                matchesIsbn
            );
        }

        return (
            selectedGenre === null ||
            book.genreId === selectedGenre
        );
    });
}