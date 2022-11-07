import { Link } from "../Schemas/link.js";

export const redirectLink = async (req, res) => {
  const { nanoid } = req.params;
  console.log(nanoid);
  let link = await Link.findOne({ shortLink: nanoid });
  if (!link) return res.json({ link: "vacio" });
  // res.json({link});
  res.redirect(link.link);
};
