import DeleteIcon from '@mui/icons-material/Delete';

function Detalle({ id_compra, id_producto, showId, producto, cantidad, precio,eliminarDetalleCompra }) {
   

    // para mostrar u copltar el detalle 
    let mg = id_compra == showId ? 'mt-0' : 'mt-[-45px]'
    return (
        <div className={`${mg}  flex  justify-center items-center px-5 py-1 my-2 text-sm bg-emerald-50 border border-green-200 rounded-xl transition-all`}>
            <div className='flex  gap-2'>
                <p className="p-1 px-4 bg-gray-500 text-white text-center">{id_producto}</p>
                <p className="p-1 px-4 bg-green-500 text-white text-center rounded-lg">{producto}</p>
                <p className="p-1 px-4 bg-blue-500 text-white text-center rounded-lg">{cantidad}</p>
                <p className="p-1 px-4 bg-red-500 text-white  text-center rounded-lg">S/. {precio}</p>
            </div>
            <DeleteIcon onClick={(e) => eliminarDetalleCompra(e,id_compra,id_producto)} className='ml-3 hover:text-gray-800' />
        </div>
    )
}

export default Detalle