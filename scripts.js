document.addEventListener('DOMContentLoaded', function() {
    const factText = document.getElementById('factText');
    const factButton = document.getElementById('factButton');
    const mainSection = document.querySelector('main');

    const colors = ['#ff6347', '#ffa500', '#6a5acd', '#00bfff', '#32cd32'];

    function fetchAndDisplayFact() {
        fetch('http://numbersapi.com/random/trivia')
            .then(response => response.text())
            .then(data => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                mainSection.style.backgroundColor = randomColor;
                factText.textContent = data;
               
                const textColor = getTextColor(randomColor);
                factText.style.color = textColor;
            })
            .catch(error => {
                console.error('Erro ao buscar curiosidade:', error);
                factText.textContent = 'Ops! Não foi possível obter uma curiosidade.';
            });
    }

   
    function getTextColor(bgColor) {
       
        const rgb = hexToRgb(bgColor);
        
        const luminosity = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);
       
        return (luminosity > 128) ? '#333' : '#fff'; 
    }

    
    function hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }

    
    factButton.addEventListener('click', function() {
        fetchAndDisplayFact();
        animateText();
    });

    
    function animateText() {
        factText.style.animation = 'slideIn 1s ease forwards';
    }

    mainSection.style.animation = 'fadeIn 0.5s ease forwards';

    fetchAndDisplayFact();
});
