import React, { useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import axios from "axios";

const CategoriasView = () => {
  const state = {
    names: [],
  };

  let data = [];
  const datoTabla = async() => {
    //modificar package.json en proxy
    //usar la url del backend
    //extraer clasificaciones
    await axios
      .get("/categorias")
      .then((res) => {
        data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(data,'****');
  };

  const [datos, setDatos] = useState({
    clasificacion: "",
    categoria: "",
    subCategoria: "",
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log(
      datos.clasificacion + " " + datos.categoria + " " + datos.subCategoria
    );
  };

  

  const columnas = [
    {
      name: "Clasificacion",
      selector: (row) => row.clasificacion,
      sortable: true,
    },
    {
      name: "Categoria",
      selector: (row) => row.categoria,
    },
    {
      name: "SubCategoria",
      selector: (row) => row.subCategoria,
    },
  ];

  const paginacion = [
    {
      rowsPerPageText: "Filas por pagina",
      rangeSeparatorText: "de",
      selectAllRowsItem: true,
      selectAllRowsItemText: "Todods",
    },
  ];
  datoTabla();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div
        className="table-responsive"
        style={{
          height: "50vh",
          backgroundColor: "blue",
          alignItems: "center",
          textAlign: "center",
          display: "grid",
        }}
      >
        <DataTable
          columns={columnas}
          data={data}
          title="Lista de categorias"
          pagination
          paginationComponentOptions={paginacion}
          fixedHeader
          fixedHeaderScrollHeight="100%"
        />
      </div>

      <div
        style={{
          backgroundColor: "red",
        }}
      >
        <form className="row" onSubmit={enviarDatos}>
          <div className="col-md-10">
            <h3>Clasificacion:</h3>
            <select className="form-control" name="clasificacion" onClick={datoTabla}>
              {state.names.map(elemento =>( 
                <option key={elemento.name} value={elemento.name} >{elemento.name}</option>
              ))}
            </select>
            <h3>Categoria:</h3>{" "}
            <input
              className="form-control input"
              type="text"
              name="categoria"
              onChange={handleInputChange}
              placeholder="Categoria"
            />
            <h3>Sub-Categoria:</h3>{" "}
            <input
              className="form-control input"
              type="text"
              name="subCategoria"
              onChange={handleInputChange}
              placeholder="Sub-Categoria"
            />
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriasView;
