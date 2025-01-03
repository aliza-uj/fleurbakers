document.addEventListener("DOMContentLoaded", () => {
    const orderItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsList = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    const form = document.getElementById("checkout-form");
    const successMessage = document.getElementById("success-message");

    // If cart is empty, display a message and prevent checkout
    if (orderItems.length === 0) {
        alert("Your cart is empty. Please add item(s) to proceed.");
        window.location.href = "index.html"; // Redirect to the homepage or shopping page
        return; // Exit the script
    }

    // Populate order summary
    let total = 0;
    orderItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name} (x${item.quantity || 1})</span>
            <span>Rs ${parseInt(item.price.replace(/[^0-9]/g, '')) * (item.quantity || 1)}</span>
        `;
        orderItemsList.appendChild(li);

        total += parseInt(item.price.replace(/[^0-9]/g, '')) * (item.quantity || 1);
    });
    totalPriceElement.innerText = `Total: Rs ${total}`;

    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const address = document.getElementById("address").value.trim();

        if (name && contact && address) {
            // Clear cart and show success message
            localStorage.removeItem("cart");
            form.classList.add("hidden");
            successMessage.classList.remove("hidden");

            // Redirect to homepage after 3 seconds
            setTimeout(() => {
                alert("Redirecting to homepage");
                window.location.href = "index.html";
            }, 3000); // 3000 ms = 3 seconds
        } else {
            alert("Please fill in all fields!");
        }
    });
});