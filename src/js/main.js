const burgerBtn = document.querySelector('header>nav>.burger')
const mobileNavbar = document.querySelector('.mobile-navbar')

burgerBtn.addEventListener('click', () => mobileNavbar.classList.add('active'))

mobileNavbar.querySelectorAll('.links .link-item').forEach(link => {
  link.addEventListener('click', () => mobileNavbar.classList.remove('active'))
})

mobileNavbar.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => mobileNavbar.classList.remove('active'))
})