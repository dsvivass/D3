// Seleccionar todos los SVG

const svg = d3.select('#svg-face')
svg.style('background-color', 'white')

const width = +svg.attr('width') // trae el atributo width del DOM
const height = +svg.attr('height') // trae el atributo height del DOM
const g = svg
    .append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`) //Aqui desplazo el origen

const circle = g
    .append('circle')
        .attr('r', height/2)
        .attr('fill', 'yellow')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

// Eyes
const eyeSpacing = 100
const eyeYOffset = -70
const eyeRadius = 30
const eyesGroup = g
    .append('g')
        .attr('transform', `translate(0, ${eyeYOffset})`) //Aqui desplazo el origen

const leftEye = eyesGroup
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', -eyeSpacing)

const rigthEye = eyesGroup
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', eyeSpacing)

// Eyebrows
const eyebrowWidth = 60
const eyebrowHeight = 15
const eyebrowYOffset = -60

const eyebrowsGroup = eyesGroup 
    .append('g')
        .attr('transform', `translate(0, ${eyebrowYOffset})`) //Aqui desplazo el origen

    // Funcion de animacion (Se repite infinitamente)
const repeatTransition = () => {
    eyebrowsGroup
        .transition().duration(2000)
            .attr('transform', `translate(0, ${eyebrowYOffset - 30})`)
        .transition().duration(2000)
            .attr('transform', `translate(0, ${eyebrowYOffset})`)
        .on('end', repeatTransition)
}

repeatTransition()

const leftEyebrow = eyebrowsGroup
    .append('rect')
        .attr('width', eyebrowWidth)
        .attr('height', eyebrowHeight)
        .attr('x', -eyeSpacing - eyebrowWidth/2 )

const rightEyebrow = eyebrowsGroup
    .append('rect')
        .attr('width', eyebrowWidth)
        .attr('height', eyebrowHeight)
        .attr('x', + eyeSpacing - eyebrowWidth/2)

// Mouth
const mouth = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 150,
        outerRadius: 200,
        cornerRadius: 15,
        startAngle: Math.PI / 2,
        endAngle:  3 * Math.PI / 2
}))
    