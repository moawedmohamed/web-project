$(document).ready(function () {
  if (typeof $ === "undefined") {
    console.error("jQuery is not loaded");
    return;
  }
  if (typeof $.fn.slick === "undefined") {
    console.error("Slick Carousel is not loaded");
    return;
  }

  console.log("Starting carousel initialization");

  fetch("https://dummyjson.com/products?limit=10")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      const products = data.products;
      console.log("Products fetched:", products);
      const carousel = $("#productCarousel");

      if (!carousel.length) {
        console.error("Carousel element #productCarousel not found");
        return;
      }

      products.forEach((product, index) => {
        const slide = `
          <div class="product-slide">
            <img src="${product.thumbnail}" alt="${product.title}" />
            <h5>${product.title.split(" ").slice(0, 2).join(" ")}</h5>
            <p>${Math.floor(Math.random() * 10) + 1} Products</p>
          </div>
        `;
        carousel.append(slide);
        console.log(`Added slide ${index + 1}: ${product.title}`);
      });

      const images = carousel.find("img");
      let loadedImages = 0;

      if (images.length === 0) {
        console.warn("No images found in carousel, initializing anyway");
        initializeSlick(carousel);
      } else {
        images.each(function () {
          const img = new Image();
          img.src = $(this).attr("src");
          img.onload = img.onerror = () => {
            loadedImages++;
            console.log(`Image ${loadedImages}/${images.length} loaded`);
            if (loadedImages === images.length) {
              initializeSlick(carousel);
            }
          };
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  function initializeSlick(carousel) {
    try {
      carousel.slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2550,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 1 },
          },
        ],
      });
      console.log("Slick initialized successfully");
    } catch (error) {
      console.error("Error initializing Slick:", error);
    }
  }
});
