const csv = require('fast-csv');
const Guard = require('../models/Guard');
const escapeStringRegexp = require('escape-string-regexp');

//  @desc   Get all guards
//  @routes  GET /guards?page=1
//  @access  Private
exports.getAllGuards = async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;
  const indexPage = (page - 1) * limit;
  const totalGuards = await Guard.countDocuments();
  const pages = Math.ceil(totalGuards / limit);

  let guards;

  try {
    // Search
    if (req.query.search) {
      const { search } = req.query;

      // Escape RegExp special characters.
      const $regex = escapeStringRegexp(search);

      guards = await Guard.find({
        guard_name: { $regex, $options: 'i' },
      })
        .skip(indexPage)
        .limit(limit)
        .sort({ guard_name: 1 });

      return res.render('index', {
        guards,
        currentPage: page,
        pages,
      });
    }

    // else find all
    guards = await Guard.find()
      .skip(indexPage)
      .limit(limit)
      .sort({ guard_name: 1 });

    return res.render('index', {
      guards,
      currentPage: page,
      pages,
    });
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/auth/login');
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

    return res.render('show', {
      guard,
    });
  } catch (error) {
    req.flash('error', 'Guard not found');
    return res.redirect('/guards');
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
    return res.redirect('/guards');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/guards');
  }
};

//  @desc   Add new guards via csv
//  @routes  POST /guards/csv/upload
//  @access  Private
exports.registerGuardsWithCSV = async (req, res) => {
  if (!req.file) {
    req.flash('error', 'Please upload a file');
    return res.redirect('/guards/new');
  }

  try {
    const guardsFile = req.file;

    const guards = [];

    const options = {
      headers: [
        'name',
        'permanentHomeAddress',
        'presentHomeAddress',
        'dateOfBirth',
        'stateOfOrigin',
        'phoneNumber',
        'nextOfKin',
        'nextOfKinPhone',
        'beat',
        'dateOfDeployment',
        'guarantorOneName',
        'guarantorOneHomeAddress',
        'guarantorOneOfficeAddress',
        'guarantorOnePhone',
        'guarantorOneOccupation',
        'guarantorTwoName',
        'guarantorTwoHomeAddress',
        'guarantorTwoOfficeAddress',
        'guarantorTwoPhone',
        'guarantorTwoOccupation',
      ],
      renameHeaders: true,
      discardUnmappedColumns: true,
      quote: null,
      ignoreEmpty: true,
      trim: true,
    };

    const CSV_STRING = guardsFile.buffer.toString();

    const stream = csv
      .parse(options)
      .on('error', function (error) {
        throw error;
      })
      .on('data', (guardStream) => {
        const guardObject = guardStream;
        guards.push(guardObject);
      })
      .on('end', async () => {
        const totalProcessCounter = guards.length;
        let currentProcessCount = 0;

        // forEach starts here
        for (const guardData of guards) {
          try {
            const guard = new Guard({
              guard_name: guardData.name,
              permanent_home_address: guardData.permanentHomeAddress,
              present_home_address: guardData.presentHomeAddress,
              phone_number: guardData.phoneNumber,
              date_of_birth: guardData.dateOfBirth,
              state_of_origin: guardData.stateOfOrigin,
              next_of_kin: guardData.nextOfKin,
              next_of_kin_phone_number: guardData.nextOfKinPhone,
              date_of_deployment: guardData.dateOfDeployment,
              post: guardData.post,
              beat: guardData.beat,
            });
            guard.guarantors = [
              {
                name: guardData.guarantorOneName,
                home_address: guardData.guarantorOneHomeAddress,
                office_address: guardData.guarantorOneOfficeAddress,
                phone_contact: guardData.guarantorOnePhone,
                occupation: guardData.guarantorOneOccupation,
              },
              {
                name: guardData.guarantorTwoName,
                home_address: guardData.guarantorTwoHomeAddress,
                office_address: guardData.guarantorTwoOfficeAddress,
                phone_contact: guardData.guarantorTwoPhone,
                occupation: guardData.guarantorTwoOccupation,
              },
            ];

            await guard.save();

            ++currentProcessCount;

            if (totalProcessCounter === currentProcessCount) {
              req.flash('success', 'File uploaded successfully.');
              return res.redirect('/guards');
            }
          } catch (err) {
            // Mongoose validation error
            if (err.name === 'ValidationError') {
              const message = Object.values(err.errors).map(
                (value) => value.message
              );
              req.flash('error', message);
              return res.redirect('/guards/new');
            }

            req.flash('error', 'Something went wrong.');
            return res.redirect('/guards/new');
          }
        }
        // forEach ends here
      });
    stream.write(CSV_STRING);
    stream.end();
  } catch (err) {
    if (err.message === 'File too large') {
      req.flash('error', 'Please upload a file less than 1MB.');
      return res.redirect('/guards/new');
    }
    // else
    req.flash('error', 'Something went wrong.');
    return res.redirect('/guards/new');
  }

  return null;
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

    return res.render('edit', {
      guard,
    });
  } catch (error) {
    req.flash('error', 'Guard not found');
    return res.redirect('/guards');
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
    return res.redirect(`/guards/${guard._id}`);
  } catch (error) {
    req.flash('error', 'Guard not found');
    return res.redirect(`/guards/${guard._id}`);
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
    return res.redirect('/guards');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    return res.redirect('/guards');
  }
};
