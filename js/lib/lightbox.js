import loader from './photoloader.js';
import gallery from './gallery.js';

let id;

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
		
		$('.lightboc_container').toggle('lightboc_container');
	});
}

// sle

let affichageErreur = function(error, uri = "unknow"){
	console.log('ERREUR Loader : ' + error + ": " + uri)
}

let get_Info = function(rep){
	
	console.log(rep.data.photo.id);
	console.log(rep.data.photo.titre);
	console.log(rep.data.photo.descr);
	console.log(rep.data.photo.format);
	console.log(rep.data.photo.height);
	console.log(rep.data.photo.width);
	console.log(Math.round(rep.data.photo.size / 1024));
	//console.log(rep.data.links.categorie);
	//console.log(rep.data.links.comments);
	loader.init('https://webetu.iutnc.univ-lorraine.fr');
	
	return loader.load(rep.data.links.comments.href);
	//axios.get(rep.data.links.categorie.href);
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
		$('.lightboc_container').toggle('lightboc_container');
	});
}

let remove = function(){
	$('p#lightbox_close').off();
	$('div.vignette > img').off();
}

function nextPicture() {
	$('#llbox_next').on('click', (e) => {
		//TODO : A COMPLETER
	});
}

function prevPicture() {
	$('#llbox_prev').on('click', (e) => {
		//TODO : A COMPLETER
	})
}

export default {
    afficher : afficher,
	remove : remove,
	close : close,
	nextPicture: nextPicture,
	prevPicture: prevPicture
}
