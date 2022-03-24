import React, { Component } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Categoria } from "../models/categoria";

class CategoriasView extends Component {
  state = {
    data: [], //para la tabla
    clasificaciones: [],
    form: {
      clasificacion: "",
      categoria: "",
      subCategoria: "",
    },
  };
  getDatosTabla = () => {
    let unmounted = false;
    axios
      .get("/categorias")
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
  getDatosClasificacion = () => {
    let unmounted = false;
    axios
      .get("/clasificacion")
      .then((response) => {
        console.log(response, " getDatosClasificacion");
        if (!unmounted) {
          this.setState({ clasificaciones: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      unmounted = true;
    };
  };

  postCategoria(e) {
    e.persist();
    const categoria = new Categoria(
      this.state.form.clasificacion,
      this.state.form.categoria,
      this.state.form.subCategoria
    );
    axios
      .post("/categorias", categoria)
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
    this.getDatosClasificacion();
    this.getDatosTabla();
  }

  render() {
    return (
      <div
        key="div-main"
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div
          key="div-table"
          className=" table-responsive "
          style={{
            height: "50vh",
            width: "45%",
            //backgroundColor: "blue",
            alignItems: "center",
            textAlign: "center",
            display: "grid",
          }}
        >
          <table className="table" key="table">
            <thead key="table-head">
              <tr style={{position:"sticky",top:"0px"}}  key="table-row-head">
                <th style={{position:"sticky",top:"0px"}}  key="th1">Clasificacion</th>
                <th style={{position:"sticky",top:"0px"}}  key="th2">Categoria</th>
                <th style={{position:"sticky",top:"0px"}}  key="th3">Sub-Categoria</th>
              </tr>
            </thead>
            <tbody key="tbdoy">
              {this.state.data.map((registro) => {
                return (
                  <tr key={registro.idCategoria}>
                    <td key={registro.id}>{registro.clasificacion}</td>
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
          className="form-group"
          style={{
            width: "30%",
            // backgroundColor: "red",
            alignItems: "center",
          }}
        >
          <form key="form.key" onSubmit={(e) => this.postCategoria(e)}>
            <label key="label-1" htmlFor="clasificacion">
              Clasificacion
            </label>
            <select
              onChange={this.handleChange}
              key="select"
              name="clasificacion"
              className="form-control"
            >
              {this.state.clasificaciones.map((elemento) => (
                <option
                  key={elemento.idClasificacion}
                  value={elemento.clasificacion}
                >
                  {elemento.clasificacion}{" "}
                </option>
              ))}
            </select>
            <br></br>
            <label key="label-2" htmlFor="categoria">
              Categoria
            </label>
            <input
              key="categoria-input"
              className="form-control"
              type="text"
              name="categoria"
              onChange={this.handleChange}
            ></input>
            <br></br>
            <label key="label-3" htmlFor="subcategoria">
              SubCategoria
            </label>
            <input
              key="sub-input"
              className="form-control"
              type="text"
              name="subCategoria"
              onChange={this.handleChange}
            ></input>
            <br />
            <br />

            <button className="form-control btn-primary ">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CategoriasView;
