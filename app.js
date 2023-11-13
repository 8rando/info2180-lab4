document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    
    searchButton.addEventListener('click', function() {
        // Fetch the data from superheroes.php
        fetch('superheroes.php')
            .then(response => response.json()) // Parse the JSON response
            .then(superheroes => {
                // Create an HTML list of superhero aliases
                let listItems = superheroes.map(hero => `<li>${hero.alias}</li>`).join('');
                alert(listItems); // Display the list in an alert
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while fetching superhero data.');
            });
    });
});
