import express from 'express';
import Parser from 'body-parser';

const app = express();
const PORT = 5000;
app.use(Parser.json());
app.get('/', (req,res) => {res.send('Hello Technical Team')});
app.listen(PORT, () => console.log(`Server running on port : http: //localhost:${PORT}`));

const customers = [
    {
        id: 1,
        name: "renad",
    },
    {
        id:2,
        name:"test"
    }
]
const payment_collection=[]

app.post('/api/payment', (req, res) => { //  add new payment
    try{
        const { customer_id, amount, currency } = req.body 

        const filtered = customers.filter(c => c.id === customer_id)
        if(!filtered[0]) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found."
            })
        }
    
        const payment = {
            id:payment_collection.length+1,
            customer_id,
            amount,
            currency,
            status: "unpaid",
            dueDate: new Date(),
            paidDate: null,
        }
        payment_collection.push(payment)
      
        return res.status(200).json({
            status:200,
            message: `payment successfully created for customer ${filtered[0].name}`,
            payment_id:payment.id
        })
    }catch(e){
        res.status(500).send({
            status:500,
            message: e.message
        })
    }
    
})

app.get('/api/payment/:payment_id',(req,res)=>{ //get payment details for a payment_id
    try{
        const {payment_id}=req.params
        const payment = payment_collection.find(p => p.id == payment_id)

        if(!payment) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found."
            })
        }
        res.status(200).json({
            status:200,
            payment
        })
    }catch(e){
        res.status(500).send({
            status:500,
            message: e.message
        })
    }
    
})

app.patch('/api/payment/:payment_id',(req,res)=>{ //payment update
    try{
        const {payment_id}=req.params
        const {status}=req.body
        const payment = payment_collection.findIndex(p => p.id == payment_id)
        if(payment===-1) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found."
            })
        }

        payment_collection[payment].status=status
        payment_collection[payment].paidDate=new Date()
        res.status(200).json({
            status:200,
            payment:payment_collection[payment]
        })
    }catch(e){
        res.status(500).send({
            status:500,
            message: e.message
        })
    }
})

app.delete('/api/payment/:payment_id',(req,res)=>{ //payment update
    try{
        const {payment_id}=req.params
        const payment = payment_collection.findIndex(p => p.id == payment_id)
        if(payment===-1) {
            return res.status(404).json({
                status: 404,
                message: "Resource not found."
            })
        }
  
        payment_collection[payment].status="cancelled"
        payment_collection[payment].paidDate=new Date()
        res.status(200).json({
            status:200,
            payment:payment_collection[payment]
        })
    }catch(e){
        res.status(500).send({
            status:500,
            message: e.message
        })
    }
})

app.get('/api/reminder',(req,res)=>{
    try{
        const {customer_id}=req.headers
        if(!customer_id){
            return res.status(404).json({
                status: 404,
                message: "User not found."
            })
        }
        const payment = payment_collection.find(p => {
           return p.customer_id == customer_id && p.dueDate.valueOf()<new Date().valueOf() && p.status== "unpaid"
        })
        res.status(200).json({
            status:200,
            data:payment
        })
    }catch(e){
        res.status(500).send({
            status:500,
            message: e.message
        })
    }
})



