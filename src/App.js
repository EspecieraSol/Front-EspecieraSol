
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './Contexto';
import Navbar from './Componentes/Navbar';
import Home from './Pages/Home';
import Remito from './Componentes/Remito';
import CreaCliente from './Pages/CreaCliente';
import ListaClientesPage from './Pages/ListaClientes';
import CreaProducto from './Pages/CreaProducto';
import ListaProductosPage from './Pages/ListaProductos';
import CreaProveedor from './Pages/CreaProveedor';
import LoginPage from './Pages/Login';
import CreaRemitoVentaPage from './Pages/CreaRemitoVenta';
import ListaRemitosComprasPage from './Pages/ListaRemitosCompras';
import ListaRemitosClientePage from './Pages/ListaRemitosClientePage';
import DetalleRemitoPage from './Pages/DetalleRemitoPage';
import DetalleRemitoCompraPage from './Pages/DetalleRemitoCompraPage';
import EditaRemitoPage from './Pages/EditaRemito';
import CreaCompra from './Pages/CreaCompra/CreaCompra';
import CreaPagoProveedor from './Pages/CreaPagoProveedor';
import ListaProveedoresPage from './Pages/ListaProveedores';
import ListaRemitosProveedorPage from './Pages/ListaRemitosProveedor';
import EditaRemitoCompraPage from './Pages/EditaRemitoCompra';
import ListaRemitosVentas from './Pages/ListaRemitosVentas';
import CreaGastoPage from './Pages/CreaGasto';
import ListaReportesPage from './Pages/ListaReportes';
import QuienesSomosPage from './Pages/QuienesSomos';
import ListaDePreciosPage from './Pages/ListaDePrecios';
import Footbar from './Componentes/Footbar';
import ModifProducto from './Pages/ModifProducto';
import DetalleRemitoVenta from './Componentes/DetalleRemitoVenta';
import ListaDePreciosEspecialPage from './Pages/ListaDePreciosEspecial';
import CuentaCorrienteClientePage from './Pages/CuentaCorrienteClientePage';
import CreaPagoCliente from './Pages/CreaPagoCliente';
import EditaPagoRemito from './Pages/EditaPagoRemito';
import ListaGastosPorDiaPage from './Pages/ListaGastosPorDiaPage';
import './App.css';



function App() {

  return (
    <AppProvider>
      <div className="app">
        {/* navbar */}
        <header className="App-header">
          <Navbar />
        </header>

        <div className='content-wrap'>
          {/* rutas */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/creaCliente' element={<CreaCliente />} />
            <Route path='/clientes' element={<ListaClientesPage />} />
            <Route path='/creaProducto' element={<CreaProducto />} />
            <Route path='/remitosCliente/:cuit' element={<ListaRemitosClientePage />} />
            <Route path='/productos' element={<ListaProductosPage />} />
            <Route path='/modifProd/:_id' element={<ModifProducto />} />
            <Route path='/creaProveedor' element={<CreaProveedor />} />
            <Route path='/proveedores' element={<ListaProveedoresPage />} />
            <Route path='/remitosProveedor/:cuit' element={<ListaRemitosProveedorPage />} />
            <Route path='/creaVenta' element={<CreaRemitoVentaPage />} />
            <Route path='/detalleRemito/:_id' element={<DetalleRemitoPage />} />
            <Route path='/detalleRemitoVenta/:_id' element={<DetalleRemitoVenta />} />
            <Route path='/detalleRemitoCompra/:_id' element={<DetalleRemitoCompraPage />} />
            <Route path='/editaRemito/:_id' element={<EditaRemitoPage />} />
            <Route path='/creaPago' element={<CreaPagoProveedor />} />
            <Route path='/creaPagoCliente' element={<CreaPagoCliente/>} />
            <Route path='/creaCompra' element={<CreaCompra />} />
            <Route path='/listaRemitosCompras' element={<ListaRemitosComprasPage />} />
            <Route path='/editaRemitoCompra/:_id' element={<EditaRemitoCompraPage />} />
            <Route path='/listaRemitosVentas' element={<ListaRemitosVentas />} />
            <Route path='/creaGastos' element={<CreaGastoPage />} />
            <Route path='/listaGastosPorDia' element={<ListaGastosPorDiaPage/>} />
            <Route path='/listaReportes' element={<ListaReportesPage />} />
            <Route path='/listaDePrecios' element={<ListaDePreciosPage />} />
            <Route path='/quienesSomos' element={<QuienesSomosPage />} />
            <Route path='/ofertas' element={<ListaDePreciosEspecialPage/>} />
            <Route path='/cuentaCorrienteCliente/:cuit' element={<CuentaCorrienteClientePage />} />
            <Route path='/editaPagoRemito/:_id' element={<EditaPagoRemito/>} />

            {/* rutas para el desarrollador */}
            <Route path='/remito' element={<Remito />} />
          </Routes>
        </div>

        <footer>
          <Footbar />
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
