const Joi = require('joi');
const express= require ('express');
const router = express.Router();


const boards= [
    { id: 20,
     role:'chairman',
     tasks:'manage IEEE branch'
       },  

    { id: 21,
      role:'vice',
      tasks:'help chairman' 
       },   

    { id: 22,
    role:'head of technical committee',
    tasks:'provides the branch with courses' 
       }, 

    { id: 23,
    role:'head of activities committee',
    tasks:'planning and provides new ideas' 
        }, 
];

router.get('/', (req ,res) => {
   res.send(boards);
});

router.get('/:id', (req, res) =>{
   //res.send(req.query);
   const boardMem = boards.find(c => c.id===parseInt(req.params.id));
   if(!boardMem) return res.status(404).send('the boardMem with the given id was not found');
   res.send(boardMem);
});

router.post('/', (req, res) => {
   const {error} =validateBoardMem(req.body); 
   if (error) return res.status(400).send(error.details[0].message);

   //create new boardMem in boards
   const boardMem={id: boards.length+1, 
                role:req.body.role,
               tasks:req.body.tasks};
   boards.push(boardMem);  
   res.send(boardMem)
});

router.put('/:id', (req, res) =>{
//look up the boardMem
//if not existing, return 404
const boardMem = boards.find(c => c.id===parseInt(req.params.id));
if(!boardMem) return res.status(404).send('the boardMem with the given id was not found');
   //validate?
   //if not validate, return 400 -bad request
   const {error} =validateBoardMem(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   //update
   boardMem.role=req.body.role;
   boardMem.tasks=req.body.tasks;
   //return the updated boardMem.
   res.send(boardMem);
});

function validateBoardMem(boardMem){
   const schema ={
       role:Joi.string().min(2).required(),
       tasks:Joi.string().min(5).required()

    };
   return Joi.validate(boardMem, schema);
}

router.delete('/:id', (req, res) =>{
   //look up the boardMem
   //not existing, return 404
   const boardMem = boards.find(c => c.id===parseInt(req.params.id));
   if(!boardMem) return res.status(404).send('the boardMem with the given id was not found');

   //delete
   const index = boards.indexOf(boardMem);
   boards.splice(index,1);
   res.send(boardMem);
});

module.exports= router;