const getApiOnce = async (url) => {
    const $main = document.getElementById('main');

    let $template = "";

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw { status: response.status, statusText: response.statusText };
        }

        let { id, name, status, species, gender, image, created } = data;
        let location = data.location.name;
        let origin = data.origin.name;
        let caps = data.episode.length;
        let state;

        if(status == 'Alive'){
            state = "🟢"
        } else if(status == 'Dead'){
            state = "🔴"
        } else {
            state = "🌑"
        }

        $template = `
            <figure class="data-once" id="${id}">
                <div class="img-data once-img">
                    <img src="${image}" alt="${name}">
                </div>

                <div class="char-data once-char">
                    <figcaption class="name">${name}</figcaption>
                    <figcaption>${species} - ${state}${status}</figcaption>
                    <figcaption>Created: ${created}</figcaption>
                    <figcaption>Location: ${location}</figcaption>
                    <figcaption>Origin: ${origin}</figcaption>
                    <figcaption>Gender: ${gender}</figcaption>
                    <figcaption>Appear in ${caps} episodes</figcaption>
                </div>
            </figure>
        `


        $main.innerHTML = $template

    } catch (error) {
        let message = "Ocurrio un error" || error.statusText;

        console.error(message);
    }
}

export { getApiOnce }