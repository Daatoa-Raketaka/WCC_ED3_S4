(function () {
    const imgs = [
        './src/img/italian_pasta.png',
        './src/img/carbonara.png',
        './src/img/ramen.png',
        './src/img/calzone.png',
    ]

    imgs.forEach(img => {
        const image = new Image()
        image.src = img
    })
})()