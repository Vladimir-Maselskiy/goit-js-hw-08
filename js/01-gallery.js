require("simplelightbox");
import styles from "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from "./gallery-items";
// Change code below this line

const galleryDivRef = document.querySelector(".gallery");

const createImageGrid = () => {
	const markup = galleryItems
		.map((item) => {
			const { preview: smallImage, original: largeImage, description } = item;
			return `
                <a onclick="return false" class="gallery__link" href="${largeImage}">
                    <img
                    class="gallery__image"
                    src="${smallImage}"
                    alt="${description}"
                    captionSelector = "1000"
                    />
                </a> 
                    `;
		})
		.join("");
	return markup;
};

galleryDivRef.innerHTML = createImageGrid();

var gallery = new SimpleLightbox(".gallery a", {
	captionsData: "alt",
	captionDelay: 250,
});
