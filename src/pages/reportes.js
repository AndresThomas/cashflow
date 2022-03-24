import React from 'react';

const ReportesView = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "red",
        }}
      >
        <button>Reporte por mes</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          backgroundColor: "blue",
        }}
      >
        <button>Reporte por categorias</button>
      </div>
    </div>
  );
};

export default ReportesView;
