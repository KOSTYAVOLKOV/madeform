const gallery = document.querySelector('.gallery');
const layoutClasses = ['gallery-large', 'gallery-tall', 'gallery-wide', 'gallery-last'];
const galleryItems = [...gallery.querySelectorAll('.gallery-item')];

for (let index = galleryItems.length - 1; index > 0; index -= 1) {
  const randomIndex = Math.floor(Math.random() * (index + 1));
  [galleryItems[index], galleryItems[randomIndex]] = [galleryItems[randomIndex], galleryItems[index]];
}

galleryItems.forEach((item, index) => {
  if (index < layoutClasses.length) item.classList.add(layoutClasses[index]);
  gallery.append(item);
  item.querySelector('.image-index').innerHTML = `${String(index + 1).padStart(2, '0')} <i>/</i> ${String(galleryItems.length).padStart(2, '0')}`;
  item.setAttribute('aria-label', `View kitchen photograph ${index + 1}`);
});

const photos = galleryItems;
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
const count = document.querySelector('.gallery-count');
let activePhoto = 0;
count.textContent = `01 / ${String(photos.length).padStart(2, '0')}`;

function showPhoto(index) {
  activePhoto = (index + photos.length) % photos.length;
  const item = photos[activePhoto];
  lightboxImage.src = item.querySelector('img').src;
  lightboxImage.alt = item.querySelector('img').alt;
  lightboxCaption.textContent = item.querySelector('.image-caption').textContent.replace('↗', '').trim();
  count.textContent = `${String(activePhoto + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
}

photos.forEach((photo, index) => photo.addEventListener('click', () => {
  showPhoto(index);
  lightbox.showModal();
}));

document.querySelector('.gallery-prev').addEventListener('click', () => {
  showPhoto(activePhoto - 1);
  lightbox.showModal();
});
document.querySelector('.gallery-next').addEventListener('click', () => {
  showPhoto(activePhoto + 1);
  lightbox.showModal();
});
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(activePhoto - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(activePhoto + 1));
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowRight') showPhoto(activePhoto + 1);
  if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1);
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18594222613/fRu8CLit7r4dEJWktaJF',
    });
  });
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.intro-grid, .work-heading, .gallery-item, .manifesto-copy, .steps article').forEach((node) => {
  node.classList.add('reveal');
  observer.observe(node);
});
