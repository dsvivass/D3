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
    
/// --------------------------------------- ///
// Grafico de barras

const svgChart = d3.select('#svg-chart')

const widthSvgChart = +svgChart.attr('width') // trae el atributo width del DOM
const heightSvgChart = +svgChart.attr('height') // trae el atributo height del DOM

const render = (data) => {
    const margin = {
        top: 20, 
        right: 20,
        bottom: 50,
        left: 150
    }
    const innerWidth = widthSvgChart - margin.left - margin.right
    const innerHeight = heightSvgChart - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Numero)])
        .range([0, innerWidth])

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.Raza))
        .range([0, innerHeight])
        .padding(0.1)

    const g = svgChart.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xAxisTickFormat = (number) => 
        d3.format('.3s')(number)
            .replace('G', 'B')

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight)

    g.append('g')
        .call(d3.axisLeft(yScale).tickSize(-innerWidth)) // Pone el eje y
        .selectAll('.tick line') // '.domain, .tick line' el . domain se puede quitar pero lo use para hacer el recuadro exterior
            .remove() // el .domain Remueve las lineas exteriores e innecesarias del eje Y (Se puede ver al inspeccionar elemento en la pagina)
                      // el .tick line Remueve las lineas interiores ubicadas dentro del .tick (Se puede ver al inspeccionar elemento en la pagina)

    const xAxisGroup = g.append('g').call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`) // Pone el eje x

    // xAxisGroup.selectAll('.domain').remove() // el .domain Remueve las lineas exteriores e innecesarias del eje X (Se puede ver al inspeccionar elemento en la pagina)

    xAxisGroup.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth/2)
        .attr('y', 45)
        .attr('fill', 'black')
        .text('Población')

    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(d.Raza))
            .attr('width', d => xScale(d.Numero))
            .attr('height', yScale.bandwidth())

    g.append('text')
        .attr('class', 'title')
        .attr('y', -2)
        .text('Raza de perros VS Número en el mundo')
}

d3.csv('Razas de perros.csv').then(data => {
    data.forEach(d => {
        d.Numero = +d.Numero
    })
    console.log(data)
    render(data)
})
