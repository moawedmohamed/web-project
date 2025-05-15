

function changeImage(element) {
    if(element.id==="m1"){
    element.src = "1.jpg";}
 else if (element.id === "m2")
  { element.src = "2.jpg";}
 else if (element.id === "m3")
  { element.src = "3.jpg";}
 else if (element.id === "m4")
  { element.src = "4.jpg";}
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
  { element.src = "10.jpg";}
 else if (element.id === "m11")
  { element.src = "11.jpg";}
 else if (element.id === "m12")
  { element.src = "12.jpg";}
 else if (element.id === "m13")
  { element.src = "13.jpg";}
 else if (element.id === "m14")
  { element.src = "14.jpg";}
 else if (element.id === "m15")
  { element.src = "15.jpg";}
 else if (element.id === "m16")
  { element.src = "16.jpg";}
 else if (element.id === "m17")
  { element.src = "17.jpg";}
 else if (element.id === "m18")
  { element.src = "18.jpg";}
 else if (element.id === "m19")
  { element.src = "2.jpg";}
 else if (element.id === "m20")
  { element.src = "3.jpg";}
 else if (element.id === "m21")
  { element.src = "4.jpg";}
 else if (element.id === "m22")
  { element.src = "5.jpg";}
 else if (element.id === "m23")
  { element.src = "6.jpg";}
 else if (element.id === "m24")
  { element.src = "8.jpg";}
 else if (element.id === "m25")
  { element.src = "10.jpg";}


}
function resetImage(element) {
    if(element.id==="m1"){
    element.src = "1.1.JPG";}
 else if (element.id === "m2")
   { element.src = "2.2.jpg";}
 else if (element.id === "m3")
  { element.src = "3.3.jpg";}
 else if (element.id === "m4")
  { element.src = "4.4.jpg";}
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
 else if (element.id === "m10")
  { element.src = "10.10.jpg";}
 else if (element.id === "m11")
  { element.src = "11.11.jpg";}
 else if (element.id === "m12")
  { element.src = "12.12.jpg";}
 else if (element.id === "m13")
  { element.src = "13.13.jpg";}
 else if (element.id === "m14")
  { element.src = "14.14.jpg";}
 else if (element.id === "m15")
  { element.src = "15.15.jpg";}
 else if (element.id === "m16")
  { element.src = "16.16.jpg";}
 else if (element.id === "m17")
  { element.src = "17.17.jpg";}
 else if (element.id === "m18")
  { element.src = "18.18.jpg";}
 else if (element.id === "m19")
  { element.src = "2.2.jpg";}
 else if (element.id === "m20")
  { element.src = "3.3.jpg";}
 else if (element.id === "m21")
  { element.src = "4.4.jpg";}
 else if (element.id === "m22")
  { element.src = "5.5.jpg";}
 else if (element.id === "m23")
  { element.src = "6.6.jpg";}
 else if (element.id === "m24")
  { element.src = "8.8.jpg";}
 else if (element.id === "m25")
  { element.src = "10.10.jpg";}

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


  function goBack() {
    window.history.back();
  }

