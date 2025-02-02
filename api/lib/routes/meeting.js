const router = require("express").Router();
const meetingController = require("../controllers/meeting");
const { wrapController } = require("../util/error-wrapper");

const wrapped = wrapController(meetingController);

router.get("/:_id", wrapped.get);
router.get("/", wrapped.index);
router.post("/", wrapped.create);
router.patch("/:_id", wrapped.update);
router.delete("/:_id", wrapped.delete);
router.get("/:_id/aggregate", wrapped.aggregate);
router.post("/aggregate", wrapped.aggregateSave);
router.get("/:_id/topics", wrapped.getTopics);
router.get("/:_id/participants", wrapped.getParticipants);
router.get("/:_id/actionitems", wrapped.getActionItems);
router.patch("/:_id/status", wrapped.updateStatus);

module.exports = router;
