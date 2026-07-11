import styles from './AddBook.module.scss'
import PageLayout from "../../components/PageLayout/PageLayout.jsx";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import PrimaryButton from "../../components/Buttons/PrimaryButton/PrimaryButton.jsx";

function AddBook() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titel: '',
        auteur: '',
        isbn: '',
        genre: '',
        publicationDate: '',
        description: '',
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);
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
                        <label htmlFor="author">Auteur*</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Bijv. E.L. Vance"
                            value={formData.author}
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
                        <label htmlFor="genre">Genre*</label>
                        <input
                            id="genre"
                            name="genre"
                            type="text"
                            placeholder="Bijv. Fantasy"
                            value={formData.genre}
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

                            <span className={styles.addBookForm__counter}>
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