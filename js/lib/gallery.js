import loader from './photoloader.js';

let id_gallery;
let server_endpoint = 'https://webetu.iutnc.univ-lorraine.fr';

/**
 * Initialisation de notre chargeur de gallery
 */
function init(id) {
    //TODO A COMPLETER
    let element = $('#load_gallery');
    id_gallery = id;
}

/**
 * Charge la gallerie puis l'insère
 */
function loadGallery() {
    //Chargement du JSon contenant les liens
    loader.init(server_endpoint);
    loader.load(id_gallery).then(traitementImages)
}

function traitementImages(response) {
    //On va envoyer une requête pour chaque photo puis l'insérer
    let tabPhotos = response.data.photos;
    //Pour chaque photos on va l'afficher via insertData
    tabPhotos.forEach(insertData);
}

/**
 * [private] Insère les données chargées dans la gallerie
 */
function insertData(response) {
    //Récupération des urls
    let imgPhotoNormal = response.photo.original.href;
    let idPhotoNormal = response.photo.id
    let srcImage = response.photo.thumbnail.href;
    console.log(server_endpoint + srcImage)
    
    let stringImg = `<div class="vignette">
        <img data-img=" ${server_endpoint + imgPhotoNormal}
            data-uri=" ${server_endpoint}/www/canals5/photobox/photos/${idPhotoNormal}
             src="${server_endpoint + srcImage}">
             <div>${response.photo.titre}</div>\
        </div>`;

    console.log(stringImg)

    let img = $(stringImg);

    //On ajoute le divGlobal à tous la page
    let div = document.querySelector("#photobox-gallery");
    let divDuDessus = $(div);
    img.appendTo(divDuDessus);
    
}

export default {
    init: init,
    loadGallery: loadGallery
}