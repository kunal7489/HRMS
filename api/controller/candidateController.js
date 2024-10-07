const candidate = require("../models/candidateModel");
const status = require("../config/status");

// Signup or Create candidate
exports.create = async (req, res) => {
    try {
        let candidateExists = await candidate.findOne({ candidate_email: req.body.candidate_email }).lean().exec();
        if (candidateExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'candidate already registered.' });
        }

        const candidateData = {
            candidate_id: req.body.candidate_id,
            candidate_first_name: req.body.candidate_first_name,
            candidate_last_name: req.body.candidate_last_name,
            candidate_mobile: req.body.candidate_mobile,
            candidate_alternate_mobile: req.body.candidate_alternate_mobile,
            candidate_email: req.body.candidate_email,
            candidate_skype: req.body.candidate_skype,
            candidate_linkedIn_profile: req.body.candidate_linkedIn_profile,
            candidate_skills: req.body.candidate_skills,
            candidate_experience: req.body.candidate_experience,
            candidate_expected_salary: req.body.candidate_expected_salary,
            candidate_expected_joining_date: req.body.candidate_expected_joining_date,
            candidate_marrital_status:req.body.candidate_marrital_status,
            interview_rounds: req.body.interview_rounds,
            candidate_selection_status: req.body.candidate_selection_status,
            candidate_feedback:req.body.candidate_feedback,
            source_of_candidate:req.body.source_of_candidate,
            candidate_address: req.body.candidate_address,
            candidate_document_proof:req.body.candidate_document_proof,
            tenth_percentage: req.body.tenth_percentage,
            twelfth_percentage:req.body.twelfth_percentage,
            graduationPercentage:req.body.graduationPercentage,
            postGraduationPercentage:req.body.postGraduationPercentage,
            profile:req.body.profile,
        };

        const newcandidate = new candidate(candidateData);
        let result = await newcandidate.save();
        res.json({ success: true, status: status.OK, msg: 'New candidate added successfully.' });

    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save candidate failed.' });
    }
};

// Get All candidates
exports.getcandidates = async (req, res) => {
    try {
        const data = await candidate.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("The Error is " + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get candidates failed.' });
    }
};

// Update candidate updateCandidate
exports.updateCandidate = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    try {
        let result = await candidate.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'candidate is updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'candidate Id not found' });
        }
    } catch (err) {
        console.log("The error is" + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update candidate failed.' });
    }
};

// Get candidate By ID
exports.getCandidateById = async (req, res) => {
    try {
        let candidateId = req.query._id;
        if (candidateId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await candidate.findOne({ _id: candidateId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get candidate failed.' });
    }
};

// Delete candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const ID = req.query._id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await candidate.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'candidate is deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'candidate Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidate data failed.' });
    }
};

// Multi Delete candidates
// exports.multiDeletecandidates = async (req, res) => {
//     try {
//         const ids = req.body.ids;
//         if (!ids || ids.length === 0) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
//         }
//         await candidate.deleteMany({ _id: { $in: ids } }).lean().exec();
//         res.json({ success: true, status: status.OK, msg: 'candidates are deleted successfully.' });
//     } catch (err) {
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidates failed.' });
//     }
// };

exports.multiDeletecandidates = async (req, res) => {
    console.log("Request received for multi-delete", req.body);
    try {
        const ids = req.body.ids;
        if (!ids || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
        }
        await candidate.deleteMany({ _id: { $in: ids } }).lean().exec();
        res.json({ success: true, status: status.OK, msg: 'Candidates deleted successfully.' });
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidates failed.' });
    }
};


// Search candidates
exports.searchCandidates = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const searchTerms = query.split(',').map(term => term.trim());

        const searchQuery = {
            $or: [
                { candidate_first_name: { $regex: new RegExp(query, "i") } },
                { candidate_last_name: { $regex: new RegExp(query, "i") } },
                { candidate_email: { $regex: new RegExp(query, "i") } },
                { candidate_city: { $regex: new RegExp(query, "i") } },
                { candidate_state: { $regex: new RegExp(query, "i") } }
            ]
        };

        searchTerms.forEach(term => {
            searchQuery.$or.push({
                candidate_skills: { $regex: new RegExp(term, "i") }
            });
        });

        const results = await candidate.find(searchQuery);
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
};





