// DOM Elements

const overlay = document.querySelector("#overlay");
const main = document.querySelector("main");
const numberSection = document.querySelector("#numbers");
const statsContainer = document.querySelector("#numbers .container")
const progressBar = document.querySelector("#progressBar div");
const logo = document.querySelector("#logo");
const openNav = document.querySelector("#openNav");
const closeNav = document.querySelector("#closeNav");
const navToggles = [openNav, closeNav];
const mobileNav = document.querySelector("#mobileNav");
const desktoptNav = document.querySelector("#desktopNav");
const bookmark = document.querySelector("#bookmark");
const bookmarkLabel = document.querySelector("#bookmark p");
const openButtons = document.querySelectorAll("main button");
const specificButtons = { button1: "#bamboo", button2: "#black", button3: "#mahogany" };
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const selects = document.querySelectorAll(".select input");
const inputConditions = { option1: 0, option2: 25, option3: 75, option4: 200 };
const continueButtons = document.querySelectorAll(".selection button");
const confirmation = document.querySelector("#confirmation");
const finalizeButton = document.querySelector("#confirmation button");
const totalRaised = document.querySelector("#totalRaised");
const totalBackers = document.querySelector("#totalBackers");

let pledge = 0;

// Helper Functions

const toggleOverlay = () => overlay.classList.toggle("active");

const toggleNav = () => {
    main.classList.toggle("inactive");
    mobileNav.classList.toggle("active");
    overlay.classList.toggle("active");
    navToggles.forEach(toggle => toggle.classList.toggle("active"));
};

const toggleModal = () => {
    modal.classList.toggle("active");
    logo.classList.toggle("inactive");
    openNav.classList.toggle("inactive");
    desktoptNav.classList.toggle("inactive");
};

const resetModal = () => {
    setTimeout(() => {
        clearSelect();
        closeModal.scrollIntoView();
    }, 500);
};

const clearSelect = () => {
    const currentSelection = document.querySelector(".selection.active");
    if (currentSelection) {
        const radio = document.querySelector(".selection.active .select input");
        const pledge = document.querySelector(".selection.active .pledge");
        const currentInput = document.querySelector(".selection.active .pledge input");
        currentSelection.classList.remove("active");
        radio.checked = false;
        pledge.style.maxHeight = 0;
        setTimeout(() => {
            currentInput.parentElement.parentElement.classList.remove("error");
            currentInput.value = "";
        }, 500);
    };
};

const selectNew = select => {
    const parentSelection = select.parentElement.parentElement;
    parentSelection.classList.toggle("active");
    const pledge = document.querySelector(".selection.active .pledge");
    pledge.style.maxHeight = pledge.scrollHeight + "px";
    select.checked = true;
    setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth" }), 500);
};

// const updateStock = () => {
//     const selector = document.querySelector(".selection.active .select input").getAttribute("value");;
//     const options = document.querySelectorAll(`.option.${selector}`);
//     const stock = document.querySelectorAll(`.option.${selector} h6`)
//     if (selector !== "noReward") {
//         const newStock = Number(stock[0].innerHTML) - 1;
//         stock.forEach(s => {
//             s.innerHTML = newStock.toString();
//         });
//         if (newStock === 0) {
//             options.forEach(o => {
//                 o.classList.add("inactive");
//                 document.querySelectorAll(".option.inactive button").forEach(b => b.innerHTML = "Out of Stock");
//             });
//         };
//     };;
// };

const updateStock = () =>
{
    const selector = document.querySelector(".selection.active .select input").getAttribute("value");
    const options = document.querySelectorAll(`.option.${selector}`);
    const stock = document.querySelectorAll(`.option.${selector} h6`);

    // Set default stock values for the categories if not already present in localStorage
    const defaultStock = {
        "bamboo": 101,
        "black": 64,
        "mahogany": 2
    };

    // Fetch the stock value from localStorage or use the default value
    let currentStock = localStorage.getItem(`${selector}Stock`);
    if (!currentStock)
    {
        currentStock = defaultStock[selector]; // Use default value if localStorage is empty
        localStorage.setItem(`${selector}Stock`, currentStock); // Store the default value in localStorage
    }

    // Check and update the stock if the selector isn't "noReward"
    if (selector !== "noReward")
    {
        let newStock = Number(currentStock) - 1;

        // Update stock in all relevant `h6` elements
        stock.forEach(s =>
        {
            s.innerHTML = newStock.toString();
        });

        // Save the updated stock value in localStorage
        localStorage.setItem(`${selector}Stock`, newStock);

        // If stock is 0, mark as "Out of Stock"
        if (newStock === 0)
        {
            options.forEach(o =>
            {
                o.classList.add("inactive");
                document.querySelectorAll(".option.inactive button").forEach(b => b.innerHTML = "Out of Stock");
            });
        }
    }
};

// Initialize stock values from localStorage or defaults on page load
document.addEventListener("DOMContentLoaded", () =>
{
    const stockElements = document.querySelectorAll(".option .stock h6");
    const optionClasses = ["bamboo", "black", "mahogany"];

    optionClasses.forEach(option =>
    {
        let savedStock = localStorage.getItem(`${option}Stock`);
        if (!savedStock)
        {
            // Use hardcoded defaults for initialization if not in localStorage
            const defaultStock = {
                "bamboo": 101,
                "black": 64,
                "mahogany": 2
            };
            savedStock = defaultStock[option];
            localStorage.setItem(`${option}Stock`, savedStock); // Save default stock in localStorage
        }
        // Set stock value in the relevant h6 element
        const stockElement = document.querySelector(`.option.${option} .stock h6`);
        if (stockElement)
        {
            stockElement.innerHTML = savedStock;
        }
    });
});


