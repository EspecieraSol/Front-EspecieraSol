import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReporteMesesAño, getReporteMes } from '../../Redux/Actions';
import { formatMoney } from '../../Helpers';
import Swal from 'sweetalert2';
import './estilos.css';


function ListaReportes() {
  const reporteMesesAño = useSelector(state => state.reporteMesesAño);
  const reporteMes = useSelector(state => state.reporteMes);
  const [muestraTablaMes, setMuestraTablaMes] = useState(false); 
  const [mes, setMes] = useState("");
  const [año, setAño] = useState("");
  let newReporteMes;
  const month = "";
  let meses = true;
  const dispatch = useDispatch();

  const handleOnchangeMes = (e) => {
    setMes(e.target.value);
  };

  const handleClikMostrarMes = () => {
    const dividoFecha = mes.split('-');
    const añoNumber = dividoFecha[0];
    const mesNumber = dividoFecha[1];
    if (!mes) {
      Swal.fire({
        text: "Ingrese un mes",
        icon: "error"
      });
    } else {
      dispatch(getReporteMes(mesNumber, añoNumber, (meses = false)));
      setMuestraTablaMes(true);
    }
  };

  const handleOnchangeAño = (e) => {
    setAño(e.target.value);
  };

  const handleClikMostrarAño = () => {
    if (!año) {
      Swal.fire({
        text: "Ingrese un año",
        icon: "error"
      });
    } else {
      dispatch(getReporteMesesAño(month, año, meses));
    }
  };

  const calcTotVentasBruto = (arr) => arr?.reduce((tot, mes) => tot + mes.ventas, 0);
  const calcTotGanancias = (arr) => arr?.reduce((tot, mes) => tot + mes.ganancias, 0);
  const calcTotCompras = (arr) => arr?.reduce((tot, mes) => tot + mes.compras, 0);
  const calcTotGastos = (arr) => arr?.reduce((tot, mes) => tot + mes.gastos, 0);
  const calcuTotKgs = (arr) => Math.floor(arr?.reduce((tot, mes) => tot + mes.totKgs, 0));

  const generoReporteMes = () => {
    if (!reporteMes || typeof reporteMes !== 'object') return [];

    const ventas = Array.isArray(reporteMes?.ventas) ? reporteMes.ventas : [];
    const compras = Array.isArray(reporteMes?.compras) ? reporteMes.compras : [];
    const gastos = Array.isArray(reporteMes?.gastos) ? reporteMes.gastos : [];

    const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();
    if (!mes) return [];

    const dividoFecha = mes.split('-');
    const añoNumber = parseInt(dividoFecha[0], 10);
    const mesNumber = parseInt(dividoFecha[1], 10);
    const daysInMonth = getDaysInMonth(mesNumber, añoNumber);

    const initialData = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        ventas: 0,
        compras: 0,
        gastos: 0,
        ganancias: 0,
        totKgs: 0,
    }));

    const updateData = (initialData, data, type, weightField = null, gainField = null) => {
        data.forEach(item => {
            const date = new Date(item.fecha);
            const day = date.getDate();
            if (day > 0 && day <= daysInMonth) {
                initialData[day - 1][type] += item.total || item.monto || item.totPedido || 0;

                if (weightField && item[weightField]) {
                    initialData[day - 1]['totKgs'] += item[weightField];
                }

                // Calcular ganancias de los items en cada venta
                if (gainField && Array.isArray(item[gainField])) {
                    const totalGanancia = item[gainField].reduce((acc, subItem) => {
                        const unitario = parseFloat(subItem.unitario) || 0;
                        const costo = parseFloat(subItem.costo) || 0;
                        const cantidad = parseFloat(subItem.cantidad) || 0;
                        const ganancia = (unitario - costo) * cantidad;
                        return acc + ganancia;
                    }, 0);
                    initialData[day - 1]['ganancias'] += totalGanancia;
                }
            }
        });
        return initialData;
    };

    let updatedData = updateData([...initialData], ventas, 'ventas', 'totKgs', 'items');
    updatedData = updateData([...updatedData], compras, 'compras');
    updatedData = updateData([...updatedData], gastos, 'gastos');

    return updatedData;
};

  newReporteMes = generoReporteMes(); 

  return (
    <div className='cont-reportes'>
      <h1 className='titulo-reportes'>Reportes</h1>
      {/* mes y año */}
      <div className='cont-reporte-mes'>
        <div className='cont-divLabelInput-btnMopstrar'>
          <div className='cont-label-input'>
            <label className='label-año'>Elija un mes: </label>
            <input
              type='month'
              id='mes'
              value={mes}
              onChange={handleOnchangeMes}
              placeholder='Ingrese año ejem: 2024'
              className='input-año'
            />
          </div>
          <button onClick={handleClikMostrarMes} className='btn-muestraReporte'>
            Mostrar resultados
          </button>
        </div>

        <div className='cont-divLabelInput-btnMopstrar'>
          <div className='cont-label-input'>
            <label className='label-año'>Elija un año: </label>
            <input
              type='number'
              id='año'
              value={año}
              onChange={handleOnchangeAño}
              placeholder='Ejem: 2024'
              className='input-año'
            />
          </div>
          <button onClick={handleClikMostrarAño} className='btn-muestraReporte'>
            Mostrar resultados
          </button>
        </div>
      </div>

      {/* tablas por día */}
      <h3 className='subTitulo-reportes'>Reportes mes {mes}</h3>
      {muestraTablaMes && (
        <div className='cont-tabla-reportes'>
          <table className='client-table tabla-reportes'>
            <thead className='client-table tabla-reportes'>
              <tr>
                <th>Día</th>
                <th>Kgs Vendidos</th>
                <th>Ventas</th>
                <th>Compras</th>
                <th>Ganancias</th>
                <th>Gastos</th>
              </tr>
            </thead>
            <tbody>
              {newReporteMes?.map((dayData, index) => (
                <tr key={index}>
                  <td>{dayData.day}</td>
                  <td>{dayData.totKgs.toFixed(2)}</td>
                  <td>${formatMoney(dayData.ventas)}</td>
                  <td>${formatMoney(dayData.compras)}</td>
                  <td>${formatMoney(dayData.ganancias)}</td>
                  <td>${formatMoney(dayData.gastos)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>{formatMoney(calcuTotKgs(newReporteMes))}Kgs</td>
                <td>${formatMoney(calcTotVentasBruto(newReporteMes))}</td>
                <td>${formatMoney(calcTotCompras(newReporteMes))}</td>
                <td>${formatMoney(calcTotGanancias(newReporteMes))}</td>
                <td>${formatMoney(calcTotGastos(newReporteMes))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <h3 className='subTitulo-reportes'>Reportes año {año}</h3>
      {/* tabla Año */}
      <div className='cont-tabla-reportes'>
        <table className='client-table tabla-reportes'>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Kgs Vendidos</th>
              <th>Ventas en bruto</th>
              <th>Compras</th>
              <th>Gastos</th>
              <th>Ganancia Ventas</th>
            </tr>
          </thead>
          <tbody>
            {reporteMesesAño?.map(r => (
              <tr key={r.month}>
                <td>{r.month}</td>
                <td>{r.totKgs}</td>
                <td>${formatMoney(r.ventas)}</td>
                <td>${formatMoney(r.compras)}</td>
                <td>${formatMoney(r.gastos)}</td>
                <td>${formatMoney(r.ganancias)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>{calcuTotKgs(reporteMesesAño)}Kgs</td>
              <td>${formatMoney(calcTotVentasBruto(reporteMesesAño))}</td>
              <td>${formatMoney(calcTotCompras(reporteMesesAño))}</td>
              <td>${formatMoney(calcTotGastos(reporteMesesAño))}</td>
              <td>${formatMoney(calcTotGanancias(reporteMesesAño))}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default ListaReportes;
