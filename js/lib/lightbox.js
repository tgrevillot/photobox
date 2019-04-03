import gallery from "./gallery.js";
import loader from './photoloader.js';
let photoActuelle;

let afficher = function(){
	$('div.vignette > img').on('click', (e)=>{
		//Chargement de la photo dans la lightbox avec le clic de la souris
		let photo = $(e.target).attr('data-img');
		$('img#lightbox_full_img').attr('src', photo);
		//ID des flèches : llbox_prev et llbox_next
		
		let titre = $(e.target).next().text();
		$('h1#lightbox_title').text(titre);
		photoActuelle = parseInt($(e.target).attr('id'));
		$('.lightboc_container').show('lightboc_container');
		
		nextPicture();
		prevPicture();
	});
}

let close = function(){
	$('p#lightbox_close').on('click', (e)=>{
		//Appelé lors du clic sur la croix du lightbox
		$('.lightboc_container').hide('lightboc_container');
		$('#llbox-nav-prev').off();
		$('#llbox-nav-next').off();
	});
}

let remove = function(){
	//Suppression des listeners
	$('p#lightbox_close').off();
	$('div.vignette > img').off();
	$('#llbox-nav-prev').off();
	$('#llbox-nav-next').off();
}

function nextPicture() {
	//Permet de passer à la photo suivante via le chevron
	$('#llbox-nav-next').on('click', (e) => {
		if(photoActuelle == 7) {
			photoActuelle = 0;
			loader.load(gallery.nextLink()).then(gallery.insertData);
		}
		let photo = $('#' + (++photoActuelle));
		let titre = photo.next().text();
		afficherPictureOuverte(photo.attr('data-img'), titre);
	});
}

function afficherPictureOuverte(photo, titre) {
	//Charge la nouvelle image
	$('img#lightbox_full_img').attr('src', photo);
	$('h1#lightbox_title').text(titre);
}

function prevPicture() {
	//Event appelé lors de l'appui sur le chevron précédent
	$('#llbox-nav-prev').on('click', (e) => {
		if(photoActuelle === 0) {
			photoActuelle = 8;
			loader.load(gallery.previousLink()).then(gallery.insertData);
		}
		let photo = $('#' + (--photoActuelle));
		let titre = photo.next().text();
		afficherPictureOuverte(photo.attr('data-img'), titre);
	})
}

export default {
    afficher : afficher,
	remove : remove,
	close : close,
	nextPicture: nextPicture,
	prevPicture: prevPicture
}