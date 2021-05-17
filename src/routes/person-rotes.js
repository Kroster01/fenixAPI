const { Router } = require("express");
const router = Router();
const BD = require("../config/configbd");

router.get("/celdas", async (req, res) => {
  let result;
  datos = [];
  try {
    sql = "SELECT Distinct H.CELDA AS CELDA FROM REPORT_IND_HEADCOUNT H WHERE H.LINEA = 'L. Movistar Chile' AND H.FECHA_BAJA IS NULL AND H.CELDA IS NOT NULL";
    console.log(sql);
    result = await BD.Open(sql, [], false);
    datos = [];
    console.log(JSON.stringify(result));
  } catch (error) {
    res.status(404).json({
      msj: "terminoNOK",
      data: "Error: " + JSON.stringify(error),
    });
  }
  result.rows.map((user) => {
    let userSchema = {
      CELDA: user[0],
    };
    datos.push(userSchema);
  });
  res.status(200).json({
    msj: "terminoOK",
    data: datos,
  });
});
router.get("/obtieneEmpleadosFenix", async (req, res) => {
  // TODO: parametros de entrada
  // Listada de celdas a consultar
  // fechas de inicio a fin de la consulra
  let result;
  datos = [];
  try {
    sql =
      "SELECT H.NRO_EMPLEADO AS NRO_EMPLEADO, H.NOMBRE AS NOMBRE," +
      "H.APELLIDO AS APELLIDO, H.CELDA AS CELDA " +
      "FROM REPORT_IND_HEADCOUNT H " +
      "WHERE H.LINEA = 'L. Movistar Chile' " +
      "AND H.CELDA IN ('C. DES Telefonica Agile', 'C. QA') " +
      "AND H.FECHA_BAJA IS NULL";
    console.log(sql);
    result = await BD.Open(sql, [], false);
    datos = [];
    console.log(JSON.stringify(result));
  } catch (error) {
    res.status(404).json({
      msj: "terminoNOK",
      data: "Error: " + JSON.stringify(error),
    });
  }

  result.rows.map((user) => {
    let userSchema = {
      NRO_EMPLEADO: user[0],
      NOMBRE: user[1],
      APELLIDO: user[2],
      CELDA: user[3],
    };
    datos.push(userSchema);
  });

  res.status(200).json({
    msj: "terminoOK",
    data: datos,
  });
});
router.get("/obtieneIncurridosFenix", async (req, res) => {
  let result;
  datos = [];
  try {
    sql =
      "SELECT H.NRO_EMPLEADO AS NRO_EMPLEADO, H.NOMBRE AS NOMBRE, H.APELLIDO AS APELLIDO, I.FECHA AS FECHA, I.HORAS_INCURRIDAS AS HORAS_INCURRIDAS, I.DESC_TAREA AS TAREA " +
      "FROM FENIX_REP.REPORT_IND_HEADCOUNT H, FENIX_REP.REPORT_INCURRIDO I " +
      "WHERE I.NRO_EMPLEADO = H.NRO_EMPLEADO " +
      "AND H.CENTRO = I.FACTORIA " +
      "AND H.LINEA = 'L. Movistar Chile' " +
      "AND H.CELDA IN ('C. DES Telefonica Agile', 'C. DES CEL HACINADOS', 'C. QA', 'C. DES CEL MOVISTAR CLICK', 'C. DES Movilidad')  " +
      "AND H.NRO_EMPLEADO IN (178207, 118678)  " +
      "AND H.FECHA_BAJA IS NULL  " +
      "AND I.FECHA >= '01/05/21' AND I.FECHA <='31/05/21'";
    console.log(sql);
    result = await BD.Open(sql, [], false);
    datos = [];
    console.log(JSON.stringify(result));
  } catch (error) {
    res.status(404).json({
      msj: "terminoNOK",
      data: "Error: " + JSON.stringify(error),
    });
  }

  result.rows.map((user) => {
    let userSchema = {
      NRO_EMPLEADO: user[0],
      NOMBRE: user[1],
      APELLIDO: user[2],
      FECHA: user[3],
      HORAS_INCURRIDAS: user[4],
      TAREA: user[5],
    };
    datos.push(userSchema);
  });

  res.status(200).json({
    msj: "terminoOK",
    data: datos,
  });
});
/*
//READ
router.get("/getUsers", async (req, res) => {
  sql = "select * from person where state=1";

  let result = await BD.Open(sql, [], false);
  Users = [];

  result.rows.map((user) => {
    let userSchema = {
      codu: user[0],
      username: user[1],
      firstname: user[2],
      lastname: user[3],
    };

    Users.push(userSchema);
  });

  res.json(Users);
});

//CREATE
router.post("/addUser", async (req, res) => {
  const { username, firstname, lastname } = req.body;

  sql = "insert into person(username,firstname,lastname) values (:username,:firstname,:lastname)";

  await BD.Open(sql, [username, firstname, lastname], true);

  res.status(200).json({
    username: username,
    firstname: firstname,
    lastname: lastname,
  });
});

//UPDATE
router.put("/updateUser", async (req, res) => {
  const { codu, username, firstname, lastname } = req.body;

  sql = "update person set username=:username, firstname=:firstname, lastname=:lastname where codu=:codu";

  await BD.Open(sql, [username, firstname, lastname, codu], true);

  res.status(200).json({
    codu: codu,
    username: username,
    firstname: firstname,
    lastname: lastname,
  });
});

//DELETE
router.delete("/deleteUser/:codu", async (req, res) => {
  const { codu } = req.params;

  sql = "update person set state=0 where codu=:codu";

  await BD.Open(sql, [codu], true);

  res.json({ msg: "Usuario Eliminado" });
});
*/
module.exports = router;
