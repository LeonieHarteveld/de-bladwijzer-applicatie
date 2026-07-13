import styles from './AddBook.module.scss'
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";
import {addBook} from "../../helpers/bookService.jsx";

function AddBook() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        authorId: '',
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
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const normalizedIsbn = formData.isbn.trim();

        const newBook = {
            ...formData,
            authorId: Number(formData.authorId),
            genreId: Number(formData.genreId),
            isbn: normalizedIsbn,
            image: `https://covers.openlibrary.org/b/isbn/${normalizedIsbn}-L.jpg`,
            available: true,
        };

        try {
            const createdBook = await addBook(newBook);
            navigate(`/boek-details/${createdBook.id}`);
        } catch (error) {
            console.error(
                'Boek toevoegen is mislukt:',
                error.response?.data ?? error
            );
        }
    }

    return (
        <PageLayout
            title="Boek toevoegen"
            subtitle="Voeg een nieuw boek toe aan de collectie"
        >
            <form
                className={styles.addBookForm}
                onSubmit={handleSubmit}
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
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="authorId">Auteur*</label>
                        <input
                            id="authorId"
                            name="authorId"
                            type="number"
                            min="1"
                            placeholder="Bijv. E.L. Vance"
                            value={formData.authorId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="isbn">ISBN*</label>
                        <input
                            id="isbn"
                            name="isbn"
                            type="text"
                            placeholder="Bijv. 9789021046800"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.addBookForm__field}>
                        <label htmlFor="genreId">Genre*</label>
                        <input
                            id="genreId"
                            name="genreId"
                            type="number"
                            min="1"
                            placeholder="Bijv. Fantasy"
                            value={formData.genreId}
                            onChange={handleChange}
                            required
                        />
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
                        </div>
                    </div>

                    <PrimaryButton
                        text="Boek toevoegen"
                        type="submit"
                    />
                </fieldset>
            </form>
        </PageLayout>
    )
}

export default AddBook;