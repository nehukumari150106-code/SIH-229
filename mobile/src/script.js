/* =====================================================
   KABADIWALA CONNECT
   COLLECTOR WEB PREVIEW
   ===================================================== */


/* ================= SCREEN NAVIGATION ================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });


    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= LOGIN ================= */

function login() {

    const mobile = document.getElementById("mobileNumber").value.trim();
    const password = document.getElementById("password").value.trim();


    if (mobile === "" || password === "") {

        alert("Please enter mobile number and password.");

        return;
    }


    showScreen("dashboardScreen");
}


/* ================= LOGOUT ================= */

function logout() {

    const confirmLogout = confirm(
        "Are you sure you want to logout?"
    );


    if (confirmLogout) {

        document.getElementById("mobileNumber").value = "";
        document.getElementById("password").value = "";

        showScreen("loginScreen");
    }
}


/* ================= PICKUP DATA ================= */

const pickupData = {

    "PICK-001": {

        material: "PCB Scrap",
        materialName: "PCB",
        customer: "Rahul",
        estimatedWeight: "5 kg",
        location: "Parner",
        time: "4:00 PM"

    },


    "PICK-002": {

        material: "Cable Scrap",
        materialName: "Cable",
        customer: "Priya",
        estimatedWeight: "8 kg",
        location: "Parner",
        time: "5:30 PM"

    }

};


/* ================= OPEN PICKUP DETAILS ================= */

function openPickupDetails(pickupId) {

    const pickup = pickupData[pickupId];


    if (!pickup) {

        alert("Pickup information not found.");

        return;
    }


    document.getElementById("pickupIdText").innerText =
        pickupId;


    document.getElementById("detailMaterial").innerText =
        pickup.material;


    document.getElementById("detailMaterialName").innerText =
        pickup.materialName;


    document.getElementById("detailCustomer").innerText =
        pickup.customer;


    document.getElementById("detailWeight").innerText =
        pickup.estimatedWeight;


    document.getElementById("detailLocation").innerText =
        pickup.location;


    document.getElementById("detailTime").innerText =
        pickup.time;


    showScreen("pickupDetailsScreen");
}


/* ================= ACCEPT PICKUP ================= */

function acceptPickup() {

    const accepted = confirm(
        "Do you want to accept this pickup request?"
    );


    if (!accepted) {
        return;
    }


    alert("Pickup accepted successfully!");


    showScreen("activePickupScreen");
}


/* ================= RECORD WEIGHT ================= */

function recordWeight() {

    const weightInput =
        document.getElementById("actualWeight");


    const weight = weightInput.value.trim();


    if (weight === "") {

        alert("Please enter the actual weight.");

        weightInput.focus();

        return;
    }


    const numericWeight = Number(weight);


    if (isNaN(numericWeight) || numericWeight <= 0) {

        alert("Please enter a valid weight.");

        weightInput.focus();

        return;
    }


    document.getElementById("finalWeight").innerText =
        numericWeight.toFixed(1) + " kg";


    alert("Actual weight recorded successfully!");


    showScreen("paymentScreen");
}


/* ================= TRANSACTION DATA ================= */

const transactionData = {

    "TXN-001": {

        amount: "₹1,920",
        lotId: "LOT-001",
        material: "PCB",
        weight: "4.8 kg",
        price: "₹400",
        paymentMethod: "UPI",
        status: "Completed"

    },


    "TXN-002": {

        amount: "₹1,250",
        lotId: "LOT-002",
        material: "Cable",
        weight: "8 kg",
        price: "₹156.25",
        paymentMethod: "UPI",
        status: "Completed"

    }

};


/* ================= OPEN TRANSACTION ================= */

function openTransaction(transactionId) {

    const transaction =
        transactionData[transactionId];


    if (!transaction) {

        alert("Transaction not found.");

        return;
    }


    document.getElementById("transactionId").innerText =
        transactionId;


    document.getElementById("transactionIdDetail").innerText =
        transactionId;


    showScreen("transactionDetailsScreen");
}


/* ================= START APP ================= */

document.addEventListener("DOMContentLoaded", function() {

    /*
       The prototype starts on the Collector Login screen.
       All navigation is handled by script.js.
    */

    showScreen("loginScreen");

});