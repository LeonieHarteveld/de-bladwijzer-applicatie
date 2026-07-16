export function sortByName(items) {
    return [...items].sort((a, b) =>
        a.name.localeCompare(b.name,)
    );
}

export function sortByNewest(items) {
    return [...items].sort(
        (a, b) => Number(b.id) - Number(a.id),
    );
}