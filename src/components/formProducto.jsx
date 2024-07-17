import React, { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

function FormProducto({ idCompra, cerrarFormulario, registrarProductoCompra, estadoForm }) {
    const [estado, setEstado] = useState(estadoForm);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [mostrarMensaje, setMostrarMensaje] = useState(false); // Estado para controlar el mensaje

    useEffect(() => {
        setEstado(estadoForm);
        setNombre('')
        setCantidad('')
        setPrecio('')
    }, [estadoForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre === '' || cantidad === '' || precio === '') {
            setMostrarMensaje(true); // Mostrar el mensaje de llenar todos los campos
            setTimeout(() => {
                setMostrarMensaje(false); // Ocultar el mensaje después de 2 segundos
            }, 2000);
        } else {
            registrarProductoCompra(idCompra, { nombre, cantidad, precio });
            cerrarFormulario();
        }
    };

    return (
        <>
            {estado && (
                <div className="fixed bg-black bg-opacity-50 w-full h-full top-0 left-0 z-10 flex justify-center text-lg">
                    <form 
                        className="w-10/12 md:w-2/4 h-2/4 bg-white px-5 rounded-lg mt-5 flex flex-col justify-around items-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-row justify-between w-full">
                            <span></span>
                            <h2 className="font-bold text-[22px]">Registrar producto</h2>
                            <ClearIcon 
                                className="hover:text-gray-600 cursor-pointer" 
                                onClick={() => cerrarFormulario()} 
                            />
                        </div>

                        <div className="flex">
                            <label className='block w-1/3' htmlFor="nombre">Nombre</label>
                            <input 
                                className='border w-3/4' 
                                type="text" 
                                id="nombre" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label className='block w-1/3' htmlFor="cantidad">Cantidad</label>
                            <input 
                                className='border w-3/4' 
                                type="text" 
                                id="cantidad" 
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </div>
                        <div className="flex">
                            <label className='block w-1/3' htmlFor="precio">Precio</label>
                            <input 
                                className='border w-3/4' 
                                type="number" 
                                id="precio" 
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </div>
                        {mostrarMensaje && <label className="text-red-500">Llenar todos los campos</label>}
                        <button 
                            className='mt-4 p-2 text-white bg-green-600 rounded-lg cursor-pointer hover:bg-green-700 w-3/4'
                            type="submit"
                        >
                            Registrar producto
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default FormProducto;
