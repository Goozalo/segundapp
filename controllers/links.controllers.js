import { Link } from "../Schemas/link.js";
import { nanoid } from "nanoid";

export const leerLinks = async (req, res) => {
  const allLinks = await Link.find({ uid: req.id });

  res.json({ allLinks });
};
export const singleLink = async (req, res) => {
  try {
    const { id } = req.params;
    const aLink = await Link.findById({ _id: id });
    // VALIDACION ID VALIDO
    if (!aLink) return res.json({ Error: "URLid no existe singlelink 1" });
    // VALIDACION DE URL Y USUARIO
    if (!aLink.uid.equals(req.id)) {
      return res.json({ Error: "Esta link no te pertenece PAYASO 🤡" });
    }
    res.json({ aLink });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId")
      return res.json({ Error: "URLid Incorrecta singlelink 2" });
  }
};
export const saveLink = async (req, res) => {
  let { link } = req.body;
  // Validar http en link
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = "https://" + link;
  }
  const newLink = new Link({ link, shortLink: nanoid(6), uid: req.id });
  await newLink.save();
  res.json({ saveLink: true });
};
export const updateLink = async (req, res) => {
  const { id } = req.params;
  let { link } = req.body;
  // Validar http en link
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = "https://" + link;
  }
  const updateLink = await Link.findById({ _id: id });
  // VALIDACION DE ID VALIDA
  if (!updateLink) return res.json({ Error: "URLid Incorrecta update 1" });
  // VALIDACION DE URL Y USUARIO
  if (!updateLink.uid.equals(req.id)) {
    return res.json({ Error: "Esta link no te pertenece PAYASO 🤡" });
  }
  updateLink.link = link;

  await updateLink.save();
  res.json({ updateLink });
};
export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;
    const linkDelete = await Link.findById({ _id: id });
    // VALIDACION DE ID VALIDA
    if (!linkDelete) return res.json({ Error: "URLid Incorrecta delete 1" });
    // VALIDACION DE URL Y USUARIO
    if (!linkDelete.uid.equals(req.id)) {
      return res.json({ Error: "Esta link no te pertenece PAYASO 🤡" });
    }

    linkDelete.deleteOne();
    res.json({ linkDelete });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId")
      return res.json({ Error: "URLid Incorrecta delete 2" });
  }
};
