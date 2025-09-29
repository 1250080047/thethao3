document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('product-list');
      data.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <h2>${product.name}</h2>
          <p>${product.price} VND</p>
        `;
        container.appendChild(div);
      });
    });
});
