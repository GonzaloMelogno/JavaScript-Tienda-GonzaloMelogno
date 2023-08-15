
fetch('./js/productos.json')
  .then(response => response.json())
  .then(data => renderProducts(data))
  .catch(error => console.error('Error al cargar los datos:', error));
  

function renderProducts(products) {
  
  const productContainer = document.getElementById('product-container');

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';

    const imgProduct = document.createElement('img');
    imgProduct.src = product.imagen;
    imgProduct.alt = product.nombre;

    const nameProduct = document.createElement('h2');
    nameProduct.textContent = product.nombre;

    const PriceProduct = document.createElement('p');
    PriceProduct.textContent = `Precio: $${product.precio}`;

    const buttonBuy = document.createElement('button');
    buttonBuy.textContent = 'Añadir al carrito'; 
    buttonBuy.className = 'button';
    buttonBuy.id = product.nombre.replace(/\s+/g, '-').toLowerCase(); 

    buttonBuy.addEventListener('click', () => {
      const item = {
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad
      };
    
      const existingProduct = cart.find(cartItem => cartItem.nombre === item.nombre || cartItem.precio == item.precio)
    
      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        cart.push(item);
      }
    
      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        position: 'center',
        icon: 'success',
        iconColor: 'greenyellow',
        title: 'El producto ha sido agregado con éxito',
        showConfirmButton: false,
        timer: 1500,
        background: "black",
        color: "white",
      })
      showCart();
    });

    productDiv.appendChild(imgProduct);
    productDiv.appendChild(nameProduct);
    productDiv.appendChild(PriceProduct);
    productDiv.appendChild(buttonBuy); 

    productContainer.appendChild(productDiv);
     localStorage.setItem("cart", JSON.stringify(cart));
    });
}


function getNick() {
  const nickLabel = document.getElementById("nameChr").value;
  const cartName = `carrito de ${nickLabel}`;
  localStorage.setItem("User", JSON.stringify(nickLabel));
  localStorage.setItem("cartName", JSON.stringify(cartName));
  return nickLabel;
}
function ShowStore(){
  var Change = document.getElementById("product-container");
  Change.style.display = 'block';
}

let save = document.querySelector(".save");
save.addEventListener("click", () => {
  getNick();
  showCart();
  ShowStore();
});

let cart = [];

function showCart() {
  const cartContentConteiner = document.getElementById('cart-content');
  const cartTotalConteiner = document.getElementById('cart-total');
  cartContentConteiner.innerHTML = '';

  const cartName = JSON.parse(localStorage.getItem("cartName")) || "carrito";
  const savedCartName = JSON.parse(localStorage.getItem("cartName"));

  if (savedCartName) {
    const cartNameElement = document.getElementById('cart-name');
    cartNameElement.textContent = savedCartName + ":";
  }

  let cartTotal = 0;

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.className = 'cart-item';
    const totalPrice = item.precio * item.cantidad;
    cartItemDiv.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Precio Total: $${totalPrice}`;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button button-login';
    deleteButton.textContent = '🗑';
    deleteButton.addEventListener('click', () => {
      if (item.cantidad === 1) {
        cart = cart.filter(cartItem => cartItem.nombre !== item.nombre);
      } else {
        item.cantidad -= 1; 
      }

      showCart(); 
    });

    cartItemDiv.appendChild(deleteButton);
  
    cartContentConteiner.appendChild(cartItemDiv);
  
    cartTotal += totalPrice;
  });
  cartTotalConteiner.textContent = `Total: $${cartTotal}`;
}
