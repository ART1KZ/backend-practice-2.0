import express from "express";

const app = new express();
const port = 3000;

const db = {
  cities: [
    { id: 1, name: "Surgut" },
    { id: 2, name: "Moscow" },
    { id: 3, name: "Kazan" },
  ],
};

app.listen(port, () => {
  console.log(`Начал прослушивать ${port} порт.`);
}); // запуск приложения

app.get("/", (req, res) => res.send("GET main page"));

app.get("/cities", (req, res) => {
  if (req.query.name) {
    // проверка на наличие query параметра name
    const searchString = req.query.name.toString(); // присвоение переменной значения query параметра name (строка)
    const findedCity = db.cities.filter(
      (obj) => obj.name.indexOf(searchString) > -1
    ); // поиск города по query параметру name
    if (findedCity.length !== 0) {
      // проверка, найден ли город по query параметру
      res.status(200).json(findedCity);
    }
    res.sendStatus(404);
  } else if (req.query.id) {
    // проверка на наличие query параметра id
    const findedCity = db.cities.filter((obj) => obj.id === +req.query.id);
    if (findedCity.length !== 0) {
      // проверка, найден ли город по query параметру
      res.status(200).json(findedCity);
    }
    res.sendStatus(404);
  }

  res.send(db.cities); // передаем в ответ все города, если нет нужных query параметров
}); // запрос на получение всех городов или конкретного города по query параметрам

app.get("/cities/:id", (req, res) => {
  const findCity = db.cities.find((v) => {
    // находим город по id, переданному в uri параметр
    return v.id === +req.params.id;
  });
  if (findCity) {
    // проверка, найден ли город
    res.send(findCity); // передаем в ответ найденный город
  } else {
    res.send(404); // выдаем ошибку, если город не найден
  }
}); // запрос на получение города по id, переданному в uri параметре

app.delete("/cities/:id", (req, res) => {
  const findCity = db.cities.filter((obj) => obj.id === +req.params.id)[0]; // поиск города по id, переданному в uri параметре

  db.cities = db.cities.filter(
    (obj) => JSON.stringify(obj) !== JSON.stringify(findCity) // удаляем найденный по id город из массива cities
  );

  res.json(findCity); // передаем в ответ удаленный город
  console.log(db.cities); // вывод в консоль текущего наполнения массива с городами
}); // запрос на удаление города по переданному id в uri параметрe