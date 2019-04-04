
import loader from './photoloader.js';
import gallery from './gallery.js';

let photoActuelle;
let photoURI;

let afficher = function(){
	$('div.vignette > img').on('click', (e)=>{
		//Chargement de la photo dans la lightbox avec le clic de la souris
		let photo = $(e.target).attr('data-img');
		$('img#lightbox_full_img').attr('src', photo);
		//ID des flèches : llbox_prev et llbox_next
		
		let titre = $(e.target).next().text();
		$('h1#lightbox_title').text(titre);
		
		// Charge les infos de la photo (utilisation des promosses)
		photoURI = $(e.target).attr('data-uri');
		chargerInfo();
		
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
function reChargerInfo(){
	$("div#lightbox-info").remove();
	$("div#lightbox-comments").remove();
	chargerInfo();
}

// Permet de charger les infos de la photo (promesse de promesse pour les infos et les commentaires)
function chargerInfo(){
	loader.init('https://webetu.iutnc.univ-lorraine.fr');
	loader.load(photoURI).then(get_Info)
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
		
	let info = `<div id="lightbox-info" class="px-5">
					<h2 class="text-center m-4 pt-5">Informations sur l'image :</h2>
					<dl class="row px-5">
					  <dt class="col-sm-5">ID :</dt>
					  <dd class="col-sm-7 px-5">${idP}</dd>

					  <dt class="col-sm-5">Titre :</dt>
					  <dd class="col-sm-7 px-5">${titre}</dd>

					  <dt class="col-sm-5">Descritption :</dt>
					  <dd class="col-sm-7 px-5 text-left desc">${descr}</dd>

					  <dt class="col-sm-5">Format :</dt>
					  <dd class="col-sm-7 px-5">${format}</dd>

					  <dt class="col-sm-5">Résolution :</dt>
					  <dd class="col-sm-7 px-5">${width}x${height}</dd>
					  
					  <dt class="col-sm-5">Poids :</dt>
					  <dd class="col-sm-7 px-5">${size} Mo</dd>
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
	let comments = `<div id="lightbox-comments" class="d-inline">`;
	comments += `<h2 class="text-center m-4 pt-5">Commentaires :</h2>`;
	
	for(let e of tabComments){
		
		comments += `<div class="mx-auto mt-5">`;
		
		if(e.titre != "")
			comments += `<h6 class="text-center m-4">${e.titre}</h6>`;
		else
			comments += `<h6 class="text-center m-4">Sans titre</h6>`;
		
		if(e.content != "")
			comments += `<p class="comTxt">${e.content}</p>`;
		else
			comments += `<p class="comTxt">Commentaire vide</p>`;
		
		comments += `<span class="mx-auto mb-5 pb-4 border-bottom border-white">`;
		
		if(e.pseudo != "")
			comments += `<p class="d-inline pr-5">Pseudo : ${e.pseudo}</p>`;
		else
			comments += `<p class="d-inline pr-5">Pseudo : Inconnu</p>`;
		
		if(e.date != "")
			comments += `<p class="d-inline">Date : ${e.date}</p>`;
		else
			comments += `<p class="d-inline">Date : --/--/--</p>`;
		
		comments += `</span>`;
		comments += `</div>`;
	}
	
	comments += `</div>`;
	
	let commentsDiv = $(comments);
	
	commentsDiv.appendTo($("div#lightbox")).css('color','#FFFFFF');
	
	let formAjout = `<div id="formAjout">
					<h2 class="text-center m-4 pt-5">Ajouter un commentaire :</h2>
					<p class="mt-3">Pseudo : </p><input class="comPseudo d-inline" type="text" name="" value="" required>
					<p class="mt-3">Titre : </p><input class="comTitre d-inline" type="text" name="" value="" required>
					<p class="mt-3">Commentaire : </p><textarea class="com d-block mx-auto" rows="5" cols="50" type="text" name="" value="" form="ajoutCom"></textarea>
					<button class="submitCom btn btn-light mt-4 mb-5 d-inline-block" value="">Envoyer</button>
					</div>`;
	
	let formAjoutDiv = $(formAjout);
	
	formAjoutDiv.appendTo($("div#lightbox-comments"));
	
	// Ajout du listener sur le bouton d'envoie :
	
	$('button.submitCom').on('click', (e)=>{
		envoieCom();
	});
}

// Permet d'envoyer un commentaire sur l'API
function envoieCom(){
	let ajax = new XMLHttpRequest();
	
	let commentObject = { "titre"       : $('input.comTitre').val(),
						  "content"     : $('textarea.com').val(),
						  "pseudo"      : $('input.comPseudo').val()
						}
	
	let commentJSON = JSON.stringify(commentObject);
	
	console.log(commentObject);
	
	// Envoie le commentaire :
	ajax.open('POST', photoURI + "/comments", true);
	ajax.setRequestHeader('Content-Type', 'application/json');
	ajax.addEventListener('load', () => reChargerInfo());
	ajax.send(commentJSON);
	
	$('input.comTitre').val("");
	$('textarea.com').val("");
	$('input.comPseudo').val("");
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
	photoURI = photo.attr('data-uri');
	reChargerInfo();
}

function loadNextPicture() {
	let photo = $('#' + (++photoActuelle));
	let titre = photo.next().text();
	afficherPictureOuverte(photo.attr('data-img'), titre);
	photoURI = photo.attr('data-uri');
	reChargerInfo();
}

export default {
    afficher : afficher,
	remove : remove,
	close : close,
	nextPicture: nextPicture,
	prevPicture: prevPicture
}