

function changeImage(element) {
    if(element.id==="m1"){
    element.src = "1.jpg";}
 else if (element.id === "m2")
  { element.src = "2.jpg";}
 else if (element.id === "m3")
  { element.src = "3.jpg";}
 else if (element.id === "m4")
  { element.src = "1.2.jpg";}
 else if (element.id === "m5")
  { element.src = "5.jpg";}
 else if (element.id === "m6")
  { element.src = "6.jpg";}
 else if (element.id === "m7")
  { element.src = "7.jpg";}
 else if (element.id === "m8")
  { element.src = "8.jpg";}
 else if (element.id === "m9")
  { element.src = "9.jpg";}
 else if (element.id === "m10")
  { element.src = "l5.jpg";}
 else if (element.id === "m11")
  { element.src = "l1.jpg";}
 else if (element.id === "m12")
  { element.src = "backgroud5.jpg";}
 else if (element.id === "m13")
  { element.src = "l2.jpg";}
 else if (element.id === "m14")
  { element.src = "k2.jpg";}
 else if (element.id === "m15")
  { element.src = "l2.jpg";}
 else if (element.id === "m16")
  { element.src = "k3.jpg";}
 else if (element.id === "m17")
  { element.src = "l3.jpg";}
 else if (element.id === "m18")
  { element.src = "background2.jpg";}
 else if (element.id === "m19")
  { element.src = "l4.jpg";}
 else if (element.id === "m20")
  { element.src = "k5.jpg";}


}
function resetImage(element) {
    if(element.id==="m1"){
    element.src = "1.1.JPG";}
 else if (element.id === "m2")
   { element.src = "2.2.jpg";}
 else if (element.id === "m3")
  { element.src = "3.3.jpg";}
 else if (element.id === "m4")
  { element.src = "4.jpg";}
 else if (element.id === "m5")
  { element.src = "5.5.jpg";}
 else if (element.id === "m6")
  { element.src = "6.6.jpg";}
 else if (element.id === "m7")
  { element.src = "7.7.jpg";}
 else if (element.id === "m8")
  { element.src = "8.8.jpg";}
 else if (element.id === "m9")
  { element.src = "9.9.jpg";}
 
}
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

