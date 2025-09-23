// Cart dropdown interactivity
document.addEventListener('DOMContentLoaded', function() {
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartBtn = document.querySelector('.cart-btn');
  const cartMenu = document.getElementById('cart-menu');
  const cartBadge = document.getElementById('cart-badge');
  if (cartDropdown && cartBtn && cartMenu && cartBadge) {
    cartBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      cartDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!cartDropdown.contains(e.target)) {
        cartDropdown.classList.remove('open');
      }
    });
    // Remove item from cart
    cartMenu.addEventListener('click', function(e) {
      if (e.target.classList.contains('cart-item-remove')) {
        const item = e.target.closest('.cart-item');
        if (item) {
          item.remove();
          // Update badge
          const count = cartMenu.querySelectorAll('.cart-item').length;
          cartBadge.textContent = count;
          if (count === 0) cartBadge.style.display = 'none';
        }
      }
    });
    // Hide badge if cart is empty on load
    if (cartMenu.querySelectorAll('.cart-item').length === 0) {
      cartBadge.style.display = 'none';
    }
  }
});
// Profile dropdown interactivity
document.addEventListener('DOMContentLoaded', function() {
  const profileDropdown = document.querySelector('.profile-dropdown');
  const profileBtn = document.querySelector('.profile-btn');
  if (profileDropdown && profileBtn) {
    profileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      profileDropdown.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('open');
      }
    });
  }
});

function searchCourse() {
  let category = document.querySelector("select").value;
  let keyword = document.querySelector("input").value;
  if (keyword.trim() === "") {
    alert("Please enter a course name to search!");
  } else {
    alert(`Searching for "${keyword}" in category "${category}"`);
  }
}

// Interactive lesson tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.lesson-tabs .tab');
  const cards = document.querySelectorAll('.lesson-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const group = this.getAttribute('data-tab');
      cards.forEach(card => {
        if (card.getAttribute('data-group') === group) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  // Show only highschool by default
  cards.forEach(card => {
    if (card.getAttribute('data-group') !== 'highschool') {
      card.style.display = 'none';
    }
  });
});
