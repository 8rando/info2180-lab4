document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const resultDiv = document.getElementById('result');
    
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const searchTerm = document.getElementById('search-query').value.trim();
        const url = searchTerm ? `superheroes.php?query=${encodeURIComponent(searchTerm)}` : 'superheroes.php';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Check if data contains the error message
                if (data.error) {
                    resultDiv.innerHTML = `<p>${data.error}</p>`;
                } else if (Array.isArray(data) && data.length === 0) {
                    // If array is empty, no superhero found
                    resultDiv.innerHTML = '<p>Superhero not found</p>';
                } else {
                    // When data is returned
                    if (searchTerm && data.length) {
                        // If there's a search term and at least one superhero is found
                        const hero = data[0]; // Assuming the first match is what we want
                        resultDiv.innerHTML = `
                            <h3>${hero.alias}</h3>
                            <h4>${hero.name}</h4>
                            <p>${hero.biography}</p>
                        `;
                    } else {
                        // If no search term is provided, display all superheroes
                        resultDiv.innerHTML = data.map(hero => `
                            <div class="hero">
                                <h3>${hero.alias}</h3>
                                <h4>${hero.name}</h4>
                                <p>${hero.biography}</p>
                            </div>
                        `).join('');
                    }
                }
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                resultDiv.innerHTML = '<p>Error fetching superhero data.</p>';
                console.error('Fetch error:', error);
            });
    });
});
