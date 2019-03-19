let photoActuelle;

let afficher = function(){
	$('div.vignette > img').on('click', (e)=>{
		let photo = $(e.target).attr('data-img');
		$('img#lightbox_full_img').attr('src', photo);
		//ID des flèches : llbox_prev et llbox_next
		let titre = $(e.target).next().text();
		$('h1#lightbox_title').text(titre);

		photoActuelle = $(e.target).attr('id');
		$('.lightboc_container').show('lightboc_container');
		nextPicture();
		prevPicture();

	});


}

let close = function(){
	$('p#lightbox_close').on('click', (e)=>{
		$('.lightboc_container').hide('lightboc_container');
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
