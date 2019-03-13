//Import ...
import gallery from './lib/gallery.js';
import photoloader from './lib/photoloader.js';
import lightbox from './lib/lightbox.js';

$(document).ready(function() {
  let firstAccess = true;
  let nbPhotoParPage = 8;
  
  $("#load_gallery").click(function() {
    if(firstAccess) {
      photoloader.init('https://webetu.iutnc.univ-lorraine.fr');
      gallery.init('/www/canals5/photobox/photos?offset=0&size=' + nbPhotoParPage);
      gallery.loadGallery();  
	  
      firstAccess = false;
    }
  });
  
  $('#load_gallery').on('click',(e)=>{
    let photos = photoloader.load('/www/canals5/photobox/photos/?offset=8&size=12');
	photos.then((resp) => {console.log(resp);} );
  });
  
});
