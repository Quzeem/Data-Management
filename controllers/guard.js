const Guard = require('../models/Guard')


//  @desc   Add a new guard profile
//  @routes  POST /auth/register
//  @access  Private

exports.register_guard =async(req, res, next )=>{
 try{
 const guard_data = new Guard({
   guard_name: req.body.guard_name,
   permanent_home_address: req.body.permanent_home_address,
   present_home_address:req.body.present_home_address,
   phone_number: req.body.phone_number,
   date_of_birth: req.body.date_of_birth,
   state_of_origin: req.body.state_of_origin,
   next_of_kin: req.body.next_of_kin,
   next_of_kin_phone_number: req.body.next_of_kin_phone_number,
   date_of_deployment: req.body.date_of_deployment,
   post: req.body.post,
   beat: req.body.beat
 })
 guard_data.guarantors = [{
    name: req.body.guarantor_name_1,
    home_address:req.body.guarantor_home_address_1,
    office_address: req.body.guarantor_office_address_1,
    phone_contact:req.body.guarantor_phone_contact_1,
    occupation:req.body.guarantor_occupation_1
 },
 {
    name: req.body.guarantor_name_2,
    home_address:req.body.guarantor_home_address_2,
    office_address: req.body.guarantor_office_address_2,
    phone_contact:req.body.guarantor_phone_contact_2,
    occupation:req.body.guarantor_occupation_2
 }]
 
 await guard_data.save()

res.status(201).json({
  message: 'Guard registeration successful.'
})
 }catch (error){
res.status(401).json({
  status: 'fail',
  Error: error
})
 }

};


//  @desc   Get all guards
//  @routes  GET /auth/guards
//  @access  Private
exports.get_all_guard_data = async(req, res)=>{
  try {
    const guard_data = await Guard.find()
    return res.status(200).json({
      data: guard_data
    })
  } catch (error) {
    return res.status(404).json({
      Error: error.message
    });
  }
};

//  @desc    Get guard's Single profile
//  @routes  GET /auth/guards/:id
//  @access  Private
exports.get_single_guard_data = async(req, res)=>{
  const id = req.params.id
  try {
    const guard_data = await Guard.findById(id)

    return res.status(200).json({
      status: 'success',
      data: guard_data
    })
  } catch (error) {
    console.error(error)
    return res.status(404).json({
      Error: error
    });
  }
}

//  @desc   Update a guard's profile
//  @routes  PUT /auth/guards/:id
//  @access  Private
exports.update_single_guard_data = async(req,res)=>{
  const id = req.params.id;

  try {
    const guard_data = await Guard.findOneAndUpdate(id, req.body, { new: true, runValidator:true })
    return res.status(200).json({
      status: 'success',
      data: guard_data
    })
  } catch (error) {
    return new Error({
      Error: error
    })
    
  }
}

//  @desc   Delete a guard's profile
//  @routes  DELETE /auth/guards/:id
//  @access  Private
exports.delete_single_guard_data = async(req,res)=>{
  const id = req.params.id;
  try {
    await Guard.findByIdAndDelete(id)
    return res.status(200).json({
      status: 'success',
      data: {}

    });
  } catch (error) {
    return new Error({
      Error: error
    })
    
  }
}