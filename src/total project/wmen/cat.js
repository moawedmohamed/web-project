

function changeImage(element) {
    if(element.id==="m1"){
    element.src = "P1.jpg";}
 else if (element.id === "m2")
  { element.src = "IM1.jpg";}
 else if (element.id === "m3")
  { element.src = "b.jpg";}
 else if (element.id === "m4")
  { element.src = "H1.jpg";}
 else if (element.id === "m5")
  { element.src = "tq.jpg";}
 else if (element.id === "m6")
  { element.src = "s2.jpg";}
 else if (element.id === "m7")
  { element.src = "a.jpg";}
 else if (element.id === "m8")
  { element.src = "EM1.jpg";}
 else if (element.id === "m9")
  { element.src = "N1.jpg";}
 else if (element.id === "m10")
  { element.src = "r1.jpg";}
 else if (element.id === "m11")
  { element.src = "ee.jpg";}
 else if (element.id === "m12")
  { element.src = "cd.jpg";}
 else if (element.id === "m13")
  { element.src = "k1.jpg";}
 else if (element.id === "m14")
  { element.src = "as.jpg";}
 else if (element.id === "m15")
  { element.src = "bgg2.jpg";}
 else if (element.id === "m16")
  { element.src = "dd1.jpg";}
 else if (element.id === "m17")
  { element.src = "da1.jpg";}
 else if (element.id === "m18")
  { element.src = "ds1.jpg";}
 else if (element.id === "m19")
  { element.src = "d1.jpg";}
 else if (element.id === "m20")
  { element.src = "hh.jpg";}
 else if (element.id === "m21")
  { element.src = "gg.jpg";}
 else if (element.id === "m22")
  { element.src = "df.jpg";}
 else if (element.id === "m23")
  { element.src = "vv1.webp";}
 else if (element.id === "m24")
  { element.src = "bn1.jpg";}
 else if (element.id === "m25")
  { element.src = "vd.jpg";}


}
function resetImage(element) {
    if(element.id==="m1"){
    element.src = "P2.JPG";}
 else if (element.id === "m2")
   { element.src = "IM2.jpg";}
 else if (element.id === "m3")
  { element.src = "b2.jpg";}
 else if (element.id === "m4")
  { element.src = "nn.jpg";}
 else if (element.id === "m5")
  { element.src = "tq2.jpg";}
 else if (element.id === "m6")
  { element.src = "s1.jpg";}
 else if (element.id === "m7")
  { element.src = "a2.jpg";}
 else if (element.id === "m8")
  { element.src = "EM2.jpg";}
 else if (element.id === "m9")
  { element.src = "N2.jpg";}
 else if (element.id === "m10")
  { element.src = "r2.jpg";}
else if (element.id === "m11")
  { element.src = "ee2.jpg";}
 else if (element.id === "m12")
  { element.src = "cd2.jpg";}
 else if (element.id === "m13")
  { element.src = "k2.jpg";}
 else if (element.id === "m14")
  { element.src = "as2.jpg";}
 else if (element.id === "m15")
  { element.src = "bgg.jpg";}
 else if (element.id === "m16")
  { element.src = "dd2.jpg";}
 else if (element.id === "m17")
  { element.src = "da2.jpg";}
 else if (element.id === "m18")
  { element.src = "ds2.jpg";}
 else if (element.id === "m19")
  { element.src = "d2.jpg";}
 else if (element.id === "m20")
  { element.src = "hh.jpg";}
 else if (element.id === "m21")
  { element.src = "gg2.jpg";}
 else if (element.id === "m22")
  { element.src = "df2.jpg";}
 else if (element.id === "m23")
  { element.src = "v.jpg";}
 else if (element.id === "m24")
  { element.src = "bn2.jpg";}
 else if (element.id === "m25")
  { element.src = "vd2.jpg";}

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



