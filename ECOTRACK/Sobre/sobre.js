document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

gsap.registerPlugin(ScrollTrigger);

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateValue(document.getElementById("projects-completed"), 0, 50, 2000);
            animateValue(document.getElementById("ongoing-projects"), 0, 15, 2000);
            animateValue(document.getElementById("cities-impacted"), 0, 30, 2000);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats'));

document.querySelectorAll('.city').forEach(city => {
    city.addEventListener('mouseover', () => {
        city.querySelector('.city-image').style.display = 'block';
    });
    city.addEventListener('mouseout', () => {
        city.querySelector('.city-image').style.display = 'none';
    });
});

gsap.from(".timeline-item", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1
    }
});
