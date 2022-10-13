//Data from https://www.eatthis.com/best-worst-chips-ranked/

const fatData = [
  { name: "Doritos", fat: 1 },
  { name: "Cheetos", fat: 1.5 },
  { name: "Fritos", fat: 1.5 },
  { name: "Lay's", fat: 1.5 },
  { name: "Pringles", fat: 2.5 },
  { name: "Cape Cod", fat: 0.5 },
];

/*
async function getData() {
  const apiURL = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const apiData = await fetch(apiURL);
  const apiJSON = await apiData.json();
  console.log(apiData);
}

let selected = fatData;

Linking the graph with an API*/

const height = 800;
const width = 800;

const chartContainer = d3
  .select("#fat")
  .attr("width", width)
  .attr("height", height);
const chart = chartContainer.append("g");

const xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
const yScale = d3.scaleLinear().range([height, 0]);

xScale.domain(fatData.map((d) => d.name));
yScale.domain([0, d3.max(fatData, (d) => d.price) + 1]);

chart
  .selectAll(".bar")
  .data(fatData)
  .enter()
  .append("rect")
  .classed(".bar", true)
  .attr("height", (data) => height - yScale(data.price))
  .attr("width", xScale.bandwidth())
  .attr("x", (data) => xScale(data.name))
  .attr("y", (data) => yScale(data.sugar));

function xAxis(g) {
  g.attr("transform", "translate(0,{$height-margin.bottom})")
    .call(d3.axisBottom(xScale).tickFormat((i) => data[i].name))
    .append("g")
    .call(xAxis);
}

function yAxis(g) {
  g.attr("transform", "translate(${margin.left,0")
    .call(d3.axisLeft(yScale).ticks(null, fatData.format))
    .append("g")
    .call(yAxis);
}

svg
  .selectAll("bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function (d) {
    return x(d.Country);
  })
  .attr("y", function (d) {
    return y(d.Value);
  })
  .attr("width", x.bandwidth())
  .attr("height", function (d) {
    return height - y(d.Value);
  })
  .attr("fill", "#69b3a2");
