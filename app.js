
// Reusable toast notification function
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

    toast.hideTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Run after the HTML page loads
document.addEventListener("DOMContentLoaded", function () {

    // Handle Book buttons on the match schedule page
    const bookLinks = document.querySelectorAll('a[href*="booking.html"]');

    bookLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            // Avoid delaying links already on the booking page
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

    // Scroll smoothly to the booking form when the page opens with its anchor
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
});
