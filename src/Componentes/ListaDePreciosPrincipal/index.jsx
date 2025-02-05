import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds } from '../../Redux/Actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import WhatsAppButton from '../BotonWhastApp';
import logo from '../../Imagenes/logoYtexto.jpg';
import { formatDate } from '../../Helpers';
import { formatMoney } from '../../Helpers';
import './estilos.css';


function ListaDePrecios() {
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    /* funcion para PDF mejor opcion */
    const handleSavePDF = () => {
        const input = document.getElementById('lista-precios');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('lista.pdf'); //nombre del archivo q se baja
        });
    };

    useEffect(() => {
        dispatch(getAllProds())
    }, [dispatch]);

    return (
        <div className='cont-padre-lista-precios'>
            <div className='cont-padre-lista-precios'>
                <div className="cont-gral-listaDePrecios" id='lista-precios'>
                    <div className='cont-secundario-listaDePrecios'>
                        <div className="linea linea-1"></div>
                        <div className="linea linea-2"></div>
                        <div className="linea linea-3"></div>
                        <div className='cont-informacion'>
                            {/* logo y datos */}
                            <div className='cont-logo-datos'>
                                <div className='cont-logo'>
                                    <img src={logo} alt='not found' className='logo-lista-precio' />
                                </div>
                                {/* fecha */}
                                <div>
                                    <p>{formatDate(new Date())}</p>
                                </div>
                            </div>
                            {/* titulo */}
                            <div className='cont-titulo-lista-precio'>
                                <h2 className='titulo-lista-precio'>LISTA DE PRECIOS MAYORISTA</h2>
                            </div>
                            {/* tabla */}
                            <div className='cont-tabla-listaPrecio'>
                                <table className='tabla-precios'>
                                    <thead>
                                        <tr>
                                            <th><p className='Descripcion'>Descripción</p></th>
                                            <th>Precio (x Kg)</th>
                                            <th>Envase (Kg)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productos?.map((p, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{p.nombre}</td>
                                                        <td style={{ textAlign: 'center' }}>${formatMoney(p.precioKg)}</td>
                                                        <td style={{ textAlign: 'center' }}>{p.envase}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* botón imprimir */}
            <button onClick={handleSavePDF} className='boton-imprimir'>Descargar</button>
            {/* Botón WhatsApp */}
            <WhatsAppButton />
        </div>
    )
}

export default ListaDePrecios