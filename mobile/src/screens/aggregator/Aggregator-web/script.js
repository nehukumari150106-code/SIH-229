function showPage(pageName, clickedButton = null) {

    // Hide all pages
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });


    // Show selected page
    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }


    // Remove active from navigation
    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(function(button) {
        button.classList.remove("active");
    });


    // Add active to clicked navigation button
    if (clickedButton) {
        clickedButton.classList.add("active");
    }


    // Page titles
    const pageTitles = {

        dashboard: "Aggregator Dashboard",
        incoming: "Incoming Lots",
        inventory: "Inventory",
        offers: "Recycler Offers",
        handover: "Handover",
        transactions: "Transactions",
        profile: "Aggregator Profile"

    };


    const title = document.getElementById("pageTitle");

    if (title) {
        title.innerText = pageTitles[pageName];
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= TOAST ================= */

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);
}


/* ================= NOTIFICATION ================= */

function showNotification() {

    showToast(
        "3 notifications: 2 new offers, 1 lot received"
    );
}


/* ================= LOGOUT ================= */

function logout() {

    showToast(
        "Prototype logout clicked"
    );
}


/* ================= LOT DETAILS ================= */

function lotDetails(lotId) {

    let message = "";


    if (lotId === "LOT-1024") {

        message =
            "LOT-1024\n\n" +
            "Material: PCB\n" +
            "Weight: 25 kg\n" +
            "Collector: Amit Shinde\n" +
            "Location: Rajur\n" +
            "Status: Received";

    }


    else if (lotId === "LOT-1025") {

        message =
            "LOT-1025\n\n" +
            "Material: Cable\n" +
            "Weight: 40 kg\n" +
            "Collector: Suresh Pawar\n" +
            "Location: Parner\n" +
            "Status: Received";

    }


    else if (lotId === "LOT-1026") {

        message =
            "LOT-1026\n\n" +
            "Material: Motor\n" +
            "Weight: 18 kg\n" +
            "Collector: Rahul Jadhav\n" +
            "Location: Shirur\n" +
            "Status: Processing";

    }


    alert(message);
}


/* ================= SEARCH LOTS ================= */

function searchLots() {

    const input =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    const rows =
        document.querySelectorAll("#lotTable tr");


    rows.forEach(function(row) {

        const text =
            row.innerText.toLowerCase();


        if (text.includes(input)) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });
}


/* ================= ACCEPT OFFER ================= */

function acceptOffer(company) {

    showToast(
        "Offer accepted from " + company
    );
}


/* ================= SAVE PROFILE ================= */

function saveProfile() {

    showToast(
        "Profile saved successfully"
    );
}