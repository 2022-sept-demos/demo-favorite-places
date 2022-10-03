export function renderPlace(place) {
    const li = document.createElement('li');

    const img = document.createElement('img');

    const h2 = document.createElement('h2');

    const p = document.createElement('p');

    li.append(img, h2, p);

    return li;
}
