$(document).ready(function () {
    $('#toggle-sidebar-button').click(function () {
        $('#sidebar').toggleClass('open');
        $('#content').toggleClass('open');
        $('.side-input-hidden').toggleClass('side-input-active');
    });
    window.onload = function () {
        // Fetch programs from backend
        $.ajax({
            url: 'http://localhost:5000/api/v1/program/get-all-programs/',
            method: 'GET',
            success: function (response) {
                console.log(response);
                const programs = response.data;
                var searchResult = programs.length;
                $('.searchResult').append(searchResult);
                programs.forEach(function (program) {
                    var destinations = [];
                    var promises = [];
                    program.Trips.forEach(function (trip) {
                        var promise = new Promise(function (resolve, reject) {
                            $.ajax({
                                url: `http://localhost:5000/api/v1/town/get-town-by-id/${trip.destTownId}`,
                                method: 'GET',
                                success: function (response2) {
                                    destinations.push(response2.data.townName);
                                    resolve();
                                },
                                error: function (xhr, status, error) {
                                    reject(error);
                                }
                            });
                        });
                        promises.push(promise);
                    });
                    Promise.all(promises)
                        .then(function () {

                            var card = `
                        <div class="card col-10 col-md-5 col-lg-3 p-0 program-card">
                            <img class="card-img-top" src="${program.images}" alt="${program.label}">
                            <div class="card-body">
                                <h5 class="card-text">${program.label}</h5>
                            </div>
                            <button type="button" class="btn btn-primary  m-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-program='${JSON.stringify({ program: program })}'  data-destinations='${JSON.stringify({ dest: destinations })}'
                            >
                                Explore
                            </button>
                        </div>
                    `;
                            $('#programsSection').append(card);
                        })
                        .catch(function (error) {
                            console.error("An error occurred:", error);
                        });
                });
            }
        });
        // Append the modal elements to the body
        var modalContent = `
            <div class="modal fade modal-xl" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div id="programDetails">
                                Program Details
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Reserve Now</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('body').append(modalContent);
        // Handle modal display
        $('#exampleModal').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget);
            var program = button.data('program').program;
            var destinations = button.data('destinations').dest;

            var modal = $(this);
            modal.find('.modal-title').text(program.label); // Adjust property name as needed
            modal.find('#programDetails').html(`
        <h4>Description </h4>
        <div class="program-description">${program.description}</div>
        
        <h4>Images </h4>
        <div class="program-imgs py-1 w-50"><img class="w-100" src="${program.images}" alt=""></div>
        <div class="program-destinations py-1 w-50">
            <h4>Destinations</h4>
            ${destinations.map(destination => `<div>${destination}</div>`).join('')}
        </div>
    `);
        });
    };
});
