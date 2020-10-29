const router = require("express").Router();
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
import Admin from '../models/adminModel';
import { environment} from '../../environments/environment'

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      email,
      password: passwordHash,
      displayName,
    });
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    
      const admin = await Admin.findOne({ email });
      if (!admin)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: admin._id },'bhbvhg');
    console.log("token",token);
    res.json({
      token,
      admin: {
        id: admin._id,
        displayName: admin.displayName,
      },
    });
  } catch (err) {
    console.log('a')
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.Admin);
    res.json(deletedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const admin = await Admin.findById(verified.id);
    if (!admin) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const admin = await Admin.findById(req.admin);
  res.json({
    displayName: admin.displayName,
    id: admin._id,
  });
});
export default router;