// Overlay Close

overlay.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) {
        toggleNav();
        mobileNav.style.opacity = 0;
        mobileNav.style.maxHeight = 0;
    } else {
        resetModal();
        toggleModal();
        toggleOverlay();
    };
});


// Mobile Menu

openNav.addEventListener("click", () => {
    mobileNav.style.opacity = 1;
    mobileNav.style.maxHeight = mobileNav.scrollHeight + "px";
    toggleNav();
});

closeNav.addEventListener("click", () => {
    mobileNav.style.opacity = 0;
    mobileNav.style.maxHeight = 0;
    toggleNav();
});

// Check localStorage on page load to maintain bookmark state
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "on")
{
    bookmark.classList.add("active");
    bookmarkLabel.innerHTML = "Bookmarked";
}

// Toggle bookmark state on click and update localStorage
bookmark.addEventListener("click", () =>
{
    bookmark.classList.toggle("active");

    if (bookmark.classList.contains("active"))
    {
        bookmarkLabel.innerHTML = "Bookmarked";
        localStorage.setItem("mode", "on"); // Set to "on" in localStorage
    } else
    {
        bookmarkLabel.innerHTML = "Bookmark";
        localStorage.setItem("mode", "off"); // Set to "off" in localStorage
    }
});


// Modal
openButtons.forEach(b => {
    b.addEventListener("click", () => {
        toggleModal();
        toggleOverlay();
        if (b.classList.contains("specific")) {
            const inputID = specificButtons[b.id];
            const checkedOption = document.querySelector(inputID);
            checkedOption.checked = true;
            selectNew(checkedOption);
        };
    });
});

closeModal.addEventListener("click", () => {
    resetModal();
    toggleModal();
    toggleOverlay();
});


// Option Selection

selects.forEach(select => {
    select.addEventListener("change", () => {
        clearSelect();
        selectNew(select);
    });
});


// Form Validation

continueButtons.forEach(b => {
    b.addEventListener("click", event => {
        event.preventDefault();
        const input = document.querySelector(".selection.active .amount input");
        const inputID = input.id;
        pledge = Number(input.value);
        if (!pledge || pledge < inputConditions[inputID]) {
            input.parentElement.parentElement.classList.add("error");
        } else {
            input.parentElement.parentElement.classList.remove("error");
            updateStock();
            resetModal();
            overlay.classList.toggle("inactive");
            modal.classList.toggle("active");
            setTimeout(() => {
                confirmation.classList.toggle("active");
            }, 1000);
        };
    });
});


// Confirmation

// Check for saved values in localStorage
let savedTotalRaised = localStorage.getItem("totalRaised");
let savedBackers = localStorage.getItem("totalBackers");
let savedProgressBarWidth = localStorage.getItem("progressBarWidth");

// If values are present, use them; otherwise, initialize them to default values
let totalRaisedValue = savedTotalRaised ? parseFloat(savedTotalRaised) : parseFloat(totalRaised.innerHTML.replace(",", ""));
let totalBackersValue = savedBackers ? parseFloat(savedBackers) : parseFloat(totalBackers.innerHTML.replace(",", ""));
let progressBarWidthValue = savedProgressBarWidth ? parseFloat(savedProgressBarWidth) : 0;

// Initialize totalRaised, totalBackers, and progressBar based on localStorage or default values
totalRaised.innerHTML = totalRaisedValue.toLocaleString();
totalBackers.innerHTML = totalBackersValue.toLocaleString();
progressBar.style.width = `${progressBarWidthValue}%`;

// Modify the finalizeButton event listener to save updated values in localStorage
finalizeButton.addEventListener("click", () =>
{
    overlay.classList.toggle("inactive");
    overlay.classList.toggle("active");
    confirmation.classList.toggle("active");
    logo.classList.toggle("inactive");
    openNav.classList.toggle("inactive");
    numberSection.classList.toggle("loading");

    const newTotal = Math.round(totalRaisedValue + pledge); // Calculate new total raised
    totalRaisedValue = newTotal; // Update totalRaisedValue
    let totalString = newTotal.toString();

    const newBackers = (totalBackersValue + 1); // Calculate new backers
    totalBackersValue = newBackers; // Update totalBackersValue
    let backersString = newBackers.toString();

    // Format the values with commas
    for (let i = 3; i < totalString.length; i += 4)
    {
        totalString = totalString.slice(0, -i) + "," + totalString.slice(-i);
    }
    for (let i = 3; i < backersString.length; i += 3)
    {
        backersString = backersString.slice(0, -i) + "," + backersString.slice(-i);
    }

    // Save updated values in localStorage
    localStorage.setItem("totalRaised", totalRaisedValue);
    localStorage.setItem("totalBackers", totalBackersValue);

    setTimeout(() =>
    {
        numberSection.scrollIntoView({ behavior: "smooth" });
        progressBar.style.transition = "width 0s ease-out";
        progressBar.style.maxWidth = 0;
        progressBar.style.width = 0;
        setTimeout(() =>
        {
            totalRaised.innerHTML = totalString;
            totalBackers.innerHTML = backersString;
            numberSection.classList.toggle("loading");
            progressBar.style.maxWidth = "100%";

            // Calculate new progress bar width
            let newWidth = newTotal * 100 / 100000;
            progressBarWidthValue = newWidth; // Update progressBarWidthValue

            if (newWidth < 100)
            {
                progressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`;
                progressBar.style.width = newWidth + "%";
            } else
            {
                progressBar.style.transition = "width 2s ease-out";
                progressBar.style.width = "100%";
            }

            // Save updated progress bar width in localStorage
            localStorage.setItem("progressBarWidth", newWidth);
        }, 500);
    }, 500);
});