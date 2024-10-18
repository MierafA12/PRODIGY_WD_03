// Handle theme changes
document.getElementById('theme').addEventListener('change', function() {
    const selectedTheme = this.value;
    const buttons = document.querySelectorAll('button');

    if (selectedTheme === 'classic') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = 'white';
            btn.style.color = 'black';
            btn.style.fontFamily = 'Arial, sans-serif';
        });
    } else if (selectedTheme === 'fantasy') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#FFD700';  // Gold background
            btn.style.color = '#8B0000';  // Dark red text
            btn.style.fontFamily = '"Comic Sans MS", cursive, sans-serif';
        });
    } else if (selectedTheme === 'modern') {
        buttons.forEach(btn => {
            btn.style.backgroundColor = '#333';  // Dark background
            btn.style.color = '#FFF';  // White text
            btn.style.fontFamily = 'Helvetica, sans-serif';
        });
    }
});
