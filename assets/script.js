
window.onload=function () {
    const images = [
        "./assets/images/carou2.jpg",
        "./assets/images/carou1.jpg",
        "./assets/images/carou3.jpg",

    ];

    const texts = [
        {
            heading: "Embark on a Journey with OneStride",
            content: "Experience the world like never before with OneStride. Everything becomes easy and possible as you stride into new adventures.",
            button:"Explore Destinations",
            goto:"destinations.html"
        },
        {
            heading: "Your Next Adventure Awaits!",
            content: "Discover exciting plans and trips waiting for you. Explore our curated list of destinations and make your travel dreams a reality.",
            button:"Explore Flights",
            goto:"flights.html"
        },
        {
            heading: "Enroll in Exciting Programs",
            content: "Join our entertaining programs filled with diverse flights, allowing you to enjoy the weather, culture, and everything in between. Your next adventure starts here.",
            button:"Explore Our Programs",
            goto:"programs.html"
        }
    ];
    
    let currentIndex = 0;

    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % images.length;
        document.getElementById("header").style.backgroundImage = `url("${images[currentIndex]}")`;

        // Fade out the current text
        document.getElementById("mainHeading").classList.remove("active");
        document.getElementById("mainText").classList.remove("active");
        document.getElementById("mainBtn").classList.remove("active");

        setTimeout(() => {
            // Update text content
            document.getElementById("mainHeading").innerText = texts[currentIndex].heading;
            document.getElementById("mainText").innerText = texts[currentIndex].content;
            document.getElementById("mainBtn").innerText = texts[currentIndex].button;
            document.getElementById("mainBtn").setAttribute("href",texts[currentIndex].goto);

            // Fade in the new text
            document.getElementById("mainHeading").classList.add("active");
            document.getElementById("mainText").classList.add("active");
            document.getElementById("mainBtn").classList.add("active");
        }, 500); // Wait for fade-out transition to complete (adjust time as needed)
    }

    setInterval(changeBackgroundImage, 3000);
};
