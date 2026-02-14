document.addEventListener('DOMContentLoaded', () => {

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
});
