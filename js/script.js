document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    const body = document.body;
    const logo = document.querySelector('.logo');
    const darkLogo = 'logo/chateautechno_logo_02.png';
    const lightLogo = 'logo/chateau_techno_flyer.jpg'; // Using the flyer as requested for light mode

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
        body.classList.add('light-mode');
        logo.src = lightLogo;
        if (themeLabel) themeLabel.textContent = "Dark Mode";
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            if (body.classList.contains('light-mode')) {
                logo.src = lightLogo;
                if (themeLabel) themeLabel.textContent = "Dark Mode";
                localStorage.setItem('theme', 'light-mode');
            } else {
                logo.src = darkLogo;
                if (themeLabel) themeLabel.textContent = "Light Mode";
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            // Toggle active class
            question.classList.toggle('active');

            // Toggle max-height for animation
            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = 0;
            }

            // Close other open faqs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.style.maxHeight = 0;
                }
            });
        });
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Populate Lineup
    const lineupContainer = document.getElementById('lineup-container');

    // embedded data for robustness
    const lineupData = [
      {
        "name": "Ryningsnäs",
        "image": "images/lineup/Ryningsnaes.png",
        "soundcloud": "https://soundcloud.com/ryningsnaes/"
      },
      {
        "name": "Joey Hostile 3000",
        "image": "images/lineup/Joey Hostile 3000.png",
        "soundcloud": "https://soundcloud.com/johannes-franziskus-diemberger"
      },
      {
        "name": "Charly",
        "image": "images/lineup/Charly.png",
        "soundcloud": "https://soundcloud.com/charlybrezel"
      }
    ];

    if (lineupContainer) {
        // Function to render lineup items
        const renderLineup = (data) => {
            lineupContainer.innerHTML = ''; // Clear existing content
            data.forEach(artist => {
                const item = document.createElement('div');
                item.className = 'lineup-item';

                const content = `
                    <a href="${artist.soundcloud || '#'}" target="_blank" class="lineup-link" ${!artist.soundcloud ? 'style="pointer-events: none;"' : ''}>
                        <div class="lineup-img-wrapper">
                            <img src="${artist.image}" alt="${artist.name}" class="lineup-img" onerror="this.src='logo/chateautechno_logo_02.png'"> 
                        </div>
                        <h3 class="lineup-name">${artist.name}</h3>
                    </a>
                `;

                item.innerHTML = content;
                lineupContainer.appendChild(item);
            });
        };

        // Try to fetch from lineup.json, fallback to embedded data if fetch fails (e.g. local file system)
        fetch('lineup.json')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => renderLineup(data))
            .catch(error => {
                console.log('Fetching lineup.json failed, using embedded data:', error);
                renderLineup(lineupData);
            });
    }

    // Countdown Timer
    const countdownContainer = document.getElementById('countdown');
    if (countdownContainer) {
        // Set the date we're counting down to: Sep 4, 2026 18:00:00 CEST (UTC+2)
        // Using strict ISO format with timezone to prevent parsing errors on Safari
        const countDownDate = new Date("2026-09-04T18:00:00+02:00").getTime();

        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            // Check if date is valid
            if (isNaN(countDownDate)) {
                clearInterval(updateCountdown);
                return;
            }

            if (distance < 0) {
                // Time is up
                clearInterval(updateCountdown);
                document.getElementById("days").textContent = "00";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").textContent = days < 10 ? "0" + days : days;
            document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }
});
