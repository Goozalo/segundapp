import jwt from "jsonwebtoken";

export const tokenGenerado = (id) => {
  const expiresIn = 60 * 15;
  try {
    const token = jwt.sign({ id }, process.env.JWT_PALABRA_CLAVE, {expiresIn});
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
