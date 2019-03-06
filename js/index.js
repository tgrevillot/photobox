//Import ...
import gallery from './lib/gallery.js';
import photoloader from './lib/photoloader.js';

window.addEventListener('load', () => {
  photoloader.init('https://webetu.iutnc.univ-lorraine.fr');
  gallery.init('/www/canals5/photobox/photos?offset=0&size=5');
  gallery.loadGallery();

  $('#load_gallery').on('click',(e)=>{
    let photos = photoloader.load('/www/canals5/photobox/photos/?offset=8&size=12');

  });
});
