import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { format, addDays } from 'date-fns';

function Card({ id, fecha, productos, total, funcion, eliminarCompra, btnProductoCompra }) {
    return (
        <div className='mt-3 flex justify-between p-4 w-full relative bg-white rounded-xl border border-gray-200  shadow-lg  text-[14px]/[17px] cursor-pointer transition-all 
            hover:font-bold' onClick={() => funcion(id)} >
            <div>
                <p className='text-green-800'>Fecha compra:  {(format(addDays(fecha, 1), 'dd-MM-yyyy'))}</p>
                <p className='text-blue-500'>N° productos:  {productos}</p>
                <p className='text-red-600'>Total: S/.   {total}</p>
            </div>
            <div className="text-gray-500">
                <ArrowDropDownIcon className=" hover:text-gray-900" />
                <AddIcon onClick={(e) => btnProductoCompra(e, id)} className="ml-6 hover:text-gray-900" />
                <DeleteIcon onClick={(e) => eliminarCompra(e, id)} className='ml-6 hover:text-gray-800' />
            </div>
        </div>
    )
}
export default Card