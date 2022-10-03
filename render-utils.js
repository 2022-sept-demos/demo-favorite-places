export function renderPlace(place) {
    const li = document.createElement('li');

    const img = document.createElement('img');
    img.src = place.image_url;

    const h2 = document.createElement('h2');
    h2.textContent = place.name;
    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(place.category);
    h2.append(span);

    const p = document.createElement('p');
    p.textContent = place.description;

    li.append(img, h2, p);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'nature') return '🌲';
    if (category === 'neighborhood') return '🏡';
    if (category === 'shopping') return '🏪';
    if (category === 'dining') return '🥗';
    return '❓';
}
