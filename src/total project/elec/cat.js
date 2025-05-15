


const slider = document.getElementById('slider');

function scrollLeft() {
  if (slider) {
    slider.scrollBy({ left: -200, behavior: 'smooth' });
  }
}

function scrollRight() {
  if (slider) {
    slider.scrollBy({ left: 200, behavior: 'smooth' });
  }
}

// تحريك تلقائي كل 3 ثواني
setInterval(() => {
  scrollRight();
}, 3000);

// --------- نظام تقييم النجوم ----------
document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.rating-stars .star');
  let selectedRating = 0;

  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
      stars.forEach((s, i) => {
        s.classList.toggle('hovered', i <= index);
      });
    });

    star.addEventListener('mouseout', () => {
      stars.forEach((s) => s.classList.remove('hovered'));
    });

    star.addEventListener('click', () => {
      selectedRating = index + 1;
      stars.forEach((s, i) => {
        s.classList.toggle('selected', i < selectedRating);
      });
      console.log("User rated: " + selectedRating + " stars");
    });
  });
});

