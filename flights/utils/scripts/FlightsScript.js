$(document).ready(function () {
    // Make AJAX request to fetch flights
    $.ajax({
        url: 'http://localhost:5000/api/v1/trip/get-all-trips/',
        method: 'GET',
        success: function (response) {
            // Check if data is received successfully
            if (response.success) {
                // Get the flight data
                const flights = response.data;
                $('#flights-found').text(`Found: ${flights.length} Flight(s)`);


                // Iterate over each flight and populate the table
                flights.forEach(function (flight, index) {
                    // Construct HTML for a single row in the table
                    var row = `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${flight.label}</td>
                            <td>${flight.personPrice}</td>
                            <td>1</td>
                            <td>${flight.departureTown.townName}</td>
                            <td>${flight.destinationTown.townName}</td>
                            <td>${formatDate(flight.departureDate)}</td>
                            <td>${formatDate(flight.comingDate)}</td>
                            <td><button onclick="reserve(${flight.tripId})">Reserve</button></td>
                        </tr>
                    `;

                    // Append the row to the table body
                    $('.flights-table tbody').append(row);
                });
            } else {
                // Handle the case when there's an error in fetching data
                console.error('Error fetching flights:', response.message);
            }
        },
        error: function (xhr, status, error) {
            // Handle the case when there's an error in the AJAX request
            console.error('Error fetching flights:', error);
        }
    });

    // Function to format date in YYYY-MM-DD format
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Function to handle reservation button click
    function reserve(tripId) {
        // Redirect to reservation page with trip ID parameter
        window.location.href = `reservation.html?tripId=${tripId}`;
    }
});



$(document).ready(function () {
    // Function to fetch and populate flights with debounce
    const fetchAndPopulateFlights = debounce(function (filters) {
        $.ajax({
            url: 'http://localhost:5000/api/v1/trip/filter-trips',
            method: 'GET',
            data: filters,
            success: function (response) {
                $('.flights-table tbody').empty(); // Clear existing rows
                if (response.success) {
                    const flights = response.data;
                    resultSearch = flights.length;
                    $('#flights-found').text(`Found: ${flights.length} Flight(s)`);
                    flights.forEach(function (flight, index) {
                        var row = `
                            <tr>
                                <th scope="row">${index + 1}</th>
                                <td>${flight.label}</td>
                                <td>${flight.personPrice}</td>
                                <td>1</td>
                                <td>${flight.departureTown.townName}</td>
                                <td>${flight.destinationTown.townName}</td>
                                <td>${formatDate(flight.departureDate)}</td>
                                <td>${formatDate(flight.comingDate)}</td>
                                <td><button onclick="reserve(${flight.tripId})">Reserve</button></td>
                            </tr>
                        `;
                        $('.flights-table tbody').append(row);
                    });
                } else {
                    console.error('Error fetching flights:', response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error fetching flights:', error);
            }
        });
    }, 300); // Debounce for 300 milliseconds

    // Function to format date in YYYY-MM-DD format
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Event listeners for input fields to trigger the search dynamically
    $('#origin, #depart, #departure-date, #return-date, #price, #places').on('input', function () {
        const filters = {
            departureTown: $('#origin').val(),
            destinationTown: $('#depart').val(),
            departureDate: $('#departure-date').val(),
            comingDate: $('#return-date').val(),
            price: $('#price').val(),
            avai_places: $('#places').val()
        };
        fetchAndPopulateFlights(filters);
    });

    // Function to handle reservation button click
    function reserve(tripId) {
        window.location.href = `reservation.html?tripId=${tripId}`;
    }

    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }
});
