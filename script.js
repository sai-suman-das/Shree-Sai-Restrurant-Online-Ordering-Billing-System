let order = {};
let orderStartTime = Date.now(); // tracks first order time
let total = 0;

const vegData = {
    starters: [
        ["Paneer Tikka", 180, "images/Hariyali-Paneer-Tikka.jpg"],
        ["Veg Manchurian", 160, "images/VegManchurion.jpg"],
        ["Spring Rolls", 140, "images/springroll.jpg"],
        ["Crispy Corn", 150, "images/CrispyCorn.jpg"],
        ["Hara Bhara Kabab", 180, "images/HaraBharaKabab.jpg"],
        ["Chilli Paneer", 160, "images/ChilliPaneer.jpg"],
    
    ],
    main: [
        ["Butter Paneer", 220, "images/ButterPaneer.jpg"],
        ["Veg Biryani", 200, "images/VegBirayni.jpg"],
        ["Kadai Paneer", 230, "images/KadaiPaneer.jpg"],
        ["Dal Fry", 150, "images/DalFry.jpg"],
        ["Dal Tadka", 140, "images/DalTadka.jpg"],
        ["Mix Veg", 160, "images/MixVeg.jpg"],
        ["Chana Masala", 90, "images/ChanaMasala.jpg"],
    ],
    roti: [
        ["Butter Naan", 15, "images/ButterNaan.jpg"],
        ["Garlic Naan", 35 , "images/GarlicNaan.jpg"],
        ["Tandoori Roti", 20 , "images/Tandoori Roti.jpg"],
        ["Lachha Paratha", 15 , "images/LachaParatha.jpg"]
    ],
    drinks: [
        ["Cold Drink", 50, "images/MasalaCoke.jpg"],
        ["Fresh Lime Soda", 50, "images/LimeSoda.jpg"],
        
    ]
};

const nonVegData = {
    starters: [
        ["Chicken Tikka", 170, "images/Nonveg/ChickenTikka.jpg"],
        ["Chicken 65", 220, "images/Nonveg/Chicken65.jpg"],
        ["Chilli Chicken", 220, "images/Nonveg/ChilliChicken.jpg"]
    ],
    main: [
        ["Chicken Biryani", 260, "https://i.imgur.com/4Z9ZQ6g.jpg"]
    ],
    roti: [
        ["Butter Naan", 40, "https://i.imgur.com/5nZxQ6g.jpg"]
    ],
    drinks: [
        ["Cold Drink", 50, "https://i.imgur.com/vqD6ZbB.jpg"]
    ]
};

function render(data) {
    animateSwitch();
    fill("starters", data.starters);
    fill("mainCourse", data.main);
    fill("roti", data.roti);
    fill("drinks", data.drinks);
}

function fill(id, items) {
    const box = document.getElementById(id);
    box.innerHTML = "";
    items.forEach(i => {
        box.innerHTML += `
        <div class="card">
            <img src="${i[2]}">
            <div class="info">
                <strong>${i[0]}</strong>
                <p>₹${i[1]}</p>
                <button onclick="addItem('${i[0]}', ${i[1]})">Add</button>
            </div>
        </div>`;
    });
}

function addItem(name, price) {
    if (!order[name]) {
        order[name] = {
            price: price,
            qty: 1
        };
    } else {
        order[name].qty += 1;
    }
    updateBill();
}

function cancelItem(name) {

    // 5 minutes = 300000 ms
    const timePassed = Date.now() - orderStartTime;

    if (timePassed > 300000) {
        alert("❌ Cancellation is disabled after 5 minutes.");
        return;
    }

    if (order[name]) {
        order[name].qty -= 1;

        if (order[name].qty === 0) {
            delete order[name];
        }
    }

    updateBill();
}




function updateBill() {
    const bill = document.getElementById("billItems");
    const totalBox = document.getElementById("total");

    bill.innerHTML = "";
    let total = 0;

    for (let item in order) {
        const itemTotal = order[item].price * order[item].qty;
        total += itemTotal;

        bill.innerHTML += `
            <div class="bill-row">
                <div class="bill-left">
                    <span class="bill-item-name">${item}</span>
                    <span class="bill-qty">x ${order[item].qty}</span>
                </div>

                <div class="bill-right">
                    <span class="bill-price">₹${itemTotal}</span>
                    <button class="minus-btn" onclick="cancelItem('${item}')">−</button>
                </div>
            </div>
        `;
    }

    totalBox.innerText = total;
}



function switchFood(type) {
    document.getElementById("vegBtn").classList.toggle("active", type === "veg");
    document.getElementById("nonVegBtn").classList.toggle("active", type === "nonveg");
    render(type === "veg" ? vegData : nonVegData);
}

function animateSwitch() {
    document.querySelectorAll(".grid").forEach(g => {
        g.style.opacity = 0;
        g.style.transform = "translateX(30px)";
        setTimeout(() => {
            g.style.opacity = 1;
            g.style.transform = "translateX(0)";
        }, 200);
    });
}

render(vegData);

function placeOrder() {

    // Check if cart is empty
    if (Object.keys(order).length === 0) {
        alert("🛑 Please add items before placing order.");
        return;
    }

    const tableNumber = document.getElementById("tableNo").value;

    const orderPayload = {
        table: tableNumber,
        items: order,
        totalAmount: document.getElementById("total").innerText,
        time: new Date().toLocaleTimeString()
    };

    console.log("ORDER SENT:", orderPayload);

    alert("✅ Order placed successfully! Please wait while we prepare your food.");

    // Optional: lock order after placing
    // document.querySelector(".order-btn").disabled = true;
}
