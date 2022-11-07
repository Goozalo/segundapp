import jwt from "jsonwebtoken";

export const tokenGenerado = (id) => {
  const expiresIn = 60 * 15;
  try {
    const token = jwt.sign({ id }, process.env.JWT_PALABRA_CLAVE, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = (id, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH);
    const cookieToken = res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "Developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};
