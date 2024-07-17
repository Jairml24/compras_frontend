import React, { useEffect, useState } from "react";

function Mensaje({ accion, trigger}) {
    const [margin, setMargin] = useState('-60px');
    const [mensaje, setMensaje] = useState('')
    const [color, setColor] = useState('')

    useEffect(() => {
        if (accion == 'delete') {
            setMensaje('La compra se eliminó correctamente')
            setColor('red')
        }
        else if (accion == 'delete_producto') {
            setMensaje('el producto eliminó correctamente')
            setColor('red')
        }

        else if (accion == 'store') {
            setMensaje('La compra se registró correctamente')
            setColor('green')
        }

        else if (accion == 'store_producto') {
            setMensaje('Producto insertado correctamente correctamente')
            setColor('green')
        }

        if (!accion == '') {
            setMargin('0');
            setTimeout(() => {
                setMargin('-60px');
            }, 2000);
        }
    }, [trigger]);

    return (
        <div style={{marginTop:margin}} className={`-mt-${margin} bg-${color}-500 rounded-lg text-center text-white w-full p-1 transition-all h-9`}>
            {mensaje}
        </div>

    );
}

export default Mensaje;