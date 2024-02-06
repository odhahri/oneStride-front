
window.onload = function () {
    const images = [
        "./assets/images/carou2.jpg",
        "./assets/images/carou1.jpg",
        "./assets/images/carou3.jpg",

    ];

    const texts = [
        {
            heading: "Embark on a Journey with OneStride",
            content: "Experience the world like never before with OneStride. Everything becomes easy and possible as you stride into new adventures.",
            button: "Explore Destinations",
            goto: "destinations.html"
        },
        {
            heading: "Your Next Adventure Awaits!",
            content: "Discover exciting plans and trips waiting for you. Explore our curated list of destinations and make your travel dreams a reality.",
            button: "Explore Flights",
            goto: "flights.html"
        },
        {
            heading: "Enroll in Exciting Programs",
            content: "Join our entertaining programs filled with diverse flights, allowing you to enjoy the weather, culture, and everything in between. Your next adventure starts here.",
            button: "Explore Our Programs",
            goto: "programs.html"
        }
    ];

    let currentIndex = 0;

    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % images.length;
        document.getElementById("header").style.backgroundImage = `url("${images[currentIndex]}")`;


        document.getElementById("mainHeading").classList.remove("active");
        document.getElementById("mainText").classList.remove("active");
        document.getElementById("mainBtn").classList.remove("active");

        setTimeout(() => {

            document.getElementById("mainHeading").innerText = texts[currentIndex].heading;
            document.getElementById("mainText").innerText = texts[currentIndex].content;
            document.getElementById("mainBtn").innerText = texts[currentIndex].button;
            document.getElementById("mainBtn").setAttribute("href", texts[currentIndex].goto);


            document.getElementById("mainHeading").classList.add("active");
            document.getElementById("mainText").classList.add("active");
            document.getElementById("mainBtn").classList.add("active");
        }, 500);
    }
    const carousel = document.getElementById('carouselExampleDark');
    const townName = document.getElementById('townName');
    const localisation = document.getElementById('localisation');
    const description = document.getElementById('description');

    carousel.addEventListener('slid.bs.carousel', function (event) {
        const activeSlide = event.relatedTarget;
        const slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

        townName.classList.add('fade-out');
        localisation.classList.add('fade-out');
        description.classList.add('fade-out');

        setTimeout(() => {
            switch (slideIndex) {
                case 0:
                    townName.innerText = 'Exploring the Wonders of Tunis';
                    localisation.innerText = 'Tunis, Tunisia, North Africa';
                    description.innerText = 'Embark on a journey to Tunis, the captivating capital of Tunisia, nestled along the azure coastline of North Africa. Explore the rich tapestry of history and culture as you wander through the winding alleys of the ancient Medina, a UNESCO World Heritage Site. Indulge in the flavors of traditional Tunisian cuisine at bustling souks and quaint cafes. Immerse yourself in the vibrant arts scene, from traditional music performances to contemporary art galleries. With its stunning mosques, picturesque gardens, and welcoming locals, Tunis offers a mesmerizing blend of old-world charm and modern allure, making it a must-visit destination for travelers seeking an authentic cultural experience.';
                    break;
                case 1:
                    townName.innerText = 'Discovering the Magic of New York City';
                    localisation.innerText = 'New York, USA, North America';
                    description.innerText = 'Welcome to the iconic city that never sleeps – New York City! Set foot in the heart of the bustling metropolis, where skyscrapers pierce the sky and dreams are born. Explore the vibrant neighborhoods of Manhattan, from the bright lights of Times Square to the historic cobblestone streets of Greenwich Village. Take in breathtaking views from the observation decks of the Empire State Building and One World Trade Center. Delve into the world-class cultural scene, with renowned museums such as the Metropolitan Museum of Art and the Museum of Modern Art. Indulge your senses with a diverse culinary landscape, from gourmet dining experiences to street food delights. With its boundless energy, endless entertainment options, and a melting pot of cultures, New York City promises an unforgettable adventure at every turn.';
                    break;

            }

            void townName.offsetWidth;
            void localisation.offsetWidth;
            void description.offsetWidth;

            townName.classList.remove('fade-out');
            localisation.classList.remove('fade-out');
            description.classList.remove('fade-out');
        }, 200);
    });
    setInterval(changeBackgroundImage, 3000);
};
