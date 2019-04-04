
import loader from './photoloader.js';
import gallery from './gallery.js';

let id;
let photoActuelle;

let afficher = function(){
	$('div.vignette > img').on('click', (e)=>{
		//Chargement de la photo dans la lightbox avec le clic de la souris
		let photo = $(e.target).attr('data-img');
		$('img#lightbox_full_img').attr('src', photo);
		//ID des flèches : llbox_prev et llbox_next
		
		let titre = $(e.target).next().text();
		$('h1#lightbox_title').text(titre);
		
		// Charge les infos de la photo (utilisation des promosses)
		console.log(id);
		chargerInfo($(e.target));
		
		photoActuelle = parseInt($(e.target).attr('id'));
		$('.lightboc_container').show('lightboc_container');
		
		$('html').css('overflow-y', 'hidden');
		//$('div#lightbox_container').css('overflow-y', 'scroll');
		
		nextPicture();
		prevPicture();
	});
	
	// Permet le scroll de la fenêtre modal quand elle est affichée (ne fonctionne qu'a l'extérieur du listener)
	$('div#lightbox_container').css('overflow-y','scroll');
}

// sle

// Permet de recharger les infos de la photo courante (dans le cas où on change de photo)
function reChargerInfo(target){
	$("div#lightbox-info").remove();
	$("div#lightbox-comments").remove();
	chargerInfo(target);
}

// Permet de charger les infos de la photo (promesse de promesse pour les infos et les commentaires)
function chargerInfo(target){
	loader.init('https://webetu.iutnc.univ-lorraine.fr');
	loader.load(target.attr('data-uri')).then(get_Info)
										.then(get_Com)
										.catch(affichageErreur);
}

// Affichage d'une erreur en alerte
let affichageErreur = function(error, uri = "unknow"){
	alert('ERREUR Loader : ' + error + ": " + uri)
}

// permet d'obtenir toutes les infos utiles d'une photo (retourne une promesse pour les commentaires)
let get_Info = function(rep){
	
	let idP = rep.data.photo.id;
	let titre = rep.data.photo.titre;
	let descr = rep.data.photo.descr;
	let format = rep.data.photo.format;
	let height = rep.data.photo.height;
	let width = rep.data.photo.width;
	let size = Math.round(rep.data.photo.size / 1024);
	let linksComments = rep.data.links.comments.href
		
	let info = `<div id="lightbox-info"
					<h2 class="text-center m-4">Informations sur l'image :</h2>
					<dl class="row">
					  <dt class="col-sm-5">ID :</dt>
					  <dd class="col-sm-7">${idP}</dd>

					  <dt class="col-sm-5">Titre :</dt>
					  <dd class="col-sm-7">${titre}</dd>

					  <dt class="col-sm-5">Descritption :</dt>
					  <dd class="col-sm-7">${descr}</dd>

					  <dt class="col-sm-5">Format :</dt>
					  <dd class="col-sm-7">${format}</dd>

					  <dt class="col-sm-5">Résolution :</dt>
					  <dd class="col-sm-7">${width}x${height}</dd>
					  
					  <dt class="col-sm-5">Poids :</dt>
					  <dd class="col-sm-7">${size} Mo</dd>
					</dl>
				</div>`

    let infoDiv = $(info);
	
	infoDiv.appendTo($("div#lightbox")).css('color','#FFFFFF');
	
	loader.init('https://webetu.iutnc.univ-lorraine.fr');
	
	return loader.load(linksComments);
}

// Affiche les commentaires sur la photo courante
let get_Com = function(rep){
	
	let tabComments = rep.data.comments;
	let comments = `<div id="lightbox-comments">`;
	comments += `<p>Commentaires :</p>`;
	
	for(let e of tabComments){
		comments += `<p>Titre : ${e.titre}</p>`;
		comments += `<p>Commentaire : ${e.content}</p>`;
		comments += `<p>Pseudo : ${e.pseudo}</p>`;
		comments += `<p>Date : ${e.date}</p>`;
	}
	
	comments += `</div>`;
	
	let commentsDiv = $(comments);
	
	commentsDiv.appendTo($("div#lightbox")).css('color','#FFFFFF');
	
	let formAjout = `<div id="formAjout"><form id="ajouCom" method="POST" action= "">
					<p>Ajouter un commentaire :</p>
					<p>Pseudo : </p><input type="text" name="" value="" required>
					<p>Titre : </p><input type="text" name="" value="" required>
					<p>Commentaire : </p><textarea rows="5" cols="50" type="text" name="" value="" form="ajoutCom"></textarea>
					<button class="btn" value="">Envoyer</button>
					</form>
					</div>`;
	
	let formAjoutDiv = $(formAjout);
	
	formAjoutDiv.appendTo($("div#lightbox-comments"));
}

// Appel du listener pour fermer la fenêtre modal (lightbox)
let close = function(){
	$('p#lightbox_close').on('click', (e)=>{
		//Appelé lors du clic sur la croix du lightbox
		$('.lightboc_container').hide('lightboc_container');
		//$('img#lightbox_full_img').remove();
		$("div#lightbox-info").remove();
		$("div#lightbox-comments").remove();
		
		$('html').css('overflow-y', 'scroll');
		$('div#lightbox_container').css('overflow-y', 'hidden');
		
		$('#llbox-nav-prev').off();
		$('#llbox-nav-next').off();
	});
}

// Permet de supprimer les listener existant (utilisé lorsque l'on ferme la lightbox)
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
			photoActuelle = -1;
			$('.vignette').remove();
			loader.load(gallery.nextLink()).then((response) => {
				gallery.traitementImages(response);
				loadNextPicture()
			});
		} else 
			loadNextPicture();

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
			$('.vignette').remove();
			loader.load(gallery.previousLink()).then((response) => {
				gallery.traitementImages(response);
				loadPrevPicture();
			});
		} else 
			loadPrevPicture();
	})
}

function loadPrevPicture() {
	let photo = $('#' + (--photoActuelle));
	let titre = photo.next().text();
	afficherPictureOuverte(photo.attr('data-img'), titre);
}

function loadNextPicture() {
	let photo = $('#' + (++photoActuelle));
	let titre = photo.next().text();
	afficherPictureOuverte(photo.attr('data-img'), titre);
}

export default {
    afficher : afficher,
	remove : remove,
	close : close,
	nextPicture: nextPicture,
	prevPicture: prevPicture
}