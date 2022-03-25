import React, { Component } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Flujo } from "../models/flujo";

class FlujoView extends Component {
  url = "https://cashflowbackend.herokuapp.com/";
  state = {
    data: [], //para la tabla
    categorias: [],
    form: {
      tipo: "",
      categoria: "",
      descripcion: "",
      cantidad: "",
    },
  };
  getDatosTabla = () => {
    let unmounted = false;
    axios
      .get(this.url + "flujo")
      .then((response) => {
        // console.log(response, "getDatosTabla");
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
      .get(this.url + "categorias")
      .then((response) => {
        //console.log(response, "getDatosCategorias");
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

  getDate() {
    let fecha = new Date();
    let date = ("0" + fecha.getDate()).slice(-2);
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2);
    let year = fecha.getFullYear();
    let hour = ("0" + fecha.getHours()).slice(-2);
    let min = ("0" + fecha.getMinutes()).slice(-2);
    let sec = fecha.getSeconds();

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
  }

  postFlujo(e) {
    e.persist();
    const fecha = this.getDate();
    const flujo = new Flujo(
      fecha,
      this.state.form.tipo,
      this.state.form.categoria,
      this.state.form.descripcion,
      this.state.form.cantidad
    );
     axios
      .post(this.url + "flujo", { flujo })
      .then((response) => {
        console.log(response, " respuesta");
        this.setState({ data: response.data });
        this.getDatosTabla();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
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
          className=" table-responsive "
          style={{
            height: "50vh",
          }}
        >
          <table className="table container">
            <thead>
              <tr key="table-row-head">
                <th key="th1">Fecha</th>
                <th key="th2">Descripcion</th>
                <th key="th3">Categoria</th>
                <th key="th4">Sub-Categoria</th>
              </tr>
            </thead>
            <tbody key="tbdoy">
              {this.state.data.map((registro) => {
                return (
                  <tr key={registro.idFlujo}>
                    <td key={registro.id}>{registro.fecha}</td>
                    <td key={registro.id}>{registro.descripcion}</td>
                    <td key={registro.id}>{registro.categoria}</td>
                    <td key={registro.id}>{registro.subCategoria}</td>
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
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="tipo"
                value="entrada"
                id="entradaBox"
                onChange={this.handleChange}
              />
              <label className="form-check-label">Entrada</label>
              <br />
              <input
                className="form-check-input"
                type="checkbox"
                name="tipo"
                value="salida"
                id="salidaBox"
                onChange={this.handleChange}
              />
              <label className="form-check-label">salida</label>
            </div>
            <label className="form-check-label">
              Seleccione el tipo de flujo a registrar:
            </label>
            <br />

            <select
              onChange={this.handleChange}
              key="select"
              name="categoria"
              className="form-control"
            >
              <option>Opciones</option>
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
            <label className="form-check-label">Cantidad: </label>

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
