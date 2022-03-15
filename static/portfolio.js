document.addEventListener('DOMContentLoaded', () => {
    const imageAlbum = document.querySelector(".album");
    const links = imageAlbum.querySelectorAll("a");
    const lightboxModal = document.getElementById("photoModal");
    const bsModal = new bootstrap.Modal(lightboxModal);

    for (const link of links) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const currentImg = link.querySelector("img");
            const lightboxCarousel = document.getElementById("lightboxCarousel");
            if (lightboxCarousel) {
                const parentCol = link.parentElement.parentElement;
                const index = [...parentCol.parentElement.children].indexOf(parentCol);
                const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
                bsCarousel.to(index);
            } else {
                createCarousel(currentImg);
            }
            bsModal.show();
        });
    }
});

function createCarousel(img) {
    const modalBody = document.querySelector(".modal-body .container-fluid");
    modalBody.innerHTML = `
    <div id="lightboxCarousel" class="carousel slide carousel-fade pointer-event" data-bs-ride="carousel" data-bs-interval="false">
      <div id="lightboxCarouselInner" class="carousel-inner">
        ${createSlides(img)}
      </div> 
      <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
       <span class="carousel-control-prev-icon" aria-hidden="true"></span>
       <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;
}

function createSlides(img) {
    let markup = "";
    const currentImgSrc = img.getAttribute("src");

    const imageAlbum = document.querySelector(".album");
    const allImages = imageAlbum.querySelectorAll("img");

    for (const img of allImages) {
        const imgSrc = img.getAttribute("src");
        const imgAlt = img.getAttribute("alt");
        const imgCaption = img.getAttribute("data-caption");

        markup += `
    <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
      <img src=${imgSrc} alt=${imgAlt}>
      ${imgCaption ? createCaption(imgCaption) : ""}
    </div>
    `;
    }

    return markup;
}

function createCaption(caption) {
    return `<div class="carousel-caption">
     <p class="m-0">${caption}</p>
    </div>`;
}