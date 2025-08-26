const items = document.querySelectorAll(".item");
const orderList = document.getElementById("order-list");
const orderTotal = document.getElementById("order-total");
const placeOrderBtn = document.getElementById("place-order-btn");

function updateOrder() {
  let total = 0;
  let orderItems = [];

  items.forEach(item => {
    const qty = parseInt(item.querySelector("input").value);
    if (qty > 0) {
      const name = item.dataset.name;
      const price = parseFloat(item.dataset.price);
      total += qty * price;
      orderItems.push(`<li>${qty} × ${name} - $${(qty * price).toFixed(2)}</li>`);
    }
  });

  orderList.innerHTML = orderItems.length 
    ? orderItems.join("") 
    : "<li>No items selected.</li>";

  orderTotal.textContent = total.toFixed(2);
  placeOrderBtn.disabled = total === 0;
}

document.querySelectorAll(".qty-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector("input");
    let value = parseInt(input.value);
    if (btn.dataset.action === "increase") value++;
    if (btn.dataset.action === "decrease" && value > 0) value--;
    input.value = value;
    updateOrder();
  });
});
