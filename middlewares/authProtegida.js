import jwt from "jsonwebtoken";
import { tokenGenerado } from "../utils/tokenGenerate.js";

export const rutaProtegida = (req, res, next) => {
  try {
    const refreshTokenWeb = req.cookies.refreshToken;
    if (!refreshTokenWeb) throw new Error("Introduce una llave");
    var { id } = jwt.verify(refreshTokenWeb, process.env.JWT_REFRESH);
    const { token } = tokenGenerado(id);
    var { id } = jwt.verify(token, process.env.JWT_PALABRA_CLAVE);
    req.id = id;
    next();
  } catch (error) {
    console.log(error.message);

    const tokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es válida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no válido",
      "No Bearer": "Utiliza formato Bearer",
      "jwt must be provided": "Introduce un token valido",
    };

    res.json({ error: tokenVerificationErrors[error.message] });
  }
};

// import jwt from "jsonwebtoken";
// export const rutaProtegida = (req, res, next) => {
//   let token = req.headers.authorization;
//   try {
//     if (!token) throw new Error("Introduce una llave");
//     token = token.split(" ")[1];
//     const { id } = jwt.verify(token, process.env.JWT_PALABRA_CLAVE);
//     req.id = id;

//     next();
//   } catch (error) {
//     console.log(error.message);

//     const tokenVerificationErrors = {
//       "invalid signature": "La firma del JWT no es válida",
//       "jwt expired": "JWT expirado",
//       "invalid token": "Token no válido",
//       "No Bearer": "Utiliza formato Bearer",
//       "jwt must be provided": "Introduce un token valido",
//     };

//     res.json({ error: tokenVerificationErrors[error.message] });
//   }
// };
