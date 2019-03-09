//Import ...
import gallery from './lib/gallery.js';
import photoloader from './lib/photoloader.js';
import lightbox from './lib/lightbox.js';

$(document).ready(function() {
  photoloader.init('https://webetu.iutnc.univ-lorraine.fr');
  
  photoloader.init('https://webetu.iutnc.univ-lorraine.fr');
  gallery.init('/www/canals5/photobox/photos?offset=0&size=5');
  gallery.loadGallery();  
  
  $('div.vignette > img').ready(function(){
	lightbox.afficher();
	lightbox.close();  
  });
  
  
  
  
  $('#load_gallery').on('click',(e)=>{
    let photos = photoloader.load('/www/canals5/photobox/photos/?offset=8&size=12');
	photos.then((resp) => console.log(resp));
  });
  
  
  
});
