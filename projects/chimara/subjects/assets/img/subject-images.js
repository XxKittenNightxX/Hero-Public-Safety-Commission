// Subject Image Paths Configuration
// Update the image filenames here to change subject images across all pages

const subjectImages = {
    1092: 'Maxus.webp', //Maxus Blackwood
    1128: 'Olivia.webp', //Olivia Foster
    1396: 'Placeholder.jpg', //Amir
    1709: 'Placeholder.jpg', //Raden
    1751: 'Moon.webp', //Moon
    1753: 'Saburo.png', //Saburo ██████
    1755: 'Placeholder.jpg', //Xanti
    1758: 'Placeholder.jpg', //Arata
    1781: 'Akako.png', //Akako ██████
    1794: 'Placeholder.jpg', //Haruto
    1884: 'Eva.png', //Eva
    2008: 'violet.jpg', //Violet
    2012: 'Placeholder.jpg', //Solar
    2037: 'Michi.png', //Michi
    2099: 'Mia.png', //Mia
    1821: 'Selene.png', //Selene
    1471: 'Placeholder.jpg' //Yumeno
};

// Function to load the correct image for the current subject
function loadSubjectImage() {
    // Get the subject ID from the page title or subject-id element
    const subjectIdElement = document.querySelector('.subject-id');
    if (!subjectIdElement) return;
    
    const subjectIdText = subjectIdElement.textContent;
    const subjectId = parseInt(subjectIdText.replace(/[^0-9]/g, ''));
    
    // Get the image element
    const imgElement = document.querySelector('.subject-image');
    if (!imgElement) return;
    
    // Set the image source based on the configuration
    const imageName = subjectImages[subjectId] || 'Placeholder.jpg';
    imgElement.src = `../assets/img/${imageName}`;
}

// Run when the page loads
document.addEventListener('DOMContentLoaded', loadSubjectImage);
