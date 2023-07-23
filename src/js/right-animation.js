const prev = document.getElementById('prev')
const next = document.getElementById('next')
const bg = document.getElementById('bg')
const bgImg = bg.querySelector('div')
const slide = document.querySelector('.slide')
const img = slide.querySelector('div.img')

let normalDeg, targetDeg, currentCount = 0

// Detect the Screen width
const detectScreen = () => {
    if (window.innerWidth < 768) {
        normalDeg = 0
        targetDeg = 45       
    }
    else {
        normalDeg = -45
        targetDeg = 0
    }
    bg.style.transform = `rotateZ(${(currentCount * 90) + normalDeg}deg)`
}
detectScreen()
window.addEventListener('resize', detectScreen)

const imgs = [
    './src/img/italian_pasta.png',
    './src/img/carbonara.png',
    './src/img/ramen.png',
    './src/img/calzone.png',
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
    currentCount += isNext ? -1 : 1
    animation.addEventListener('finish', () => enter(`${imgs[Math.abs(count) % imgs.length]}`))
    bg.style.transform = `rotateZ(${(currentCount * 90) + normalDeg}deg)`
}

const animate = (next) => {
    if (!isAnimate) {
        count += next ? 1 : -1
        isNext = next
        isAnimate = true
        changeImg()
    }
}

const changeFood = (index) => {
    if (index !== count) {
        isNext = index > count
        count = index
        changeImg()
    }
}

// prev.addEventListener('click', () => animate(false))
// next.addEventListener('click', () => animate(true))


/*** Follow Mouse ***/

const leaves = document.querySelectorAll('[data-dr-leaf]')
const mouseTargets = document.querySelectorAll('[data-dr-mouse]')

// Initialize the scale of the floating leaves
leaves.forEach((el, i) => {
    const scale = i + 1 === 1 ? .8 : (i + 1 === 2 ? 1.1 : .6)

    el.style.setProperty('--scale-float', `${scale}`)
    el.style.setProperty('--tx', '0')
    el.style.setProperty('--ty', '0')
})

window.addEventListener('mousemove', (ev) => {
    const mouse = {
        x: ev.clientX - (window.innerWidth / 2),
        y: ev.clientY - (window.innerHeight / 2),
    }

    leaves.forEach((el, i) => {
        const offset = parseFloat(el.getAttribute('data-dr-leaf'))
        const scale = i + 1 === 1 ? .8 : (i + 1 === 2 ? 1.1 : .6)

        el.style.setProperty('--scale-float', `${scale}`)
        el.style.setProperty('--tx', `${mouse.x * offset}%`)
        el.style.setProperty('--ty', `${mouse.y * offset}%`)
    })

    mouseTargets.forEach((el) => {
        const offset = parseFloat(el.getAttribute('data-dr-mouse'))
        el.style.setProperty('--tx', `${mouse.x * offset}%`)
        el.style.setProperty('--ty', `${mouse.y * offset}%`)
    })
})