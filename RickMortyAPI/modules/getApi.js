const getApi = async (url) => {

    const $main = document.getElementById('main');
    const $links = document.getElementById('navegacion');

    let $template = "",
        $prevLink = "",
        $nextLink = "";

    try {

        $main.innerHTML = `<img src="../utilities/spinning-circles.svg" alt="Cargando..."`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const tot = data.results.length;
        //console.log(tot);

        if (!response.ok) {
            throw { status: response.status, statusText: response.statusText };
        }

        for (let i = 0; i < tot; i++) {
            let { name, species, image, status, created, id } = data.results[i];
            //console.log(`Character ID: ${id} Name: ${name} Gender: ${gender}, Kind: ${species}, IMG: ${image}`);
            let statusPJ = data.results[i].status;
            let state = "";
            let location = data.results[i].location.name;
            let origin = data.results[i].origin.name;

            if(statusPJ == 'Alive'){
                state = "🟢"
            } else if(statusPJ == 'Dead'){
                state = "🔴"
            } else {
                state = "🌑"
            }

            $template += `
                <figure class="data" id="${id}">
                    <div class="img-data">
                        <img src="${image}" alt="${name}">
                    </div>

                    <div class="char-data">
                        <figcaption class="name">${name}</figcaption>
                        <figcaption>${species} - ${state} ${status}</figcaption>
                        <figcaption>Created: ${created}</figcaption>
                        <figcaption>Location: ${location}</figcaption>
                        <figcaption>Origin: ${origin}</figcaption>
                    </div>
                </figure>
            `;
        }

        $nextLink = data.info.next ? `<a href="${data.info.next}" id="next" class="nav-btn">Next Page</a>` : "";
        $prevLink = data.info.prev ? `<a href="${data.info.prev}" id="prev" class="nav-btn">Previous Page</a>` : "";

        $main.innerHTML = $template;
        $links.innerHTML = $prevLink + "  " + $nextLink;

    } catch (err) {
        console.error("Error: " + err + " Mensaje: " + err.statusText);

        if (typeof err.status === "undefined") {
            alert("No hay resultados para esta busqueda.");
        }
    }
}

export { getApi }