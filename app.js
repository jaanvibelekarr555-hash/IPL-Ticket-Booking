
// =====================================
// ACTIVITY 5: REUSABLE TOAST FUNCTION
// =====================================

function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toast.hideTimer);

    toast.hideTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// =====================================
// DOM CONTENT LOADED
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // ACTIVITY 5: BOOK BUTTON INTERACTION

    const bookLinks = document.querySelectorAll(
        'a[href*="booking.html"]'
    );

    bookLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            if (window.location.pathname.endsWith("booking.html")) {
                return;
            }

            event.preventDefault();

            showToast("Opening the ticket booking form...");

            const destination = new URL(link.href);
            destination.hash = "booking-form";

            setTimeout(function () {
                window.location.href = destination.href;
            }, 500);
        });
    });


    // ACTIVITY 5: SMOOTH SCROLLING

    if (window.location.hash === "#booking-form") {

        const bookingForm = document.getElementById("booking-form");

        if (bookingForm) {
            setTimeout(function () {

                bookingForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Welcome! You can now book your tickets.");

            }, 200);
        }
    }


    // =====================================
    // ACTIVITY 7: DOM SELECTORS
    // =====================================

    const matchSelect = document.getElementById("match");
    const standSelect = document.querySelector("#stand");
    const quantityInput = document.getElementById("quantity");

    const summaryMatch = document.getElementById("summary-match");
    const summaryStand = document.getElementById("summary-stand");
    const summaryQuantity = document.getElementById("summary-quantity");
    const summaryPrice = document.getElementById("summary-price");
    const summaryTotal = document.getElementById("summary-total");


    // Ticket prices

    const ticketPrices = {
        General: 500,
        Premium: 1500,
        VIP: 3000
    };


    // =====================================
    // ACTIVITY 7: UPDATE BOOKING SUMMARY
    // =====================================

    if (
        matchSelect &&
        standSelect &&
        quantityInput &&
        summaryMatch &&
        summaryStand &&
        summaryQuantity &&
        summaryPrice &&
        summaryTotal
    ) {

        function updateBookingSummary() {

            const selectedMatch = matchSelect.value;
            const selectedStand = standSelect.value;

            const enteredQuantity = Number(quantityInput.value);

            const validQuantity =
                Number.isInteger(enteredQuantity) &&
                enteredQuantity >= 1 &&
                enteredQuantity <= 10;

            const quantity = validQuantity ? enteredQuantity : 0;

            const price = ticketPrices[selectedStand] || 0;

            const total = price * quantity;


            // Update selected match

            summaryMatch.textContent =
                selectedMatch || "Not selected";


            // Update stand category

            summaryStand.textContent =
                selectedStand || "Not selected";


            // Update quantity

            summaryQuantity.textContent =
                quantityInput.value || "0";


            // Update price per ticket

            summaryPrice.textContent =
                "₹" + price.toLocaleString("en-IN");


            // Update total price

            summaryTotal.textContent =
                "₹" + total.toLocaleString("en-IN");


            // Show toast notification

            showToast("Booking summary updated!");
        }


        // Change event listeners

        matchSelect.addEventListener(
            "change",
            updateBookingSummary
        );

        standSelect.addEventListener(
            "change",
            updateBookingSummary
        );

        quantityInput.addEventListener(
            "change",
            updateBookingSummary
        );

        quantityInput.addEventListener(
            "input",
            updateBookingSummary
        );


        // Display initial summary

        updateBookingSummary();
    }

});
