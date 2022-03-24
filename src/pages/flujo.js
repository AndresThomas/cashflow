import React, { Component } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Flujo } from "../models/flujo";

class FlujoView extends Component {
  state = {
    data: [], //para la tabla
    categorias: [],
    form: {
      tipo:'',
      categoria: "",
      descripcion: "",
      cantidad: "",
    },
  };
  getDatosTabla = () => {
    let unmounted = false;
    axios
      .get("/flujo")
      .then((response) => {
        console.log(response, "getDatosTabla");
        if (!unmounted) {
          this.setState({ data: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unmounted = true;
    };
  };

  getDatosCategorias = () => {
    let unmounted = false;
    axios
      .get("/categorias")
      .then((response) => {
        console.log(response, "getDatosTabla");
        if (!unmounted) {
          this.setState({ categorias: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unmounted = true;
    };
  };

  postFlujo(e) {
    e.persist();
    let fecha = new Date();
    let date = ("0"+ fecha.getDate()).slice(-2);
    let month = ("0"+(fecha.getMonth()+1)).slice(-2);
    let year = fecha.getFullYear();
    let hour = ("0"+ fecha.getHours()).slice(-2);
    let min = ("0"+ fecha.getMinutes()).slice(-2);
    let sec = fecha.getSeconds();
    fecha = year+'-'+month+'-'+date+' '+hour+':'+min+':'+sec;
    const categoria = new Flujo(
      fecha,
      this.state.form.tipo,
      this.state.form.categoria,
      this.state.form.descripcion,
      this.state.form.cantidad
    );
    axios
      .post("/flujo", categoria)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data });
        this.getDatosTabla();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = async (e) => {
    console.log(e.target, '********');

    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  componentDidMount() {
    this.getDatosTabla();
    this.getDatosCategorias();
  }

  render() {
    return (
      <div
        key="div-main"
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div
          key="div-table"
          className=" table-responsive "
          style={{
            height: "50vh",
            // backgroundColor: "blue",
            alignItems: "center",
            textAlign: "center",
            display: "grid",
          }}
        >
          <table className="table container" key="table">
            <thead key="table-head">
              <tr
                style={{ position: "sticky", top: "0px" }}
                key="table-row-head"
              >
                <th style={{ position: "sticky", top: "0px" }} key="th1">
                  Fecha
                </th>
                <th style={{ position: "sticky", top: "0px" }} key="th2">
                  Descripcion
                </th>
                <th style={{ position: "sticky", top: "0px" }} key="th3">
                  Categoria
                </th>
                <th style={{ position: "sticky", top: "0px" }} key="th4">
                  Sub-Categoria
                </th>
              </tr>
            </thead>
            <tbody key="tbdoy">
              {this.state.data.map((registro) => {
                return (
                  <tr key={registro.idFlujo}>
                    <td key={registro.id}>{registro.fecha}</td>
                    <td key={registro.id}>{registro.descripcion}</td>
                    <td key={registro.id}>{registro.categoria.categoria}</td>
                    <td key={registro.id}>{registro.categoria.subCategoria}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div
          key="div-fomr"
          className="form-group container"
          style={{
            width: "30%",
            //  backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <form key="form.key" onSubmit={(e) => this.postFlujo(e)}>
            <div className="form-check"
            >
              <input className="form-check-input"
                type="checkbox"
                name="tipo"
                value="entrada"
                id="entradaBox"
                onChange={ this.handleChange}
              />
               <label className="form-check-label" >Entrada</label><br/>
              <input className="form-check-input"
                type="checkbox"
                name="tipo"
                value="salida"
                id="salidaBox"
                onChange={this.handleChange}
              />
              <label className="form-check-label">salida</label>
            </div>
            <label className="form-check-label" >Seleccione el tipo de flujo a registrar:</label><br/>
            
            <select
              onChange={this.handleChange}
              key="select"
              name="categoria"
              className="form-control"
            ><option>Opciones</option>
              {this.state.categorias.map((elemento) => (
                <option key={elemento.idCategoria} value={elemento.idCategoria}>
                  {elemento.categoria + " - " + elemento.subCategoria}
                </option>
              ))}
            </select>
            <label className="form-check-label">Descripcion </label>
            <input
              className="form-control input"
              type="text"
              name="descripcion"
              onChange={this.handleChange}
              placeholder="Descripcion"
            />
            <label className="form-check-label" >Cantidad: </label>
            
            <input
              className="form-control input"
              type="text"
              name="cantidad"
              onChange={this.handleChange}
              placeholder="Cantidad"
            />
            <br></br>

            <button className="form-control btn-primary ">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FlujoView;
