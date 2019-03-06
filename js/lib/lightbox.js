

let afficher = function(e){
	let photo = $(e.target).attr('data-img');
	$('img#lightbox_full_img').attr('src', photo);
	$('.lightboc_container').toggle('lightboc_container');
}

let close = function(e){
	$('.lightboc_container').toggle('lightboc_container');
}


export default {
    afficher : afficher,
	close : close
}
