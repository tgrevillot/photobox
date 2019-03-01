import loader from 'photoloader.js';

let id_gallery;

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
    loader.init('https://webetu.iutnc.univ-lorraine.fr/www/canals5/photobox/photos/');
    loader.load(id_gallery).then(insertData)
}

/**
 * [private] Insère les données chargées dans la gallerie
 */
function insertData(response) {
    //TODO A COMPLETER
    
}

export default {
    init: init,
    loadGallery: loadGallery
}