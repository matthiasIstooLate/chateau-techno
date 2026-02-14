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
    if (lineupContainer) {
        fetch('lineup.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(artist => {
                    const item = document.createElement('div');
                    item.className = 'lineup-item';

                    const content = `
                        <a href="${artist.soundcloud || '#'}" target="_blank" class="lineup-link" ${!artist.soundcloud ? 'style="pointer-events: none;"' : ''}>
                            <div class="lineup-img-wrapper">
                                <img src="${artist.image}" alt="${artist.name}" class="lineup-img" onerror="this.src='images/logo.png'"> 
                            </div>
                            <h3 class="lineup-name">${artist.name}</h3>
                        </a>
                    `; // Fallback to logo if image fails

                    item.innerHTML = content;
                    lineupContainer.appendChild(item);
                });
            })
            .catch(error => console.error('Error loading lineup:', error));
    }
});
