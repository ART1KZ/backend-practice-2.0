import express from "express";
import bodyParser from "body-parser";

const app = new express();
const port = process.env.PORT || 3000;
const parserMiddleware = bodyParser();

const db = {
  cities: [
    { id: 1, name: "Surgut" },
    { id: 2, name: "Moscow" },
    { id: 3, name: "Kazan" },
    { id: 4, name: "Tyumen" },
    { id: 5, name: "Novosibirsk" },
  ],
};

app.use(parserMiddleware);

app.listen(port, () => {
  console.log(`Начал прослушивать ${port} порт.`);
});

app.get("/", (req: Request, res: Response) => res.send("GET main page"));

app.get("/cities", (req: Request, res: Response) => {
  if (req.query.name) {
    const searchString = req.query.name.toString();
    const foundCities = db.cities.filter((obj) =>
      obj.name.includes(searchString)
    );
    return foundCities.length === 0
      ? res.status(404).json({ error: "По указанному name городов не найдено" })
      : res.json(foundCities);
  } else if (req.query.id) {
    const foundCity = db.cities.find((obj) => obj.id === +req.query.id);
    return foundCity
      ? res.json(foundCity)
      : res.status(404).json({ error: "По указанному id городов не найдено" });
  } else if (JSON.stringify(req.query) !== "{}") {
    return res
      .status(404)
      .json({ error: "Некорректные query-параметры запроса" });
  }
  return res.status(200).json(db.cities);
});

app.get("/cities/:id", (req: Request, res: Response) => {
  const foundCity = db.cities.find((obj) => obj.id === +req.params.id);
  return foundCity
    ? res.status(200).json(foundCity)
    : res.status(404).json({ error: "Некорректный URI параметр запроса" });
});

app.delete("/cities/:id", (req: Request, res: Response) => {
  const foundCity = db.cities.find((obj) => obj.id === +req.params.id);
  if (foundCity) {
    db.cities = db.cities.filter(
      (obj) => obj.id !== +req.params.id
    );
    console.log(db.cities)
    return res.sendStatus(204);
  }
  return res.status(404).json({ error: "Города с таким id не существует"});
});

app.delete("/cities", (req: Request, res: Response) => res.status(404).json({ error: "Я запрещаю вам удалять все города"}))

app.post("/cities", (req: Request, res: Response) => {
  const newCity = {
    id: +(new Date()),
    name: req.body.name
  };
  db.cities.push(newCity);
  return res.status(201).json(newCity)
})

app.put("/cities/:id", (req: Request, res: Response) => {
  const foundCity = db.cities.find((obj) => obj.id === +req.params.id);
  if(foundCity) {
    foundCity.name = req.body.name;
    console.log(db.cities)
    return res.status(201).json(foundCity)
  }
  return res.status(404).json({ error: "Города с указанным id не найдено"}) 
})