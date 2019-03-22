const Joi = require('joi');
const express= require ('express');
const router = express.Router();

const leaders= [
       { id: 99,
        committee:'Media',
        tasks:'planning'
       },  

       { id: 100,
        committee:'HR',
        tasks:'organization'
       },      
];

router.get('/', (req ,res) => {
    res.send(leaders);
});

router.get('/:id', (req, res) =>{
    //res.send(req.query);
    const leader = leaders.find(c => c.id===parseInt(req.params.id));
    if(!leader) return res.status(404).send('the leader with the given id was not found');
    res.send(leader);
 });

 router.post('/', (req, res) => {
    const {error} =validateLeader(req.body); //error=result.error
    if (error) return res.status(400).send(error.details[0].message);

    //create new volunteer in volunteers
    const leader={id: leaders.length+1, 
        committee:req.body.committee,
        tasks:req.body.tasks   };
    leaders.push(leader);  
    res.send(leader)
});

router.put('/:id', (req, res) =>{
//look up the leader
 //if not existing, return 404
 const leader = leaders.find(c => c.id===parseInt(req.params.id));
 if(!leader) return res.status(404).send('the leader with the given id was not found');
    //validate?
    //if not validate, return 400 -bad request
    const {error} =validateLeader(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //update
    leader.committee=req.body.committee;
    leader.tasks=req.body.tasks;
    //return the updated leader.
    res.send(leader);
});

function validateLeader(leader){
    const schema ={
        committee:Joi.string().min(2).required(),
        tasks:Joi.string().min(1).required()
     };
    return Joi.validate(volunteer, schema);
}

router.delete('/:id', (req, res) =>{
    //look up the leader
    //not existing, return 404
    const leader = leaders.find(c => c.id===parseInt(req.params.id));
    if(!leader) return res.status(404).send('the leader with the given id was not found');

    //delete
    const index = leaders.indexOf(leader);
    leaders.splice(index,4);
    res.send(leader);
});

module.exports= router;