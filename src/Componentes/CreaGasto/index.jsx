import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { creaGasto, getGastosMesActual} from '../../Redux/Actions';
import { fechaArg } from '../../Helpers';
import './estilos.css';

function CreaGasto() {

    //manejo de las fechas
    let fechaActual = new Date(); 
    // Convertir a la zona horaria UTC y al formato ISO
    let utcFecha = fechaActual.toISOString(); 
    let separofecha;
    let year;
    let month;
    fechaActual = fechaArg(utcFecha); 
    separofecha = fechaActual.split('/');
    year = separofecha[2]; 
    month = separofecha[1]; 
    //--------------------
    //estado fecha creacion remito
    const [fechaCreacion, setFechaCreacion] = useState('');
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState();
    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const validaInputs = () => {
        const errors = {};

        if(!descripcion) { errors.descripcion = "Descrip es requerida" }
        if(!monto || monto === 0) { errors.monto = "Monto es requerido" }
        setError(errors);

        return Object.keys(errors).length === 0;
    };
    const handleOnChangeFechaCreacion = (e) => {
        setFechaCreacion(e.target.value);
    };
    const handleOnChangeDescripcion = (e) => {
        const {id,value } = e.target;
        setDescripcion(value);

        //quito error del input
        if(value){
            const errors = {...error};
            delete errors[id];
            setError(errors);
        }
    };
    const handleOnChangeMonto = (e) => {
        const {id,value } = e.target;
        setMonto(value);

        //quito error del input
        if(value){
            const errors = {...error};
            delete errors[id];
            setError(errors);
        }
    };
    
    const handleSub = (e) => {
        e.preventDefault();
        if(validaInputs()){
            const data = {
                fecha: fechaArg(fechaCreacion),
                descripcion,
                monto,
            }
            dispatch(creaGasto(data));
            setDescripcion("");
            setMonto(0);
            dispatch(getGastosMesActual(year, month));
        }
    };
    
    // Función para formatear la fecha a 'YYYY-MM-DD' para que se muestre en el input inicialmnt
    const obtenerFechaActual = () => {
        const fecha = new Date();
        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade 0 si es necesario
        const day = ('0' + fecha.getDate()).slice(-2); // Añade 0 si es necesario
        return `${year}-${month}-${day}`;
    };

    //inicia la fecha actual
    useEffect(()=>{        
        setFechaCreacion(obtenerFechaActual());
    },[dispatch]);


    return (
        <div className='cont-gastos'>
            <h1>Crea gasto y muestra los gastos del mes actual</h1>
            <form onSubmit={(e) => { handleSub(e) }} className='cont-form-creaGasto'>
                <div className='cont-inputs-gasto'>
                    {/* fecha */}
                    <div className='cont-dato-gasto'>
                        <label className='label-cuit-remito'>Fecha: </label>
                        <input
                            type='date'
                            id='fechaCreacionRemito'
                            value={fechaCreacion}
                            onChange={(e) => { handleOnChangeFechaCreacion(e) }}
                            className='input-gasto-fecha'
                        />
                    </div>
                    {/* descripción gasto */}
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese descripción del gasto:</label>
                        <input
                            type='text'
                            id='descripcion'
                            value={descripcion}
                            onChange={(e) => handleOnChangeDescripcion(e)}
                            className='input-gasto-descripcion'
                        />
                        {error.descripcion && (<p className="error">{error.descripcion}</p>)}
                    </div>
                    {/* monto gasto */}
                    <div className='cont-dato-gasto'>
                        <label className='label-gasto'>Ingrese monto del gasto:</label>
                        <input
                            type='number'
                            id='monto'
                            value={monto}
                            min={1}
                            onChange={(e) => handleOnChangeMonto(e)}
                            className='input-gasto-monto'
                        />
                        {error.monto && (<p className="error">{error.monto}</p>)}
                    </div>

                    <button type='onSubmit' className='btn-creaGasto'>Crear gasto</button>
                </div>
            </form>
        </div>
    )
}

export default CreaGasto