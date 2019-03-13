

let afficher = function(){
	$('div.vignette > img').on('click', (e)=>{
		let photo = $(e.target).attr('data-img');
		$('img#lightbox_full_img').attr('src', photo);
		//ID des flèches : llbox_prev et llbox_next
		let titre = $(e.target).next().text();
		$('h1#lightbox_title').text(titre);
		
		$('.lightboc_container').toggle('lightboc_container');
	});
	
	
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
