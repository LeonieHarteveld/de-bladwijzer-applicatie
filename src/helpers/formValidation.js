function validateBookForm(formData) {
    const errors = {};

    const requiredFields = [
        {
            name: 'title',
            message: 'Voer een titel in.',
        },
        {
            name: 'authorId',
            message: 'Kies een auteur.',
        },
        {
            name: 'genreId',
            message: 'Kies een genre.',
        },
        {
            name: 'publicationDate',
            message: 'Kies een publicatiedatum.',
        },
        {
            name: 'description',
            message: 'Voer een beschrijving van het boek in.',
        },
    ];

    requiredFields.forEach(({name, message}) => {
        const value = formData[name];

        if (!value || (typeof value === 'string' && !value.trim())) {
            errors[name] = message;
        }
    });

    if (formData.authorId === 'new') {
        if (!formData.authorName.trim()) {
            errors.authorName = 'Voer de naam van de auteur in.';
        }

        if (!formData.authorDescription.trim()) {
            errors.authorDescription =
                'Voer een beschrijving van de auteur in.';
        }
    }

    return errors;
}

export default validateBookForm;