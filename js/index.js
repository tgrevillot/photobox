//Import ...
import gallery from './lib/gallery.js';
import photoloader from './lib/photoloader.js';
import lightbox from './lib/lightbox.js';

$(document).ready(function() {
  photoloader.init('https://webetu.iutnc.univ-lorraine.fr');
  let firstAccess = true;
  $("#load_gallery").click(function() {
    if(firstAccess) {
      photoloader.init('https://webetu.iutnc.univ-lorraine.fr');
      gallery.init('/www/canals5/photobox/photos?offset=0&size=8');
      gallery.loadGallery();  
      firstAccess = false;
    }
  });
  
  $('div.vignette > img').on('click', (e)=>{
	lightbox.afficher(e);
  });
  
  $('p#lightbox_close').on('click', (e)=>{
	lightbox.close(e);
  });
  
  $('#load_gallery').on('click',(e)=>{
    let photos = photoloader.load('/www/canals5/photobox/photos/?offset=8&size=12');
	photos.then((resp) => console.log(resp));
  });
  
  
  
});
