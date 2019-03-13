import loader from './photoloader.js';
import lightbox from './lightbox.js';

let id_gallery;
let previousLink;
let nextLink;
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
 * Charge la gallerie et appelle les méthodes d'insertion
 */
function loadGallery() {
    //Chargement du JSon contenant les liens
    loader.init(server_endpoint);
    loader.load(id_gallery).then(traitementImages)
}

/**
 * Affiche les images et affecte les bons urls aux boutons nextPage et prevPage
 * @param {} response 
 *      Contenu du JSON : URL des images
 */
function traitementImages(response) {
    //On va envoyer une requête pour chaque photo puis l'insérer
    let tabPhotos = response.data.photos;
    //Pour chaque photos on va l'afficher via insertData
    tabPhotos.forEach(insertData);

    //On va affecter maintenant les urls de page suivante et page précédente
    //Pour ça on va modifier leurs handler d'évènement
    let lienNext = response.data.links.next.href;
    let lienPrev = response.data.links.prev.href;

    //On affecte les liens à la dernière ou première page selon l'état
    if(previousLink === undefined || previousLink === lienPrev)
        lienPrev = response.data.links.last.href;
    else if(nextLink === undefined || nextLink === lienNext)
        lienNext = response.data.links.first.href;

    //On met à jour les variables de module
    previousLink = lienPrev;
    nextLink = lienNext;
	console.log(lienPrev);
	console.log(lienNext);
    
    //Désactivation des handlers précédents
    $('#next').off();
    $('#previous').off();

    $('#next').click(function() {
        $('.vignette').remove();
		//Désactivation des listeners sur la lightBox
		lightbox.remove();
        loader.load(lienNext).then(traitementImages);
    });

    $('#previous').click(function() {
        $('.vignette').remove();
		//Désactivation des listeners sur la lightBox
		lightbox.remove();
        loader.load(lienPrev).then(traitementImages);
    });
	
	// Déclaration des listener sur les images pour la lightBox
	// (ouverture et fermeture de l'image)
	lightbox.afficher();
	lightbox.close();
}


/**
 * [private] Insère les données chargées dans la gallerie
 */
function insertData(response) {
    //Récupération des urls
    let imgPhotoNormal = response.photo.original.href;
    let idPhotoNormal = response.photo.id
    let srcImage = response.photo.thumbnail.href;

    let stringImg = `<div class="vignette">
        <img data-img="${server_endpoint + imgPhotoNormal}"
            data-uri="${server_endpoint}/www/canals5/photobox/photos/${idPhotoNormal}"
             src="${server_endpoint + srcImage}">
             <div>${response.photo.titre}</div>\
        </div>`;

    let img = $(stringImg);

    //On ajoute le divGlobal à la page
    let div = document.querySelector("#photobox-gallery");
    let divDuDessus = $(div);
    img.appendTo(divDuDessus);
    //$('.vignette').replaceWith(img);
}

export default {
    init: init,
    loadGallery: loadGallery
}