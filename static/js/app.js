// Use the D3 library to read in samples.json from the URL

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(({names}) => {

    names.forEach(id => {
        d3.select("select").append("option").text(id)
    });
    optionChanged()
});

const optionChanged = () => {
    let choice = d3.select('select').node().value;
    
    d3.json(url).then(({metadata,samples}) =>{
    
        let meta = metadata.filter(obj => obj.id == choice)[0];
        let sample = samples.filter(obj => obj.id == choice)[0]
    
        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h4').text(`${key.toUpperCase()}: ${val}`)
        });
        

//     Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.


        let top10SampleValues = sample.sample_values.slice(0, 10).reverse();
        let top10OTUids = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let top10OTULabels = sample.otu_labels.slice(0, 10).reverse();

        let trace = {
            x: top10SampleValues,
            y: top10OTUids,
            text: top10OTULabels,
            type: 'bar',
            orientation: 'h'
        };

        let layout = {
            title: `Top 10 OTUs ${choice}`,
            xaxis: { title: 'Sample Values' },
            yaxis: { title: 'OTU Id' }
        };

        let data = [trace];

        Plotly.newPlot('bar', data, layout);
   

    // Create a bubble chart that displays each sample.

        let traceBubble = {
        x: sample.otu_ids,
        y: sample.sample_values,
        text: sample.otu_labels,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids,
            colorscale: 'Viridis'
        }
    };

        let layoutBubble = {
        title: `Bubble Chart ${choice}`,
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
    };

        let dataBubble = [traceBubble];

        Plotly.newPlot('bubble', dataBubble, layoutBubble);
    });
}
//     loadJSON();