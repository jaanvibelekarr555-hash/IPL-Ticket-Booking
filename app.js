
// ==========================================
// ACTIVITY 5: REUSABLE TOAST NOTIFICATION
// ==========================================

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


// ==========================================
// DOM CONTENT LOADED
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // ACTIVITY 5: BOOK BUTTON INTERACTION
    // ======================================

    const bookLinks = document.querySelectorAll(
        'a[href*="booking.html"]'
    );

    bookLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            // Allow normal navigation when already on booking page
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


    // ======================================
    // ACTIVITY 5: SMOOTH SCROLLING
    // ======================================

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


    // ======================================
    // ACTIVITY 7: LIVE BOOKING SUMMARY
    // ======================================

    const matchSelect = document.getElementById("match");
    const standSelect = document.querySelector("#stand");
    const quantityInput = document.getElementById("quantity");

    const summaryMatch = document.getElementById("summary-match");
    const summaryStand = document.getElementById("summary-stand");
    const summaryQuantity = document.getElementById("summary-quantity");
    const summaryPrice = document.getElementById("summary-price");
    const summaryTotal = document.getElementById("summary-total");

    // Ticket prices according to stand category
    const ticketPrices = {
        General: 500,
        Premium: 1500,
        VIP: 3000
    };

    // Check whether all required booking elements exist
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

        function updateBookingSummary(showNotification = true) {

            const selectedMatch = matchSelect.value;
            const selectedStand = standSelect.value;
            const enteredQuantity = Number(quantityInput.value);

            // Validate ticket quantity
            const validQuantity =
                Number.isInteger(enteredQuantity) &&
                enteredQuantity >= 1 &&
                enteredQuantity <= 10;

            const quantity = validQuantity ? enteredQuantity : 0;

            // Calculate ticket price and total amount
            const price = ticketPrices[selectedStand] || 0;
            const total = price * quantity;

            // Update booking summary
            summaryMatch.textContent =
                selectedMatch || "Not selected";

            summaryStand.textContent =
                selectedStand || "Not selected";

            summaryQuantity.textContent =
                quantityInput.value || "0";

            summaryPrice.textContent =
                "₹" + price.toLocaleString("en-IN");

            summaryTotal.textContent =
                "₹" + total.toLocaleString("en-IN");

            // Show notification only after user interaction
            if (showNotification) {
                showToast("Booking summary updated!");
            }
        }

        // Update summary when match changes
        matchSelect.addEventListener(
            "change",
            updateBookingSummary
        );

        // Update summary when stand category changes
        standSelect.addEventListener(
            "change",
            updateBookingSummary
        );

        // Update summary when quantity changes
        quantityInput.addEventListener(
            "change",
            updateBookingSummary
        );

        quantityInput.addEventListener(
            "input",
            updateBookingSummary
        );

        // Initial summary update without notification
        updateBookingSummary(false);
    }


    // ======================================
    // ACTIVITY 8: HAMBURGER MENU
    // ======================================

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            showToast(
                isOpen
                    ? "Navigation menu opened"
                    : "Navigation menu closed"
            );
        });

        // Close mobile menu after selecting a navigation link
        const navigationItems = navLinks.querySelectorAll("a");

        navigationItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });
        });
    }


    // ======================================
    // ACTIVITY 8: TEAM FILTER
    // ======================================

    const teamFilter = document.getElementById("team-filter");
    const matchContainer = document.getElementById("match-container");
    const noMatches = document.getElementById("no-matches");

    if (teamFilter && matchContainer) {

        const matchCards = matchContainer.querySelectorAll(".match-card");

        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;
            let visibleCount = 0;

            matchCards.forEach(function (card) {

                const teams = card.dataset.teams
                    ? card.dataset.teams.split(" ")
                    : [];

                const shouldDisplay =
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam);

                card.hidden = !shouldDisplay;

                if (shouldDisplay) {
                    visibleCount++;
                }
            });

            // Display message when no matches are available
            if (noMatches) {
                noMatches.hidden = visibleCount !== 0;
            }

            showToast(
                selectedTeam === "all"
                    ? "Showing all matches"
                    : "Showing " + selectedTeam + " matches"
            );
        });
    }


    // ======================================
    // ACTIVITY 8: GRID AND LIST VIEW
    // ======================================

    const gridViewButton = document.getElementById("grid-view");
    const listViewButton = document.getElementById("list-view");

    if (
        matchContainer &&
        gridViewButton &&
        listViewButton
    ) {

        // GRID VIEW
        gridViewButton.addEventListener("click", function () {

            matchContainer.classList.remove("list-view");

            gridViewButton.classList.add("active");
            listViewButton.classList.remove("active");

            showToast("Grid view selected");
        });

        // LIST VIEW
        listViewButton.addEventListener("click", function () {

            matchContainer.classList.add("list-view");

            listViewButton.classList.add("active");
            gridViewButton.classList.remove("active");

            showToast("List view selected");
        });
    }

});
