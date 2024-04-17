import React from "react";

function CustomModal() {
  return (
    <div
      className="modal fade bd-example-modal-xl"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* Encabezado del modal */}
          <div className="modal-header">
            <h5 className="modal-title" id="myExtraLargeModalLabel">
              Título del modal
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {/* Contenido del modal */}
          <div className="modal-body">Contenido del modal...</div>
          {/* Pie del modal */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
