import { User } from "../Schemas/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.json({ errorLogin: "Email no valido" });

    const comparePassword = await user.compararpassword(password);
    if (!comparePassword) return res.json({ errorLogin: "Password invalid" });

    return res.json({ LoginExitoso: true });
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

    // enviar jsonwabtoken

    return res.json({ registroExitoso: true });
  } catch (error) {
    console.log(error);
  }
};
