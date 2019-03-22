const Joi = require('joi');
const express= require ('express');
const router = express.Router();

const volunteers= [
    { id: 1,
     name: 'Hagr',
     age: 22,
     joinDate:'11/27/2016',
     skills: ['communication skills', 'practice techniques'],
     position:{role:'volunteer', roldid:17},
     committee:'PR'
    },  
    { id: 2,
        name: 'Toka',
        age: 23,
        joinDate:'02/15/2015',
        skills: ['communication skills','social intelligence'],
        position:{role:'boarddMember', roldid:22},
        committee:'FR'
       },  
       { id: 3,
        name: 'Aalaa',
        age: 20,
        joinDate:'02/20/2018',
        skills: ['creativity'],
        position:{role:'leader', roldid:99},
        committee:'Media'
       },  
       { id: 4,
        name: 'Yomna',
        age: 21,
        joinDate:'02/20/2018',
        skills: ['confidentiality','good organization'],
        position:{role:'leader', roldid:100},
        committee:'HR'
       },  
       { id: 5,
        name: 'Asmaa',
        age: 21,
        joinDate:'09/15/2018',
        skills: ['creativity', 'communication','planning skills'],
        position:{role:"boarddMember", roldid:23},
        committee:'Marketing'
       },  
       { id: 6,
        name: 'Sara',
        age: 23,
        joinDate:'11/27/2016',
        skills: ['communication','planning skills'],
        position:{role:"volunteer", roldid:18},
        committee:'competition'
       },  
];


router.get('/', (req ,res) => {
    res.send(volunteers);
});

router.get('/:id', (req, res) =>{
    //res.send(req.query);
    const volunteer = volunteers.find(c => c.id===parseInt(req.params.id));
    if(!volunteer) return res.status(404).send('the volunteer with the given id was not found');
    res.send(volunteer);
 });

 router.post('/', (req, res) => {

    let today = new Date();
    let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

    const {error} =validateVolunteer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //create new volunteer in volunteers
    const volunteer={id: volunteers.length+1, 
                 name:req.body.name,
                 age:req.body.age,
                 joinDate:req.body.joinDate,
                 skills:req.body.skills,
                 position:req.body.position,
                 committee:req.body.committee,
                };
    
    if (req.body.joinDate===''){
         volunteer.joinDate=today;
    };

    volunteers.push(volunteer);  
    res.send(volunteer)
});

router.put('/:id', (req, res) =>{
//look up the volunteer
 //if not existing, return 404
 const volunteer = volunteers.find(c => c.id===parseInt(req.params.id));
 if(!volunteer) return res.status(404).send('the Volunteer with the given id was not found');
    //validate?
    //if not validate, return 400 -bad request
    const {error} =validateVolunteer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //update
    volunteer.name=req.body.name;
    volunteer.age=req.body.age;
    volunteer.joinDate=req.body.joinDate;
    volunteer.skills=req.body.skills;
    volunteer.position=req.body.position;
    volunteer.committee=req.body.committee;
    //return the updated volunteer.
    res.send(volunteer);
});

function validateVolunteer(volunteer){
    const schema ={
        name:Joi.string().min(3).required(),
        age:Joi.number().required(),
        joinDate:Joi.date().format('MM/DD/YYYY').required(),
        skills:Joi.array().items(joi.string().required()),
        position:Joi.object().keys({
           role:Joi.string().min(6).required(),
           roldid:Joi.number().required()}),
        committee:Joi.string().min(2).required()
     };
    return Joi.validate(volunteer, schema);
}

router.delete('/:id', (req, res) =>{
    //look up the volunteer
    //not existing, return 404
    const volunteer = volunteers.find(c => c.id===parseInt(req.params.id));
    if(!volunteer) return res.status(404).send('the volunteer with the given id was not found');

    //delete
    const index = volunteers.indexOf(volunteer);
    volunteers.splice(index,4);
    res.send(volunteer);
});

module.exports= router;