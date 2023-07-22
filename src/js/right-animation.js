const prev = document.getElementById('prev')
const next = document.getElementById('next')
const bg = document.getElementById('bg')
const slide = document.querySelector('.slide')
const img = slide.querySelector('div.img')

const imgs = [
    '../img/italian_pasta.png',
    '../img/calzone.png',
    '../img/carbonara.png',
    '../img/lasagna.png',
    '../img/mexico_pizza.png',
    '../img/ramen.png',
    '../img/tuna_salad.png',
]

let count = 0
let isNext = true
let isAnimate = false

const createEnterAnimation = (fromDeg) => (isReversed = false) =>
    slide.animate([
        {
            transform: `rotateZ(${fromDeg}deg)`,
            opacity: 0
        },
        {
            transform: 'rotateZ(0deg)',
            opacity: 1
        }
    ], {
        direction: isReversed ? 'reverse' : 'normal',
        duration: 600,
        easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    })


const enterTop = createEnterAnimation(90)
const enterBottom = createEnterAnimation(-90)

const enter = (imgURL) => {
    img.style.backgroundImage = `url(${imgURL})`
    let animation = isNext ? enterTop() : enterBottom()
    animation.addEventListener('finish', () => isAnimate = false)
}

const changeImg = () => {
    let animation = isNext ? enterBottom(true) : enterTop(true)
    animation.addEventListener('finish', () => enter(`./assets/${(Math.abs(count) % imgs.length) + 1}.png`))
}

const rotateBg = () => bg.style.transform = `rotateZ(${(-count * 90) - 45}deg)`

const animate = (next) => {
    if (!isAnimate) {
        if (next) count++
        else count--
        isNext = next
        isAnimate = true
        changeImg()
        rotateBg()
    }
}

// prev.addEventListener('click', () => animate(false))
// next.addEventListener('click', () => animate(true))


/*** Follow Mouse ***/

const elements = document.querySelectorAll('[data-dr-mouse]')
window.addEventListener('mousemove', (ev) => {
    const mouse = {
        x: ev.clientX - (window.innerWidth / 2),
        y: ev.clientY - (window.innerHeight / 2),
    }

    elements.forEach(el => {
        const offset = parseFloat(el.getAttribute('data-dr-mouse'))

        el.style.transform = `translate(${mouse.x * offset}%, ${mouse.y * offset}%)`
    })
})