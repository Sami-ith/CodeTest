<template>
    <v-main>
        <v-row align="center" justify="center">
        <v-col cols="8">
                <v-slider thumb-label="always"
                    label="Age"
                    min="0"
                    max="100"
                    v-model="age"
                    @change="handleClick"
                    >
            </v-slider>
            <v-slider thumb-label="always"
                    label="Height" 
                    min="30"
                    max="200"
                    v-model="height"
                    @change="handleClick"
                    >
            </v-slider>
            <div v-if="age>9">
                <v-radio-group
                    v-model="selectedModel"
                    mandatory
                    >
                    <v-radio
                        label="Classic"
                        value="Classic"
                        @click="handleClick"
                    ></v-radio>
                    <v-radio
                        label="Free Style"
                        value="FreeStyle"
                        @click="handleClick"
                    ></v-radio>
                </v-radio-group>
            </div>
            <v-btn depressed color="primary" @click="sendReq">Submit</v-btn>
           <v-col cols="4">
                 Client:
                {{recommendedlength}}
           </v-col>
            <v-col cols="4">
                 Server:
                 {{fromServer}}
                
            </v-col>
        </v-col>
        </v-row>
    </v-main>
</template>
<script>
export default {
    data(){
        return{
            height:30,
             age:0,
             selectedModel:null,
             recommendedlength:"",
             fromServer:"",
        }
    },
    methods:{
        handleClick: function() {
          var x=this.age
          var min,max=null  
          switch (true) {
              case (x<5):
                  this.recommendedlength=this.height
                  break;
              case(x<9):
                    min=this.height+10
                    max=this.height+20
                    this.recommendedlength=""+min+"-"+max
                    break; 
              case(x>9):
                    this.recommendedlength=this.height
                    break;      
              default:
                  break;
          }
          switch (this.selectedModel) {
              case "Classic":
                  this.recommendedlength=this.height+20
                  if(this.recommendedlength>207){
                      this.recommendedlength=207
                  }
                  break;
              case "FreeStyle" :
                  min=this.height+10
                  max=this.height+15
                  this.recommendedlength=""+min+'-'+max
                  break; 
              default:
                  break;
          }
    },
    sendReq:function(){
        let req={
            height:this.height,
            age:this.age,
            model:this.selectedModel
        }
        fetch("http://localhost:3000/req",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(req)
        })
        .then(response=>response.json())
        .then(data=>{
            this.fromServer=data.recommendedlength
        })
    }
    } 
}
</script>