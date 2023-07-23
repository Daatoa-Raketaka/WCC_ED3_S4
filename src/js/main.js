const burgerBtn = document.querySelector('header>nav>.burger')
const mobileNavbar = document.querySelector('.mobile-navbar')

burgerBtn.addEventListener('click', () => mobileNavbar.classList.add('active'))

mobileNavbar.querySelectorAll('.links .link-item').forEach(link => {
  link.addEventListener('click', () => mobileNavbar.classList.remove('active'))
})

mobileNavbar.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => mobileNavbar.classList.remove('active'))
})

/* Loader */
window.addEventListener('load', () => {
  const overlay = document.querySelector('.overlay')
  overlay.classList.add('loaded')
  overlay.style.backgroundColor = 'transparent'

  const onEnd = (ev) => {
    const target = ev.target
    target.style.opacity = '0'
    target.removeEventListener('animationend', onEnd)
  }
  document.querySelectorAll('.loaded div').forEach(value => value.addEventListener('animationend', onEnd))

  const onLoadedAnimationEnd = (ev) => {
    const target = ev.target
    overlay.style.display = 'none'
    target.removeEventListener('animationend', onLoadedAnimationEnd)
  }
  document.querySelector('.loaded div:nth-child(1)')?.addEventListener('animationend', onLoadedAnimationEnd)
})


/* Food descriptions */
let currentRecipe = 0
const recipe = document.querySelector('.hero>.left>.recipe')
const title = recipe.querySelector('.title')
const description = recipe.querySelector('.description')
const pricesP = recipe.querySelectorAll('.paiement>.prices p')
const foods = [
  {
    name: 'Italian Pasta',
    speciality: 'With Special Sauce',
    price: 7.9
  },
  {
    name: 'Carbonara',
    speciality: 'With Special Cheese',
    price: 10.5
  },
  {
    name: 'Ramen',
    speciality: 'With Gambas',
    price: 9.7
  },
  {
    name: 'Calzone',
    speciality: 'With Special Sauce',
    price: 5.0
  }
]
// Init food description
function setFoodDescription(foodIndex = 0) {
  title.innerHTML = `${(foodIndex + 1).toString(10).padStart(2, '0')}. ${foods[foodIndex].name}<br><span class="speciality">${foods[foodIndex].speciality}</span>`
  description.innerHTML = `${foods[foodIndex].name} ${foods[foodIndex].speciality} is a<br>flavor you can find only in <b>fode</b>.`
  pricesP.forEach(p => p.innerHTML = `$${(foods[foodIndex].price).toPrecision(3)}`)
}

// Animate the food description and recipe
function animateFoodDescription() {
  title.animate(
    [{ transform: 'translateY(100%) skewX(-50deg)' }, { transform: 'translateY(0) skewX(0deg)' }],
    {
      duration: 1000,
      easing: 'ease-out',
    }
  )
  description.animate(
    [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }],
    {
      duration: 1500,
      easing: 'ease-out',
    }
  )
  pricesP.forEach(p => p.animate(
    [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
    {
      duration: 1500,
      easing: 'ease-out',
    }
  ))
}

function foodLeave() {
  title.animate(
    [{ transform: 'translateY(0%) skewX(0deg)' }, { transform: 'translateY(-100%) skewX(50deg)' }],
    {
      duration: 500,
      easing: 'ease-in-out',
    }
  )
  pricesP.forEach(p => p.animate(
    [{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }],
    {
      duration: 500,
      easing: 'ease-in-out',
    }
  ))
  return description.animate(
    [{ transform: 'translateX(0%)' }, { transform: 'translateX(100%)' }],
    {
      duration: 500,
      easing: 'ease-out',
    }
  )
}

setFoodDescription(0)
animateFoodDescription()

// Init pagination
for (let i = 0; i < foods.length; i++) {
  const div = document.createElement('div')
  div.classList.add('item')
  if (i === 0) div.classList.add('is-current')
  recipe.querySelector('.pagination').appendChild(div)
}

recipe.querySelectorAll('.pagination .item').forEach((item, i) => {
  item.addEventListener('click', () => {
    if (currentRecipe !== i) {
      for (let j = 0; j < foods.length; j++) {
        recipe.querySelectorAll('.pagination .item')[j].classList.remove('is-current')
      }
      currentRecipe = i
      foodLeave().addEventListener('finish', () => {
        setFoodDescription(i)
        animateFoodDescription()
      })
      changeFood(i)
      item.classList.add('is-current')
    }
  })
})

