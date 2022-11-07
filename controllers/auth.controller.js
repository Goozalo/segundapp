import { User } from "../Schemas/user.js";
import { refreshToken } from "../utils/tokenGenerate.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ errorLogin: "Email no registrado" });

    const comparePassword = await user.compararpassword(password);
    if (!comparePassword) return res.json({ errorLogin: "Password invalid" });

    // enviar jsonwabtoken
    refreshToken(user.id, res);

    
  } catch (error) {
    console.log(error);
  }
};

export const register = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.json({ errorRegistro: "email ya registrado" });
  }

  try {
    const user = new User({ name, lastname, email, password });
    await user.save();
    res.json({ registro: true });
  } catch (error) {
    console.log(error);
  }
};

export const protegida = async (req, res) => {
  try {
    const user = await User.findById(req.id).lean();
    return res.json({ email: user.email });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ logout: true });
};

