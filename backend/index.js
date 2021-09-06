const express = require('express')
const app = express()
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.post('/req', (request, response) => {
    var recommendedlength=''
    var min,max
    let x=request.body.age
    switch (true) {
        case (x<5):
            recommendedlength=request.body.height
                  break;
              case(x<9):
              min=request.body.height+10
              max=request.body.height+20
              recommendedlength=""+min+'-'+max
                    break; 
              case(x>9):
              recommendedlength=request.body.height
                    break;      
              default:
                  break;
          }
          switch (request.body.model) {
            case "Classic":
                recommendedlength=request.body.height+20
                if(recommendedlength>207){
                    recommendedlength=207
                }
                break;
            case "FreeStyle" :
                  min=request.body.height+10
                   max=request.body.height+15
                  recommendedlength=""+min+'-'+max
                break;   
        
            default:
                break;
        }
        response.send({recommendedlength:recommendedlength})
  })
app.listen(3000, () => {
    console.log('The web service can now receive calls.')
  })