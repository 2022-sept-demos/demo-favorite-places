export function renderPlace(place) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `/place/?id=${place.id}`;

    const img = document.createElement('img');
    img.src = place.image_url;

    const h2 = document.createElement('h2');
    h2.textContent = place.name;
    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(place.category);
    h2.append(span);

    const p = document.createElement('p');
    p.textContent = place.description;

    a.append(img, h2, p);
    li.append(a);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'nature') return '🌲';
    if (category === 'neighborhood') return '🏡';
    if (category === 'shopping') return '🏪';
    if (category === 'dining') return '🥗';
    return '❓';
}

export function renderComment(comment, userId) {
    const li = document.createElement('li');
    if (comment.user_id === userId) {
        li.classList.add('self');
    }
    li.textContent = comment.text;
    return li;
}
