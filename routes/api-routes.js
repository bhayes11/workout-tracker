const router = require("express").Router();
const db = require("../models");

// router.get("/api/workouts", (req, res) => {
//     db.Workout.find()
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });
router.get("/api/config", (req, res) => {
    res.json({
        success: true,
    });
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find().then((foundWorkouts) => {
        res.json(foundWorkouts);
    })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then((newWorkout) => {
        res.json(newWorkout);
    })
        .catch(err => {
            res.json(err);
        });
});

// router.put("/api/workouts/:id", (req, res) => {
//     db.Workout.findByIdAndUpdate(req.params.id, req.body, {new: true})
//         .then((updatedWorkout) => {
//             res.json(updatedWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

router.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true }
    )
        .then((updateWorkout) => {
            res.json(updateWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7).sort({ date: -1 })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// router.post("/api/workouts", ({ body }, res) => {
//     db.Workout.create(body)
//         //.then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// router.put("/api/workouts/:id", (req, res) => {
//     db.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

module.exports = router;