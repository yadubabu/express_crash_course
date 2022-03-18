const express=require('express');
const uuid=require('uuid');
const router=express.Router();

var members=require('../../members');


//Get All Members
router.get('/',(req,res)=>res.json(members));

//get single member
router.get('/:id',(req,res)=>{
const found=members.some(member=>member.id===parseInt(req.params.id));
if(found){
    res.json(members.filter(member=>member.id === parseInt(req.params.id)));
}else{
    res.status(400).json({msg:`no member with id ${req.params.id}`});
}
});

//Create member
router.post('/',(req,res)=>{
const newmember={
    id:uuid.v4(),
    name:req.body.name,
    email:req.body.email,
    status:'active'
};
if(!newmember.name || !newmember.email){
return res.status(400).json({Msg:'Please include a name and email'});
}

members.push(newmember);
res.json(members);
});

//Update member
router.put('/:id',(req,res)=>{
    const found=members.some(member=>member.id===parseInt(req.params.id));
    if(found){
        const updmember=req.body;
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name=updmember.name ? updmember.name:member.name;
                member.email=updmember.email ? updmember.email:member.email;

                res.json({msg:'Member updated',member});
            }
        });
    
    }else{
        res.status(400).json({msg:`no member with id ${req.params.id}`});
    }
    });

    //Delete member
    router.delete('/:id',(req,res)=>{
        const found=members.some(member=>member.id!==parseInt(req.params.id));
        if(found){
            res.json({msg:'Member Deleted',
        members:members.filter(member=>member.id !== parseInt(req.params.id))
            });
        }else{
            res.status(400).json({msg:`no member with id ${req.params.id}`});
        }
        });
        
module.exports=router;