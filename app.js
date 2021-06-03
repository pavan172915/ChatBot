const express = require('express') // importing epress
const mongoose = require('mongoose') //importing mongoose
const df = require('dialogflow-fulfillment');
mongoose.set('useFindAndModify',false);
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost/ChatBot';
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
mongoose.connect(url,{useNewUrlParser:true});
const con = mongoose .connection;
con.on('open',function(){
    console.log('DataBase connected Successfully...');
});
app.use(express.json());
app.listen(84,()=>{
    console.log('Server Started and Running....');
})
app.get('/',(req,res)=>{
    res.send('Live.!!!!. is the')
});
app.post('/',express.json(),async(req,res)=>{
    const agent = new df.WebhookClient({
        request:req,
        response:res
    });
    async function demo(agent){
        console.log("inside the demo...");
        agent.add("Sending Response From WebHook Server...");
    }
    async function identify_user(agent){
        const check = agent.parameters.number;
        console.log(check);
        console.log('Inside this fuction');
        /*const phone = agent.context.get("awaiting_number");
        console.log(phone.parameters['number']);
        var phoneno = phone.parameters['number'];
        console.log(phoneno);*/
        const client = new MongoClient(url);
        await client.connect();
        const data = await client.db("ChatBot").collection("User").findOne({phone:check});
        if(data==null){
            await agent.add("You are not a member of Our Service...");
        }
        else{
            const name = data.name;
            await agent.add("Welcome "+name+" What can I do for U??");
        }
        //agent.add("Hello User....");
    }
    async function welcome(agent){
      console.log('In welcome');
      agent.add("WELCOME....");
      var payloadData = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Yes I am a registered user",
                  
                  //"link": "https://example.com"
                },
                {
                  "text": "No I am not a registered User",
                  //"link": "https://example.com"
                }
              ]
            }
          ]
        ]
      }
      agent.add(new df.Payload(agent.UNSPECIFIED,payloadData,{sendAsMessage:true,rawPayload:true}));
    }
    async function option1(agent){
      agent.add("Fine,Do not Worry ");
      agent.add("Try Switching Off and On the Internet Modem..");
      agent.add("Is the Issue Resolved??");
      //console.log(agent.context.get("awaiting_choice"));
      console.log('In options Function');
      //console.log(agent.parameters.given_name.length);
    }
    async function option2(agent){
      console.log("In option2");
      agent.add("Sorry for your trouble 😟");
      agent.add("Please make sure you have enough data left in your plan..");
      agent.add("Is is the Issue fixed??");
    }
    async function option3(agent){
      console.log("In option3");
      agent.add("Sorry for your Buffering Problem...");
      agent.add("Please limit the number of devices connected to a single router😎");
      agent.add("Is is the Issue fixed??");
    }
    async function option4(agent){
      console.log("In option4");
      agent.add("No power  Issue Selected...");
      agent.add("Is is the Issue fixed??");
    }
    async function reportOption1(agent){
      console.log("In negative response of option1");
      agent.add("Sorry for the Inconvenience...");
      //console.log(agent.context.get("is_user"));
      //console.log(agent.context.get("awaiting_choice1"));
      var ticket = '';
      var characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for(var i = 0;i<10;i++){
        ticket+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
      }
      console.log(agent.context.get("is_user").parameters["number"]);
      var phone_no = agent.context.get("is_user").parameters["number"];
      const client = new MongoClient(url);
      await client.connect();
        //if(err){throw err;}
        var dbo = client.db("ChatBot");
        dbo.collection("User").findOneAndUpdate({'phone':phone_no},{$set:{'status':'No Internet','token':ticket}},{new:true},(err,v)=>{
          console.log("Inside findOne and update");
          if(err){throw err;}
          if(v){
            //v.save();
            console.log("inside V")
            console.log(v);
            agent.add("Your Issue is reported..");
          }
          else{
            agent.add("SOmething went wrong...");
          }
        })
        agent.add("Your Issue is reported..");
        agent.add("please keep this Issue number for future reference "+ticket);
    }
    async function reportOption2(agent){
      console.log("In negative response of option2");
      agent.add("Sorry for Slow Internet");
      console.log(agent.context.get("is_user"));
      var ticket = '';
      var characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for(var i = 0;i<10;i++){
        ticket+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
      }
      console.log(agent.context.get("is_user").parameters["number"]);
      var phone_no = agent.context.get("is_user").parameters["number"];
      const client = new MongoClient(url);
      await client.connect();
        //if(err){throw err;}
        var dbo = client.db("ChatBot");
        dbo.collection("User").findOneAndUpdate({'phone':phone_no},{$set:{'status':'No Internet','token':ticket}},{new:true},(err,v)=>{
          console.log("Inside findOne and update");
          if(err){throw err;}
          if(v){
            //v.save();
            console.log("inside V")
            console.log(v);
            agent.add("Your Issue is reported..");
          }
          else{
            agent.add("SOmething went wrong...");
          }
        })
        var payloadData = {
          "richContent": [
            [
              {
                "type": "accordion",
                "title": "Issue Number",
                "subtitle": "Please keep this issue number for future assistance",
                "text": ticket
              }
            ]
          ]
        }
        agent.add("Your Issue is reported..");
        agent.add(new df.Payload(agent.UNSPECIFIED,payloadData,{sendAsMessage:true,rawPayload:true}));
      
      
    }
    async function reportOption3(agent){
      console.log("In negative response of option3");
      agent.add("Sorry for your Buffering Problem");
      console.log(agent.context.get("is_user"));
      var ticket = '';
      var characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for(var i = 0;i<17;i++){
        ticket+=characterSet.charAt(Math.floor(Math.random()*characterSet.length));
      }
      console.log(agent.context.get("is_user").parameters["number"]);
      var phone_no = agent.context.get("is_user").parameters["number"];
      const client = new MongoClient(url);
      await client.connect();
        //if(err){throw err;}
        var dbo = client.db("ChatBot");
        dbo.collection("User").findOneAndUpdate({'phone':phone_no},{$set:{'status':'No Internet','token':ticket}},{new:true},(err,v)=>{
          console.log("Inside findOne and update");
          if(err){throw err;}
          if(v){
            //v.save();
            console.log("inside V")
            console.log(v);
            agent.add("Your Issue is reported..");
          }
          else{
            agent.add("SOmething went wrong...");
          }
        })
        var payloadData = {
          "richContent": [
            [
              {
                "type": "accordion",
                "title": "Issue Number",
                "subtitle": "Please keep this issue number for future assistance",
                "text": ticket
              }
            ]
          ]
        }
        agent.add("Your Issue is reported..");
        agent.add(new df.Payload(agent.UNSPECIFIED,payloadData,{sendAsMessage:true,rawPayload:true}));
      
    }
    async function reportOption4(agent){
      console.log("In negative response of option4");
      agent.add("We cannot do anything if there is no power supply to your router");
      agent.add("Sorry 😢😢");
      console.log(agent.context.get("is_user"));
      //console.log(agent.context.get("awaiting_choice"));
      
    }
    async function createUser(agent){
      agent.add("Please Create an account to Continue Further...");
      var payloadData = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Create an Account",
                  
                  //"link": "https://example.com"
                }
              ]
            }
          ]
        ]
      }
      agent.add(new df.Payload(agent.UNSPECIFIED,payloadData,{sendAsMessage:true,rawPayload:true}));
    }
    async function confirmSave(agent){
      console.log(agent.context.get("name").parameters['given-name.original']);
      console.log(agent.context.get("name").parameters['email.original']);
      console.log(agent.context.get("name").parameters['phone-number.original']);
      agent.add("Great we have all required Details");
      agent.add("Do you wish to create your profile?");
      var payloadData = {
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Yes create my account!!",
                  
                  //"link": "https://example.com"
                },
                {
                  "text": "No do not Create",
                  
                  //"link": "https://example.com"
                }
              ]
            }
          ]
        ]
      }
      agent.add(new df.Payload(agent.UNSPECIFIED,payloadData,{sendAsMessage:true,rawPayload:true}));
    }
    async function newUser(agent){
      console.log("In create user ");
      //console.log(agent.context.get("name"));
      //console.log(agent.context.get("name").parameters['phone-number.original']);
      var user_name=agent.context.get("name").parameters['given-name.original'];
      var user_phone=agent.context.get("name").parameters['phone-number.original'];
      var user_email = agent.context.get("name").parameters['email.original'];
      var recipt = "New User";
      let ts = Date.now();
      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      var time_date=year + "-" + month + "-" + date;
      const client = new MongoClient(url);
      await client.connect();
      var dbo = client.db("ChatBot");
      var new_user_details = {name:user_name,phone:parseInt(user_phone),email:user_email,token:recipt,Date:time_date};
      dbo.collection("User").insertOne(new_user_details, function(err, res) {
        if (err) console.log(err);    
      });
      agent.add("User Created Sucessfully....");
    }
     function OptionsList(agent){
         console.log("Going here...");
         //agent.add("Sending Data...");
        var payloadData = {
          "richContent": [
            [
              {
                "type": "chips",
                "options": [
                  {
                    "text": "No Internet",
                    
                    //"link": "https://example.com"
                  },
                  {
                    "text": "Slow Internet",
                    //"link": "https://example.com"
                  },
                  {
                    "text": "Buffering Problem",
                    //"link": "https://example.com"
                  },
                  {
                    "text": "No Power",
                    //"link": "https://example.com"
                  }
                ]
              }
            ]
          ]
        }
        agent.add(new df.Payload(agent.UNSPECIFIED,payloadData,{sendAsMessage:true,rawPayload:true}));
    }
    
    var intentMap = new Map();
    intentMap.set('JustChecking',demo);
    intentMap.set('User_Identification',identify_user);
    intentMap.set('Options',OptionsList);
    intentMap.set('Default Welcome Intent',welcome);
    intentMap.set('No I am not a registered User',createUser);
    intentMap.set('intialConfirm',confirmSave);
    intentMap.set('finalConfirm',newUser);
    intentMap.set('Option1',option1);
    intentMap.set('Option2',option2);
    intentMap.set('Option3',option3);
    intentMap.set('Option4',option4);
    intentMap.set('Option1_sub1',reportOption1);
    intentMap.set('Option2_sub1',reportOption2);
    intentMap.set('Option3Sub_1',reportOption3);
    intentMap.set('Option4Sub1',reportOption4);
    agent.handleRequest(intentMap);
});
