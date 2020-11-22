import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  //https://basiclightbox.electerious.com/
  // import * as basicLightbox from 'basiclightbox'

  //   const instance = basicLightbox.create(`
  //     <img src="assets/images/image.png" width="800" height="600">
  // `);

  //   instance.show();

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.src}" alt="" />`,
  );
  instance.show();
}
