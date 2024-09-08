import Accident from "../Model/Accident.js";
import AmbulanceDriver from "../Model/Drivers.js";
import sendEmails from "../sendMail.js";
const Post = async (req, res) => {
  try {
    const data = await Accident.create(req.body);

    if (data) {
      const res = await AmbulanceDriver.find({
        location: data.location,
      }).select("email -_id");
      const mails = res.map((i) => i.email);

      console.log("response ", mails);
      if (mails.length > 0) {
        sendEmails(mails, { place: data.location });
      }
    }
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
export default Post;
