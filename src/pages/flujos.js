import React, { useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const FlujoView = () => {

  const [datos, setDatos] = useState({
    tipo:'',
    categoria: "",
    descripcion: "",
    cantidad:""
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

  const state = {
    names: [],
  };
  const componentDidMount = () => {
    //modificar package.json en proxy
    //usar la url del backend
    //extraer categorias
    axios
      .get("https://api.namefake.com/")
      .then((res) => {
        console.log(res);
        state({names:res.data})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columnas = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "Descripcion",
      selector: (row) => row.descripcion,
    },
    {
      name: "Categoria",
      selector: (row) => row.categoria,
    },
    {
      name: "Sub-Categoria",
      selector: (row) => row.subCategoria,
    },
  ];
  const data = [
    {
      id: 0,
      fecha:'04/01/2021',
      descripcion:'Pago sra. Maria sol',
      clasificacion: "Nomina",
      categoria: "Directora del taller",
      subCategoria: "sub",
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
  

  return (
    <div
      style={{
        display: "block",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div className="container"
        style={{
          
          textAlign: "center",
          
          justifyContent: "center",
          alignItems: "center",
          height: "45vh",
          backgroundColor: "red",
          display: "block",
    
        }}
      >
        <DataTable
          columns={columnas}
          data={data}
          pagination
          paginationComponentOptions={paginacion}
          fixedHeader
          fixedHeaderScrollHeight="100%"
        />
      </div>
      <div className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
          backgroundColor: "blue",
        }}
      >
        <form>
        <input
  type="checkbox"
  
  name="entrada"
  value="entrada"
        
  onChange={() => handleInputChange()}
/>
          <h5>Entrada</h5>
          <input
  type="checkbox"
  name="salida"
  value="salida"
  onChange={() => handleInputChange()}
/>
          <h5>Salida</h5>
          <h5>Seleccione el tipo de flujo a registrar:</h5>
          <select className="form-control" name="clasificacion" onClick={componentDidMount}>
              {state.names.map(elemento =>( 
                <option key={elemento.name} value={elemento.name} >{elemento.name}</option>
              ))}
            </select>
            <h5>Descripcion:</h5>
            <input
              className="form-control input"
              type="text"
              name="descripcion"
              onChange={handleInputChange}
              placeholder="Descripcion"
            />
            <h5>Cantidad:</h5>
            <input
              className="form-control input"
              type="text"
              name="cantidad"
              onChange={handleInputChange}
              placeholder="Cantidad"
            />
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
        </form>
      </div>
    </div>
  );
};

export default FlujoView;
