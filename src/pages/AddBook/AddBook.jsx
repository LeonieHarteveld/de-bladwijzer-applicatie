import styles from './AddBook.module.scss'
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";

import {addBook} from "../../helpers/bookService.jsx";
import {getAuthors, addAuthor} from "../../helpers/authorService.jsx";
import {getGenres} from "../../helpers/genreService.jsx";
import {sortByName} from "../../helpers/sortHelper.js";
import validateBookForm from "../../helpers/formValidation.js"
import FieldError from "../../components/FieldError/FieldError.jsx"

function AddBook() {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);

    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);
    const [isbnError, setIsbnError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const [formData, setFormData] = useState({
        title: '',
        authorId: '',
        authorName: '',
        authorDescription: '',
        isbn: '',
        genreId: '',
        publicationDate: '',
        description: '',
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setFieldErrors((previousErrors) => ({
            ...previousErrors,
            [e.target.name]: '',
        }));

        if (e.target.name === 'isbn') {
            setIsbnError('');
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchFormOptions() {
            try {
                toggleLoading(true);
                toggleError(false);

                const [authorData, genreData] = await Promise.all([
                    getAuthors(controller.signal),
                    getGenres(controller.signal),
                ]);

                setAuthors(sortByName(authorData));
                setGenres(sortByName(genreData));
            } catch (e) {
                console.error(e);
                toggleError(true);
            } finally {
                toggleLoading(false);
            }
        }

        fetchFormOptions();

        return () => {
            controller.abort();
        };
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validateBookForm(formData);

        setFieldErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            toggleLoading(true);
            toggleError(false);

            const normalizedIsbn = formData.isbn.replace(/[\s-]/g, '');
            if (!/^\d{13}$/.test(normalizedIsbn)) {
                setIsbnError(
                    'Het ISBN moet uit precies 13 cijfers bestaan.',
                );
                return;
            }

            let authorId = Number(formData.authorId);

            if (formData.authorId === 'new') {
                const createdAuthor = await addAuthor({
                    name: formData.authorName.trim(),
                    description: formData.authorDescription.trim(),
                });

                authorId = createdAuthor.id;
            }
            const book = await addBook({
                title: formData.title.trim(),
                authorId,
                isbn: normalizedIsbn,
                genreId: Number(formData.genreId),
                publicationDate: formData.publicationDate,
                description: formData.description.trim(),
                image: `https://covers.openlibrary.org/b/isbn/${normalizedIsbn}-L.jpg`,
                available: true,
            });

            navigate(`/boek-details/${book.id}`);
        } catch (error) {
            console.error(e);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <PageLayout
            title="Boek toevoegen"
            subtitle="Voeg een nieuw boek toe aan de collectie"
        >

            {loading && (
                <p>Auteurs en genres worden geladen...</p>
            )}

            {error && (
                <p>Er ging iets mis</p>
            )}

            <form
                className={styles.addBookForm}
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset className={styles.addBookForm__fieldset}>
                    <legend className={styles.addBookForm__legend}>
                        Boekgegevens
                    </legend>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="title">Titel*</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Bijv. The chronicles of Aeridan"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                        <FieldError message={fieldErrors.title}/>
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="authorId">Auteur*</label>

                        <select
                            id="authorId"
                            name="authorId"
                            value={formData.authorId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Kies een auteur</option>

                            {authors.map((author) => (
                                <option
                                    key={author.id}
                                    value={author.id}
                                >
                                    {author.name}
                                </option>
                            ))}

                            <option value="new">
                                + Nieuwe auteur toevoegen
                            </option>
                        </select>
                        <FieldError message={fieldErrors.authorId}/>
                    </div>

                    {formData.authorId === 'new' && (
                        <>
                            <div className={styles.addBookForm__field}>
                                <label htmlFor="authorName">
                                    Naam nieuwe auteur*
                                </label>

                                <input
                                    id="authorName"
                                    name="authorName"
                                    type="text"
                                    value={formData.authorName}
                                    onChange={handleChange}
                                    required
                                />
                                <FieldError message={fieldErrors.authorName}/>
                            </div>

                            <div className={styles.addBookForm__field}>
                                <label htmlFor="authorDescription">
                                    Beschrijving auteur*
                                </label>

                                <textarea
                                    id="authorDescription"
                                    name="authorDescription"
                                    value={formData.authorDescription}
                                    onChange={handleChange}
                                    required
                                />
                                <FieldError message={fieldErrors.authorDescription}/>
                            </div>
                        </>
                    )}

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="isbn">ISBN*</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="numeric"
                            placeholder="Bijv. 9789021046800"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                        />

                        {isbnError && (
                            <p className={styles.addBookForm__error}>
                                {isbnError}
                            </p>
                        )}
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="genreId">Genre*</label>
                        <select
                            id="genreId"
                            name="genreId"
                            value={formData.genreId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Kies een genre
                            </option>

                            {genres.map((genre) => (
                                <option
                                    key={genre.id}
                                    value={genre.id}
                                >
                                    {genre.icon} {genre.name}
                                </option>
                            ))}
                        </select>
                        <FieldError message={fieldErrors.genreId}/>
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="publicationDate">
                            Publicatiedatum*
                        </label>
                        <input
                            id="publicationDate"
                            name="publicationDate"
                            type="date"
                            value={formData.publicationDate}
                            onChange={handleChange}
                            required
                        />
                        <FieldError message={fieldErrors.publicationDate}/>
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="description">
                            Beschrijving*
                        </label>

                        <div className={styles.addBookForm__textareaWrapper}>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Schrijf een korte omschrijving van het boek."
                                maxLength={500}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />

                            <span className={styles.addBookForm__textarea}>
                                {formData.description.length}/500
                            </span>

                            <FieldError message={fieldErrors.description}/>
                        </div>
                    </div>

                    <PrimaryButton
                        text="Boek toevoegen"
                        type="submit"
                    />
                </fieldset>
            </form>
        </PageLayout>
    );
}

export default AddBook;