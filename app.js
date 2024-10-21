document.addEventListener('DOMContentLoaded', () => {
    // Function to animate content in the first item
    function animateFirstItem() {
        const firstItem = document.querySelector('.carousel .list .item:nth-child(1)');
        if (!firstItem) return; // Exit if the first item doesn't exist

        const contentElements = firstItem.querySelectorAll('.content .author, .content .title, .content .topic, .content .des, .content .buttons');

        // Remove existing animations to reset them
        contentElements.forEach((element) => {
            element.style.animation = 'none'; // Reset animation
            element.offsetHeight; // Trigger reflow
            element.style.animation = ''; // Allow new animation to start
        });

        contentElements.forEach((element, index) => {
            // Trigger the animation for each content element
            element.style.animation = `showContent 0.5s ${1 + index * 0.2}s linear 1 forwards`;
        });
    }

    // Call the animation function for the first item on initialization
    animateFirstItem();

    // Burger Menu Toggle
    const burgerMenu = document.getElementById('burgerMenu');
    const menuItems = document.getElementById('menuItems');

    burgerMenu.addEventListener('click', function() {
        menuItems.classList.toggle('show'); // Toggle the 'show' class to open/close menu
    });


    // Search Functionality
    const searchButton = document.querySelector('.btn');
    const searchInput = document.querySelector('.srch');

    searchButton.addEventListener('click', function() {
        const searchValue = searchInput.value.trim(); // Get and trim the input value

        if (searchValue === '') {
            alert('INPUT TEXT'); // Show error message if input is empty
        } else {
            alert(`Searching for: ${searchValue}`);
        }
    });

    // Carousel setup
    const nextDom = document.getElementById('next');
    const prevDom = document.getElementById('prev');
    const carouselDom = document.querySelector('.carousel');
    const sliderDom = carouselDom.querySelector('.list');
    const thumbnailBorderDom = document.querySelector('.thumbnail');

    let timeRunning = 5000; // Time for each slide to be visible
    let timeAutoNext = 100000; // Time before next slide automatically
    let runTimeOut, runNextAuto;

    const sliderItemsDom = sliderDom.querySelectorAll('.item');
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');

    // Ensure thumbnailBorderDom is not null before proceeding
    if (!thumbnailBorderDom || sliderItemsDom.length === 0 || thumbnailItemsDom.length === 0) {
        console.error("Slider or Thumbnail items not found!");
        return;
    }

    // Function to handle slider movement
    function showSlider(type) {
        const allSliderItems = Array.from(sliderDom.querySelectorAll('.item')); // Use all items

        // Remove 'zoom-out' class from the current first image
        allSliderItems.forEach(item => item.classList.remove('zoom-out'));

        // Handle the 'next' or 'prev' logic
        if (type === 'next') {
            const firstItem = allSliderItems.shift(); // Get first item
            sliderDom.appendChild(firstItem); // Move it to the end
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Shift the thumbnail too
            carouselDom.classList.add('next');
        } else if (type === 'prev') {
            const lastItem = allSliderItems.pop(); // Get last item
            sliderDom.prepend(lastItem); // Move it to the beginning
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]); // Shift thumbnail
            carouselDom.classList.add('prev');
        }

        // Trigger animations for the first item
        animateFirstItem();

        // Clear existing timeouts and reset for the next auto-slide
        clearTimeout(runTimeOut);
        clearTimeout(runNextAuto);

        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        runNextAuto = setTimeout(() => {
            nextDom.click(); // Automatically click next after timeAutoNext duration
        }, timeAutoNext);
    }

    // Event listeners for next and prev buttons
    nextDom.addEventListener('click', () => {
        showSlider('next');
    });

    prevDom.addEventListener('click', () => {
        showSlider('prev');
    });

    // Auto slide
    runNextAuto = setTimeout(() => {
        nextDom.click(); // Automatically go to the next slide
    }, timeAutoNext);
});

console.log(`Number of slider items: ${sliderItemsDom.length}`);
console.log(`Number of thumbnail items: ${thumbnailItemsDom.length}`);