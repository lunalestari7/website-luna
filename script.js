// 1. Animasi Kucing Mengikuti Kursor Mouse (Lirikan Mata)
document.addEventListener("mousemove", (e) => {
    const pupils = document.querySelectorAll(".pupil");
    pupils.forEach((pupil) => {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();

        // Hitung titik tengah mata
        const eyeX = eyeRect.left + eyeRect.width / 2;
        const eyeY = eyeRect.top + eyeRect.height / 2;

        // Hitung sudut gerak kursor
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = 4; // Jarak bola mata bergerak

        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    });
});

// 2. Gelembung Biru Melayang di Hero (Canvas Animation)
const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const bubbles = [];
for (let i = 0; i < 20; i++) {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 8 + 4,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
    });
}

function drawBubbles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(144, 202, 249, ${b.opacity})`;
        ctx.fill();

        b.y -= b.speed;
        if (b.y < -10) {
            b.y = canvas.height + 10;
            b.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawBubbles);
}
drawBubbles();

// 3. Scroll Smooth & Fade In Section
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.15 }
);

sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(40px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
});

console.log("✨ Website profil kartun Luna berhasil dimuat!");