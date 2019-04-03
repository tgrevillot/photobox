import loader from './photoloader.js';
import gallery from './gallery.js';

let id;
let photoActuelle;

let afficher = function(){
	$('div.vignette > img').on('click', (e)=>{
		let photo = $(e.target).attr('data-img');
		$('img#lightbox_full_img').attr('src', photo);
		//ID des flèches : llbox_prev et llbox_next
		let titre = $(e.target).next().text();
		$('h1#lightbox_title').text(titre);
		//console.log($(e.target));
		//affichageDescription($(e.target));
		loader.init('https://webetu.iutnc.univ-lorraine.fr');
		loader.load($(e.target).attr('data-uri')).then(get_Info)
												.then(affichageInfo)
												.catch(affichageErreur);
		
		//$('.lightboc_container').toggle('lightboc_container');
		
		photoActuelle = $(e.target).attr('id');
		$('.lightboc_container').show('lightboc_container');
		nextPicture();
		prevPicture();
	});
}

// sle

let affichageErreur = function(error, uri = "unknow"){
	console.log('ERREUR Loader : ' + error + ": " + uri)
}

let get_Info = function(rep){
	
	let id = rep.data.photo.id;
	let titre = rep.data.photo.titre;
	let descr = rep.data.photo.descr;
	let format = rep.data.photo.format;
	let height = rep.data.photo.height;
	let width = rep.data.photo.width;
	let size = Math.round(rep.data.photo.size / 1024);
	let linksComments = rep.data.links.comments.href
	
	let info = `<div id="lightbox-info">
			<br/>
			<p>ID : ${id}</p>
			<p>Titre : ${titre}</p>
			<p>Descritption : ${descr}</p>
			<p>Format : ${format}</p>
			<p>Résolution : ${width} x ${height}</p>
			<p>Poids : ${size}</p>
		</div>`;

    let img = $(info);
	
	img.appendTo($("div#lightbox")).css('color','#FFFFFF');
	//img.appendTo(divDuDessus);
	
	
	/*console.log(rep.data.photo.id);
	console.log(rep.data.photo.titre);
	console.log(rep.data.photo.descr);
	console.log(rep.data.photo.format);
	console.log(rep.data.photo.height);
	console.log(rep.data.photo.width);
	console.log(Math.round(rep.data.photo.size / 1024));*/
	//console.log(rep.data.links.categorie);
	//console.log(rep.data.links.comments);
	loader.init('https://webetu.iutnc.univ-lorraine.fr');
	
	return loader.load(linksComments);
}

let affichageInfo = function(rep){
	
	let tabComments = rep.data.comments;
	
	for(let e of tabComments){
		console.log(e.pseudo);
		console.log(e.date);
		console.log(e.titre);
		console.log(e.content);
	}
}

let close = function(){
	$('p#lightbox_close').on('click', (e)=>{
		$('.lightboc_container').hide('lightboc_container');
		//$('img#lightbox_full_img').remove();
		$('div#lightbox-info').remove();
	});
}

let remove = function(){
	$('p#lightbox_close').off();
	$('div.vignette > img').off();
	$('#llbox-nav-prev').off();
	$('#llbox-nav-next').off();
}

function nextPicture() {
	$('#llbox-nav-next').on('click', (e) => {
		let photo = $('#' + photoActuelle)
		let titre = $('#titre:' + photoActuelle);
		console.log(titre)
		afficherPictureOuverte(photo.attr('data-img'), titre.next.text);
	});
}

function afficherPictureOuverte(photo, titre) {
	console.log(titre)
	$('img#lightbox_full_img').attr('src', photo);
	$('h1#lightbox_title').text(titre);
}

function prevPicture() {
	$('#llbox-nav-prev').on('click', (e) => {
		//TODO : A COMPLETER
		console.log("Coucou")
	})
}

export default {
    afficher : afficher,
	remove : remove,
	close : close,
	nextPicture: nextPicture,
	prevPicture: prevPicture
}
