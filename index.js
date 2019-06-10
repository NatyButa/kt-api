const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const app = express()

mongoose.connect('mongodb://localhost/kotlin',{useNewUrlParser:true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


  app.use(express.json());

  const Participant = mongoose.model('Participant',mongoose.Schema({
      firstName:String,
      middleName:String,
      lastName:String

  }));

  const Agenda = mongoose.model('Agenda',new mongoose.Schema({
      memo_number:{
          type:String,
          required:true
      },
      agenda_title:{
          type:String,
          required:true
      },
      agenda_body:{
          type:String,
          required:true
      },
      participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Participant'


      }
  }));


  //end points

  app.get('/agendas',async(req,res)=>{
      const agenda = await Agenda.find();

      if(!agenda) return res.status(404).send('resource not found ')

      return res.send(agenda);

  });

  app.post('/agenda',async(req,res)=>{
        
    let agenda = await new Agenda({
        memo_number:req.body.name,
        agenda_title:req.body.agenda_title,
        agenda_body:req.body.agenda_body,
        
    });

    agenda = agenda.save();
    res.send(agenda);


  });

  app.put('/agenda/:id',async(req,res)=>{

    const agenda = await Agenda.findByIdAndUpdate(req.params.id,{
        memo_number:req.body.name,
        agenda_title:req.body.agenda_title,
        agenda_body:req.body.agenda_body,
    },{new:true});

    if(!agenda) return res.status(404).send('The agenda with the given id not found');

    res.send(agenda);
  });


  app.delete('/agenda/:id',async(req,res)=>{

    const agenda = await Agenda.findByIdAndDelete(req.params.id);
    if(!agenda)return res.status(404).send('agenda this id not found');
    res.send(agenda);

  });



  app.get('/participant',async(req,res)=>{
      //code here
  });

  app.post('/participant',async(req,res)=>{
      //code here
  });
  app.put('/participant/:id',async(req,res)=>{
      //code here
  });

  app.delete('/participant/:id',async(req,res)=>{
      //code here
      
  })











  const port = process.env.PORT || 3000;

  app.listen(port,()=>{
      console.log(`listening on ${port}`);
  })


