import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetLogin, } from '../../Redux/Actions';
import { Link, useNavigate } from 'react-router-dom';
import { AppContexto } from '../../Contexto';
import { logout } from '../../LocalStorage';
import logo from '../../Imagenes/logoNuevo.jpg';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';
import './estilos.css';


const Navbar = () => {

    const [muestraMenuClientes, setMuestraMenuClientes] = useState(false); //estado menú cliente
    const [muestraMenuProductos, setMuestraMenuProductos] = useState(false); 
    const [muestraMenuProveedor, setMuestraMenuProveedor] = useState(false); 
    const [muestraMenuCompras, setMuestraMenuCompras] = useState(false); 
    const [muestraMenuVentas, setMuestraMenuVentas] = useState(false); 
    const [muestraMenuGastos, setMuestraMenuGastos] = useState(false); 
    const [muestraMenuReportes, setMuestraMenuReportes] = useState(false);
    const contexto = useContext(AppContexto);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMouseEnterCliente = () => {
        setMuestraMenuClientes(true);
    };
    const handleMouseLeaveCliente = () => {
        setMuestraMenuClientes(false);
    };
    const handleMouseEnterProd = () => {
        setMuestraMenuProductos(true);
    };
    const handleMouseLeaveProd = () => {
        setMuestraMenuProductos(false);
    };
    const handleMouseEnterProveedor = () => {
        setMuestraMenuProveedor(true);
    };
    const handleMouseLeaveProveedor = () => {
        setMuestraMenuProveedor(false);
    };
    const handleMouseEnterCompras = () => {
        setMuestraMenuCompras(true);
    };
    const handleMouseLeavecompras = () => {
        setMuestraMenuCompras(false);
    };
    const handleMouseEnterVentas = () => {
        setMuestraMenuVentas(true);
    };
    const handleMouseLeaveVentas = () => {
        setMuestraMenuVentas(false);
    };
    const handleMouseEnterGastos = () => {
        setMuestraMenuGastos(true);
    };
    const handleMouseLeaveGastos = () => {
        setMuestraMenuGastos(false);
    };
    const handleMouseEnterReportes = () => {
        setMuestraMenuReportes(true);
    };
    const handleMouseLeaveReportes = () => {
        setMuestraMenuReportes(false);
    };
    const handleLogOut = () => {
        Swal.fire({
            title: "Salir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                contexto.setUserLog(null);
                contexto.logout();
                dispatch(resetLogin());
                navigate('/')
            }
        });        
    };
    
    
    return (
        <nav className="navbar">
            <div className='cont-log-items-log'>
                {/* logo */}
                <div className='cont-izq'>
                    <Link to='/' className='cont-izq'>
                        <img src={logo} alt='' className='logo' />
                    </Link>
                </div>

                {/* items barra ADMIN*/}
                {
                    contexto.isAuthenticated ? (
                        <ul className="navbar-menu">
                            {/* clientes */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterCliente}
                                onMouseLeave={handleMouseLeaveCliente}
                            >
                                Clientes
                                {
                                    muestraMenuClientes && (
                                        <ul className="dropdown-menu">
                                            <Link to="/creaCliente" className='link-menu'>
                                                <li className="dropdown-item">Crear Cliente</li>
                                            </Link>
                                            <Link to='/clientes' className='link-menu'>
                                                <li className="dropdown-item">Listar Clientes</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                            {/* Productos */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterProd}
                                onMouseLeave={handleMouseLeaveProd}
                            >
                                Productos
                                {
                                    muestraMenuProductos && (
                                        <ul className="dropdown-menu">
                                            <Link to="/creaProducto" className='link-menu'>
                                                <li className="dropdown-item">Crear Producto</li>
                                            </Link>
                                            <Link to='/productos' className='link-menu'>
                                                <li className="dropdown-item">Listar Productos</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                            {/* Proveedores */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterProveedor}
                                onMouseLeave={handleMouseLeaveProveedor}
                            >
                                Proveedores
                                {
                                    muestraMenuProveedor && (
                                        <ul className="dropdown-menu">
                                            <Link to="/creaProveedor" className='link-menu'>
                                                <li className="dropdown-item">Crear Proveedor</li>
                                            </Link>
                                            <Link to='/proveedores' className='link-menu'>
                                                <li className="dropdown-item">Listar Proveedores</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                            {/* Compras */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterCompras}
                                onMouseLeave={handleMouseLeavecompras}
                            >
                                Compras
                                {
                                    muestraMenuCompras && (
                                        <ul className="dropdown-menu">
                                            <Link to='/creaCompra' className='link-menu'>
                                                <li className="dropdown-item">Crear Compra</li>
                                            </Link>
                                            <Link to="/creaPago" className='link-menu'>
                                                <li className="dropdown-item">Crear Pago</li>
                                            </Link>
                                            <Link to='/listaRemitosCompras' className='link-menu'>
                                                <li className="dropdown-item">Lista remitos</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                            {/* Ventas */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterVentas}
                                onMouseLeave={handleMouseLeaveVentas}
                            >
                                Ventas
                                {
                                    muestraMenuVentas && (
                                        <ul className="dropdown-menu">
                                            <Link to="/creaVenta" className='link-menu'>
                                                <li className="dropdown-item">Crear remito</li>
                                            </Link>
                                            <Link to="/creaPagoCliente" className='link-menu'>
                                                <li className="dropdown-item">Crear Pago</li>
                                            </Link>
                                            <Link to="/listaRemitosVentas" className='link-menu'>
                                                <li className="dropdown-item">Lista remitos</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                            {/* Gastos */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterGastos}
                                onMouseLeave={handleMouseLeaveGastos}
                            >
                                Gastos
                                {
                                    muestraMenuGastos && (
                                        <ul className="dropdown-menu">
                                            <Link to="/creaGastos" className='link-menu'>
                                                <li className="dropdown-item">Crear Gastos</li>
                                            </Link>
                                            <Link to="/listaGastosPorDia" className='link-menu'>
                                                <li className="dropdown-item">Lista gastos por mes</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                            {/* Reportes */}
                            <li
                                className="navbar-item"
                                onMouseEnter={handleMouseEnterReportes}
                                onMouseLeave={handleMouseLeaveReportes}
                            >
                                Reportes
                                {
                                    muestraMenuReportes && (
                                        <ul className="dropdown-menu">
                                            <Link to="/listaReportes" className='link-menu'>
                                                <li className="dropdown-item">Lista Reportes</li>
                                            </Link>
                                        </ul>
                                    )
                                }
                            </li>
                        </ul>
                    ) : (
                        <div className='cont-menu-cliente'>
                            <ul className="navbar-menu">
                                <Link to="/listaDePrecios" className='link-menu'>
                                    <li className="navbar-item-cliente">Lista Mayorista</li>
                                </Link>
                                <Link to="/ofertas" className='link-menu'>
                                    <li className="navbar-item-cliente">Lista Especial</li>
                                </Link>
                                <Link to="/quienesSomos" className='link-menu'>
                                    <li className="navbar-item-cliente quienesSomos">Quienes somos</li>
                                </Link>
                            </ul>
                        </div>
                    )
                }

                {/* login/logout */}
                {
                    !contexto.isAuthenticated ? (
                        /* login */
                        <div className='cont-der'>
                            <Link to={'/login'}>
                                <LoginIcon sx={{color:'#fff'}}/>
                            </Link>
                        </div>
                    ) : (
                        /* logout */
                        <div className='cont-der'>
                            <p className='nombre-userLog'>{contexto.nombre}</p>
                            <button onClick={() => handleLogOut()} className='btn-logout'>
                                <LogoutIcon sx={{backgroundColor:'rgb(74, 42, 42)', color:'#fff'}} />
                            </button>
                        </div>
                    )

                }
            </div>            
        </nav>
    );
};

export default Navbar;