const chef = document.querySelector('#chef-link')
const chefBg = document.querySelector('#chef-background')

chef.addEventListener('mouseover', () => {
  chefBg.classList.add('hover')
})

chef.addEventListener('mouseout', () => {
  chefBg.classList.remove('hover')
})

/* Chef animation floating */
/* document.querySelector('.hero>.left>.chef-recommendation>.left>img').animate(
  [{ transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(-5px)' }],
  {
    duration: 1500,
    easing: 'ease-in-out',
    iterations: Infinity
  }
) */

/* Table kely */
let currentDicountMenu = 0
const discountFood = document.querySelector('#discount-coupon>.container>.body>.left>.content>.hidden>.food-name')
const discountImg = document.querySelector('#discount-coupon>.container>.body>.left>.hidden>img')
const discountCalories = document.querySelector('#discount-coupon>.container>.body>.left>.content>.calories>span')
const discountPrices = document.querySelectorAll('#discount-coupon .prices p')
const prevDiscount = document.querySelector('#discount-coupon>.container>.header>.buttons>.prev')
const nextDiscount = document.querySelector('#discount-coupon>.container>.header>.buttons>.next')
const discountMenus = [
  {
    name: 'Mexicoo Pizza',
    imgSrc: './src/img/mexico_pizza.png',
    calories: 78,
    price: '$7.90'
  },
  {
    name: 'Tuna Salad',
    imgSrc: './src/img/tuna_salad.png',
    calories: 57,
    price: '$5.50'
  },
  {
    name: 'Lasagna',
    imgSrc: './src/img/lasagna.png',
    calories: 95,
    price: '$6.00'
  }
]


function leaveDiscountAnimation() {
  discountFood.animate([
    { transform: 'translateY(0%)' },
    { transform: 'translateY(-100%)' }
  ], { duration: 500, easing: 'ease-in' })

  discountImg.animate([
    { transform: 'translateX(0%) rotateZ(0deg)' },
    { transform: 'translateX(-100%) rotateZ(-180deg)' },
  ], { duration: 500, easing: 'ease-in' })

  discountPrices.forEach(p => p.animate(
    [{ transform: 'translateY(0%)' }, { transform: 'translateY(-100%)' }],
    { duration: 500, easing: 'ease-in' }
  ))

  return discountCalories.animate([
    { transform: 'translateY(0%)' },
    { transform: 'translateY(100%)' }
  ], { duration: 500, easing: 'ease-in' })
}

function enterDiscountAnimation() {
  discountFood.animate([
    { transform: 'translateY(100%)' },
    { transform: 'translateY(0%)' }
  ], { duration: 500, easing: 'ease-out' })

  discountImg.animate([
    { transform: 'translateX(100%) rotateZ(180deg)' },
    { transform: 'translateX(0%) rotateZ(0deg)' },
  ], { duration: 500, easing: 'ease-out' })

  discountPrices.forEach(p => p.animate(
    [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
    { duration: 500, easing: 'ease-out' }
  ))

  discountCalories.animate([
    { transform: 'translateY(-100%)' },
    { transform: 'translateY(0%)' }
  ], { duration: 500, easing: 'ease-out' })
}

function setDiscountFood(foodIndex) {
  foodIndex = foodIndex % 3
  leaveDiscountAnimation()
    .addEventListener('finish', () => {
      discountFood.innerHTML = `${discountMenus[foodIndex].name}`
      discountImg.setAttribute('src', discountMenus[foodIndex].imgSrc)
      discountImg.setAttribute('alt', discountMenus[foodIndex].name)
      discountCalories.innerHTML = `${discountMenus[foodIndex].calories} Calories`
      discountPrices.forEach(p => p.innerHTML = discountMenus[foodIndex].price)

      enterDiscountAnimation()
    })
}

// Init discount foods
setDiscountFood(currentDicountMenu)

prevDiscount.addEventListener('click', () => { setDiscountFood(--currentDicountMenu) })

nextDiscount.addEventListener('click', () => { setDiscountFood(++currentDicountMenu) })