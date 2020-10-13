const Guard = require('../models/Guard');

//  @desc   Get all guards
//  @routes  GET /guards
//  @access  Private
exports.getAllGuards = async (req, res) => {
  try {
    const guards = await Guard.find();
    return res.render('index', { guards });
  } catch (error) {
    req.flash('error', 'Something went wrong');
  }
};

//  @desc    Get guard's data
//  @routes  GET /guards/:id
//  @access  Private
exports.getSingleGuard = async (req, res) => {
  const id = req.params.id;
  try {
    const guard = await Guard.findById(id);

    if (!guard) {
      req.flash('error', 'Guard not found');
      return res.redirect('/guards');
    }

    return res.render('show', { guard });
  } catch (error) {
    req.flash('error', 'Something went wrong');
  }
};

//  @desc    Show registration form
//  @routes  GET /guards/new
//  @access  Private
exports.showRegistrationForm = async (req, res) => {
  res.render('new');
};

//  @desc   Add a new guard data
//  @routes  POST /guards
//  @access  Private

exports.registerGuard = async (req, res, next) => {
  try {
    const guard = new Guard({
      guard_name: req.body.guardName,
      permanent_home_address: req.body.guardPermanentHomeAddress,
      present_home_address: req.body.guardPresentHomeAddress,
      phone_number: req.body.guardPhoneNumber,
      date_of_birth: req.body.dateOfBirth,
      state_of_origin: req.body.stateOfOrigin,
      next_of_kin: req.body.nextOfKin,
      next_of_kin_phone_number: req.body.nextOfKinPhone,
      date_of_deployment: req.body.dateOfDeployment,
      post: req.body.post,
      beat: req.body.beat,
    });
    guard.guarantors = [
      {
        name: req.body.guarantorOneName,
        home_address: req.body.guarantorOneHomeAddress,
        office_address: req.body.guarantorOneOfficeAddress,
        phone_contact: req.body.guarantorOnePhone,
        occupation: req.body.guarantorOneOccupation,
      },
      {
        name: req.body.guarantorTwoName,
        home_address: req.body.guarantorTwoHomeAddress,
        office_address: req.body.guarantorTwoOfficeAddress,
        phone_contact: req.body.guarantorTwoPhone,
        occupation: req.body.guarantorTwoOccupation,
      },
    ];

    await guard.save();

    req.flash('success', 'Data successfully Added');
    res.redirect('/guards');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong');
    res.redirect('/guards');
  }
};

//  @desc    Show edit form
//  @routes  GET /guards/:id/edit
//  @access  Private
exports.showEditForm = async (req, res) => {
  const id = req.params.id;
  try {
    const guard = await Guard.findById(id);

    if (!guard) {
      req.flash('error', 'Guard not found');
      return res.redirect(`/guards/${guard._id}`);
    }

    return res.render('edit', { guard });
  } catch (error) {
    req.flash('error', 'Something went wrong');
  }
};

//  @desc   Update a guard's data
//  @routes  PUT /guards/:id
//  @access  Private
exports.updateGuardData = async (req, res) => {
  const id = req.params.id;
  const dataToUpdate = {
    guard_name: req.body.guardName,
    permanent_home_address: req.body.guardPermanentHomeAddress,
    present_home_address: req.body.guardPresentHomeAddress,
    phone_number: req.body.guardPhoneNumber,
    date_of_birth: req.body.dateOfBirth,
    state_of_origin: req.body.stateOfOrigin,
    next_of_kin: req.body.nextOfKin,
    next_of_kin_phone_number: req.body.nextOfKinPhone,
    date_of_deployment: req.body.dateOfDeployment,
    post: req.body.post,
    beat: req.body.beat,

    guarantors: [
      {
        name: req.body.guarantorOneName,
        home_address: req.body.guarantorOneHomeAddress,
        office_address: req.body.guarantorOneOfficeAddress,
        phone_contact: req.body.guarantorOnePhone,
        occupation: req.body.guarantorOneOccupation,
      },
      {
        name: req.body.guarantorTwoName,
        home_address: req.body.guarantorTwoHomeAddress,
        office_address: req.body.guarantorTwoOfficeAddress,
        phone_contact: req.body.guarantorTwoPhone,
        occupation: req.body.guarantorTwoOccupation,
      },
    ],
  };

  try {
    const guard = await Guard.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!guard) {
      req.flash('error', 'Guard not found');
      return res.redirect(`/guards/${guard._id}`);
    }

    req.flash('success', 'Data successfully updated');
    res.redirect(`/guards/${guard._id}`);
  } catch (error) {
    console.log(error);
    req.flash('error', 'Something went wrong');
    res.redirect(`/guards/${guard._id}`);
  }
};

//  @desc   Delete a guard's data
//  @routes  DELETE /guards/:id
//  @access  Private
exports.deleteGuardData = async (req, res) => {
  const id = req.params.id;
  try {
    const guard = await Guard.findByIdAndDelete(id);

    if (!guard) {
      req.flash('error', 'Guard not found');
      return res.redirect(`/guards/${guard._id}`);
    }

    req.flash('success', 'Data successfully deleted');
    res.redirect('/guards');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.redirect('/guards');
  }
};
