const express= require ('express');
const app= express();

const volunteer= require('./routes/ieee_volunteers');
const leader= require('./routes/ieee_leaders')
const board= require('./routes/ieee_boardMembers');

app.use(express.json());
app.use('/api/ieee_tsb/volunteers',volunteer);
app.use('/api/ieee_tsb/leaders',leader);
app.use('/api/ieee_tsb/boards',board);


app.get('/api/ieee_tsb', (req ,res) => {
    res.send('Blue suits us');
});

const port=process.env.port||8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));