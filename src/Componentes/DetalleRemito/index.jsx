import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Remito from '../Remito';
import { getRemitoById } from '../../Redux/Actions';


function DetalleRemito() {
    const {_id} = useParams(); 
    const dispatch = useDispatch();
    const remito = useSelector(state => state.remito); 
    const cliente = useSelector(state => state.cliente); 

    useEffect(() => {
        dispatch(getRemitoById(_id));
    }, [_id, dispatch]);


    return (
        <div>            
            <Remito 
                operacion={"muestra"} 
                numUltimoRemito={remito.numRemito} 
                cliente={cliente}
                clienteExiste={true} 
                items={remito.items} 
                totPedido={remito.totPedido}
                bultos={remito.bultos} 
                transporte={remito.transporte}
            />
        </div>
    )
}

export default DetalleRemito