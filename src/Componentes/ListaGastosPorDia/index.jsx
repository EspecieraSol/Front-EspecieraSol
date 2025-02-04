import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGastosMesActual, eliminaGasto} from '../../Redux/Actions';
import { fechaArg, formatMoney } from '../../Helpers';
import { AppContexto } from '../../Contexto';
import EditIcon from '@mui/icons-material/Edit';
import ModalModifGasto from '../ModalModifGasto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import './estilos.css';


function ListaGastosPorDia() {

    //estado fecha creacion remito
    const [year, setYear] = useState(''); console.log("year",year);
    const [month, setMonth] = useState(''); console.log("month",month);
    //me traigo los gastos cargados para el mes actual
    const gastosMes = useSelector(state => state.gastos);
    //estado para obtener el id del remito y pasarselo al modal
    const [gasto, setGasto] = useState({});

    const dispatch = useDispatch();
    const contexto = useContext(AppContexto);

    const handleOnChangeYear = (e) => {
        setYear(e.target.value);
    };
    const handleOnChangeMonth = (e) => {
        setMonth(e.target.value);
    };
    //cambio el estado para el modal y actualizo id
    const handleOnClickModal = (data) => {
        contexto.setModalModifGasto(true);
        setGasto(data);
    };
    //calc total gastos
    const calcTotGastos = () => {
        let tot = 0;
        gastosMes.map(g => {
            return tot += g.monto;
        });
        return tot;
    };
    //elimina un gasto
    const handleOnClickElimina = (_id) => {
        try {
            const resp = dispatch(eliminaGasto(_id));
            if (resp) {
                Swal.fire({
                    text: 'Eliminado con éxito!!',
                    icon: 'success'
                });
                dispatch(getGastosMesActual(year, month)); // Actualiza los gastos del mes actual
            } else {
                Swal.fire({
                    text: 'Algo salió mal!!',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error("Error al eliminar gasto:", error);
            Swal.fire({
                text: 'Algo salió mal!!',
                icon: 'error'
            });
        }
    }

    // Función para formatear la fecha a 'YYYY-MM-DD' para que se muestre en el input inicialmnt
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade 0 si es necesario
        //const day = ('0' + fecha.getDate()).slice(-2); // Añade 0 si es necesario
        return {
            year, 
            month
        };
    };

    //inicia la fecha actual
    useEffect(()=>{   
        setYear(obtenerFechaActual().year);
        setMonth(obtenerFechaActual().month);
    },[]);

    //trae gastos del mes actual
    useEffect(() => {        
        if (year && month) {  // Solo ejecuta si hay valores válidos
            dispatch(getGastosMesActual(year, month));
        }
    }, [dispatch, year, month]);



    return (
        <div className='cont-inputs-muestraGastos'>
            <h1>Muestra los gastos de un mes</h1>

            <div className='cont-datos-muestra-gastos'>
                {/* año */}
                <div className='cont-dato-gasto'>
                    <label className='label-año-gastos'>AÑO: </label>
                    <input
                        type='year'
                        id='year'
                        value={year}
                        onChange={(e) => { handleOnChangeYear(e) }}
                        className='input-gasto-fecha'
                    />
                </div>
                {/* mes */}
                <div className='cont-dato-gasto'>
                    <label className='label-año-gastos'>Mes: </label>
                    <select
                        id='month'
                        value={month}
                        onChange={(e) => { handleOnChangeMonth(e) }}
                        className='input-gasto-fecha'
                    >
                        <option value='01'>Enero</option>
                        <option value='02'>Febrero</option>
                        <option value='03'>Marzo</option>
                        <option value='04'>Abril</option>
                        <option value='05'>Mayo</option>
                        <option value='06'>Junio</option>
                        <option value='07'>Julio</option>
                        <option value='08'>Agosto</option>
                        <option value='09'>Septiembre</option>
                        <option value='10'>Octubre</option>
                        <option value='11'>Noviembre</option>
                        <option value='12'>Diciembre</option>
                    </select>
                </div>
            </div>

            {/* Tabla muestra gastos del mes registrados - para evitar repetir */}
            <div className='cont-tabla-muestra-gastos'>
                {
                    gastosMes.length > 0 ? (
                        <table className='client-table'>
                    <thead>
                        <tr>
                            <th style={{width: "150px"}}>Fecha creación</th>
                            <th>Descripción</th>
                            <th style={{width: "150px"}}>Monto</th>
                            <th>Edita/Elim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gastosMes?.map(g => {
                                return(
                                    <tr key={g._id}>
                                        <td>{fechaArg(g.fecha)}</td>
                                        <td>{g.descripcion}</td>
                                        <td>${formatMoney(g.monto)}</td>
                                        <td style={{ width: '50px' }}>
                                            <div style={{ display: 'flex' }} key={g._id}>
                                                <button onClick={(e) => handleOnClickModal(g)}>
                                                    <EditIcon />
                                                </button>
                                                
                                                <button
                                                    className='btn-elim-cliente'
                                                    onClick={() => { handleOnClickElimina(g._id) }}
                                                >
                                                    <DeleteForeverIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <td>TOTAL</td>
                        <td></td>
                        <td>${formatMoney(calcTotGastos())}</td>
                        <td></td>
                    </tfoot>
                </table>
                    ) : (
                        <p>No hay gastos registrados</p>
                    )
                }
            </div>
            {/* modal */}
            {
                contexto.modalModifGasto === true && (
                    <div className='cont-modal-entregaCliente'>
                        <ModalModifGasto gasto={gasto} />
                    </div>
                )
            }
        </div>
    )
}

export default ListaGastosPorDia