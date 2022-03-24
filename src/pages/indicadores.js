import React from 'react';

const IndicadoresView = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <div className='container'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "red",
        }}
      >
        <form>
          <h1>Numero de semana</h1>
          <br />
          <input></input>
          <h1>Monto</h1>
          <br />
          <input></input>
          <h1>Campo</h1>
          <br />
          <input></input>
          <button> Registrar</button>
        </form>
      </div>
      <div className='container'
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "blue",
        }}
      >
        <form>
          <h1>Numero de semana</h1>
          <br />
          <input></input>
          <h1>Monto</h1>
          <br />
          <input></input>
          <h1>Campo</h1>
          <br />
          <input></input>
          <button> Registrar</button>
        </form>
      </div>
      <div className='container'
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "red",
        }}
      >
        <form>
          <h1>Numero de semana</h1>
          <br />
          <input></input>
          <h1>Monto</h1>
          <br />
          <input></input>
          <h1>Campo</h1>
          <br />
          <input></input>
          <button> Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default IndicadoresView;
