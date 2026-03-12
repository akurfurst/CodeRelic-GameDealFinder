document.getElementById("deal-form").onsubmit = () => {
    clearErrors();
    let isValid = true;

    // Validate game title
    let gameTitle = document.getElementById("game-title").value.trim();
    if(!gameTitle) {
        document.getElementById("err-game-title").style.display = "block";
        isValid = false;
    }

    // Validate price
    let price = document.getElementById("price").value.trim();
    if (!price) {
        document.getElementById("err-price").style.display = "block";
        isValid = false;
    } else if (price < 1){
        document.getElementById("err-price-negative").style.display = "block";
        isValid = false;

    }

    // Validate deal URL
    let url = document.getElementById("deal-url").value.trim();
    if (!url) {
        document.getElementById("err-url").style.display = "block";
        isValid = false;
    }

    // Validate expiry date
    let expiryDate = document.getElementById("expiry-date").value;
    if (!expiryDate) {
        document.getElementById("err-expiry-date").style.display = "block";
        isValid = false;
    }

    // Validate platform (at least one checked)
    let platforms = document.getElementsByName("platform[]");
    let platformChecked = false;
    for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].checked) {
            platformChecked = true;
        }
    }
    if (!platformChecked) {
        document.getElementById("err-platform").style.display = "block";
        isValid = false;
    }

    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("err");
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}