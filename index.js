const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', formInput)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function formInput(request, response) {
    let postType = request.query.postType;
    let weight = Number(request.query.weight);

  

    calculateRate(response, postType, weight);
    

}

function calculateRate(response, postType, weight) {
    let total = 0;
    let alert = "";


    if (postType == "stamp-letter") {
        if (weight == 1) {
            total = 0.55;
        } else if(weight==3.5){
            total = 1;
        } else if(weight > 1 && weight < 3.5) {
            for (let i = 2; i <= 3; i++) {
                if (i == weight) {
                    total = 0.55 + (0.15 * (i - 1));
                }
            }
        } else {
            alert = "Please select a weight between 1 and 3.5.";
        }
    } else if (postType == "meter-letter") {
        if (weight == 1) {
            total = 0.5;
        } else if(weight==3.5){
            total = 0.95;
        } else if(weight > 1 && weight < 3.5) {
            for (let i = 2; i <= 3; i++) {
                if (i == weight) {
                    total = 0.5 + (0.15 * (i - 1));
                }
            }
        } else {
            alert = "Please select a weight between 1 and 3.5.";
        }
    } else if (postType == "large-env") {
        if (weight == 1) {
            total = 1;
        } else if(weight > 1) {
            for (let i = 2; i <= 13; i++) {
                if (i == weight) {
                    total = 1 + (0.2 * (i - 1));
                }
            }
        } else {
            alert = "Please select a weight between 1 and 13.";
        }
    } else if(postType == "package") {
        if(weight < 5 && weight > 1){
            total= 3.8;
        } else if(weight >= 5 && weight < 9){
            total = 4.6;
        } else if(weight >= 9 && weight <= 12){
            total = 5.3;
        } else if(weight == 13){
            total = 5.9;
        } else {
            alert = "Please select a weight between 1 and 13.";
        }
    }

    

    const results = {result: "Your total is $" + total.toFixed(2), alert: alert};
    

  
      response.render('pages/results', results);
    

}
