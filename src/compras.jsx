import { useEffect, useState } from "react";
import Card from "./components/card";
import Detalle from "./components/detalleCompra";
import MensajeEstado from "./components/mensajeEstado"
import FormProducto from "./components/formProducto"

function Compras() {
    const [compras, setCompras] = useState([])
    const [error, setError] = useState(null)
    const [showId, setShowId] = useState(false)
    const [accionRealizada, setAccionRealizada] = useState('');
    const [idRegistroCompraProducto, setIdRegistroCompraProducto] = useState([null,false]);
    const [carga,SetCarga]=useState(false)
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(() => {
        getCompras();
    }, []);

    // obtener lista de compras 
    const getCompras = async () => {
        try {
            SetCarga(true)
            const response = await fetch(`${apiUrl}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCompras(data);
            setError(null)
            SetCarga(false)
        } catch (err) {
            showError(err)
        }
    };

    // registrar nueva compra
    const registrarCompra = async () => {
        try {
            SetCarga(true)
            const response = await fetch(`${apiUrl}/compras`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setAccionRealizada('store')
            SetCarga(false)
            getCompras()
        } catch (err) {
            showError(err)
        }
    };

    // registrar nueva compra
    const btnProductoCompra = async (e, idCompra) => {
        e.stopPropagation()
        setIdRegistroCompraProducto([idCompra, true])
    };

    const cerrarFormulario = () => {
        setIdRegistroCompraProducto([null, false]);
    };

    // registrar nueva compra
    const registrarProductoCompra = async (idCompra, producto) => {
        try {
            SetCarga(true)
            const response = await fetch(`${apiUrl}/compras/${idCompra}/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setAccionRealizada('store_producto')
            getCompras()
        } catch (err) {
            showError(err)
        }
    };

    // Función para eliminar una compra
    const eliminarCompra = async (e, id) => {
        e.stopPropagation()
        const confirmacion = window.confirm('¿Estás seguro que deseas eliminar la compra?');
        if (confirmacion) {
            try {
                SetCarga(true)
                const response = await fetch(`${apiUrl}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setAccionRealizada('delete')
                SetCarga(false)
                getCompras()
            } catch (err) {
                showError(err)
            }
        }
    };

    // Función para eliminar pocuto de una compra
    const eliminarDetalleCompra = async (e, id_compra, id_producto) => {
        e.stopPropagation()
        console.log(id_compra, id_producto)
        const confirmacion = window.confirm('¿Estás seguro que deseas eliminar la compra?');
        if (confirmacion) {
            try {
                SetCarga(true)
                const response = await fetch(`${apiUrl}/compra/${id_compra}/producto/${id_producto}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setAccionRealizada('delete_producto')
                SetCarga(false)
                getCompras()
            } catch (err) {
                showError(err)
            }
        }
    };

    function changeState(id) {
        if (id == showId) {
            setShowId(false)
        }
        else {
            setShowId(id)
        }
    }

    function showError(err) {
        setError(`Error: ${err}`)
        setTimeout(() =>
            setError(null)
            , 2000)
    }

    return (
        <div className='p-4'>
            <MensajeEstado accion={accionRealizada} 
                            trigger={compras} 
                            />
                            
            <button className='mt-4 p-2 text-white bg-blue-600 rounded-lg cursor:pointer hover:bg-blue-700 '
                    onClick={registrarCompra}>
                    Registrar nueva compra
            </button> 
            {
                carga &&(
                    <span className="ml-3 bg-red-600 p-1 rounded-sm text-white">Cargando...</span>
                )
            }
            <FormProducto idCompra={idRegistroCompraProducto[0]}
                    cerrarFormulario={cerrarFormulario}
                    registrarProductoCompra={(idCompra,producto) => registrarProductoCompra(idCompra,producto)}
                    estadoForm={idRegistroCompraProducto[1]}/>
                    
            {error ? (
                <p>{error}</p>
            ) : (

                compras.map(compra => (
                    <>
                        <Card key={compra._id}
                            id={compra._id}
                            fecha={compra.fecha}
                            productos={compra.numProductos}
                            total={compra.total}
                            funcion={(id) => changeState(id)}
                            eliminarCompra={(e, id) => eliminarCompra(e, id)}
                            btnProductoCompra={(e, id, producto) => btnProductoCompra(e, id, producto)} />
                        {
                            compra.productos.length > 0 && (
                                compra.productos.map(producto => (
                                    <>
                                        <Detalle key={producto.id}
                                            className='hidden'
                                            id_compra={compra._id}
                                            id_producto={producto.id}
                                            producto={producto.nombre}
                                            cantidad={producto.cantidad}
                                            precio={producto.precio}
                                            showId={showId}
                                            eliminarDetalleCompra={(e, id_compra, id_producto) => eliminarDetalleCompra(e, id_compra, id_producto)} />
                                    </>
                                ))
                            )
                        }
                    </>
                ))
            )}
        </div>
    )
}

export default Compras;