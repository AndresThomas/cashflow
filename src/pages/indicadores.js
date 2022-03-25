import React, { Component } from "react";
import { Indicador } from "../models/indicador";
import axios from "axios";
class IndicadoresView extends Component {
  url ="https://cashflowbackend.herokuapp.com/";
  state = {
    form: {
      numeroSemana: "",
      razonSocial: "",
      monto: "",
    },
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
  postIndicador(e,t) {
    e.persist();
    const fecha = this.getDate();
    const indicador = new Indicador(
      t,
      this.state.form.numeroSemana,
      this.state.form.razonSocial,
      this.state.form.monto,
      fecha
    );
    axios
      .post(this.url+"indicadores", indicador)
      .then((response) => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",

          }}
        >
          <form onSubmit={(e) => {
            const t = "Cuentas por cobrar";
            this.postIndicador(e,t)}}>
              <h2>Cuentas por cobrar</h2>
            <label htmlFor="indicadores">No. semana</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="numeroSemana"
              onChange={this.handleChange}
            />
            <label htmlFor="indicadores">Razón social</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="razonSocial"
              onChange={this.handleChange}
            />
            <label htmlFor="indicadores">Monto</label>
            <br />
            <input
              className="form-control"
              type="number"
              name="monto"
              onChange={this.handleChange}
            />

            <br />
            <button className="form-control btn-primary ">Submit</button>
          </form>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            height: "90vh",
            
          }}
        >
          <form onSubmit={(e) => {
            const t = "Cuentas por pagar";
            this.postIndicador(e,t)}}>
              <h2>Cuentas por pagar</h2>
            <label htmlFor="indicadores">No. semana</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="numeroSemana"
              onChange={this.handleChange}
            />
            <label htmlFor="indicadores">Razón social</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="razonSocial"
              onChange={this.handleChange}
            />
            <label htmlFor="indicadores">Monto</label>
            <br />
            <input
              className="form-control"
              type="number"
              name="monto"
              onChange={this.handleChange}
            />
            
            
            <br />
            <button className="form-control btn-primary ">Submit</button>
          </form>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
            
          }}
        >
          <form onSubmit={(e) => {
            const t = "Bancos";
            this.postIndicador(e,t)}}>
              <h2>Bancos</h2>
            <label htmlFor="indicadores">No. semana</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="numeroSemana"
              onChange={this.handleChange}
            />
            <label htmlFor="indicadores">Razón social</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="razonSocial"
              onChange={this.handleChange}
            />
            <label htmlFor="indicadores">Monto</label>
            <br />
            <input
              className="form-control"
              type="number"
              name="monto"
              onChange={this.handleChange}
            />
            
            <br />
            <button className="form-control btn-primary ">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default IndicadoresView;
