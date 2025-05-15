$(document).ready(function () {
  // تفعيل التأثيرات عندما تكون العناصر في نطاق الرؤية
  const fadeElements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});
