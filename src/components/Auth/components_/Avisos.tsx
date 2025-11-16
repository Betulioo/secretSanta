import React, { useEffect, useState } from 'react'

interface Props {
    mensajeError: string
}
export const  Avisos:React.FC<Props> =({mensajeError})=> {
    const [textoError, setTextoError] = useState<string>('');

    useEffect(()=>{

        if(!mensajeError){
            return 
        }
    const handleError = (error:string) =>{

    switch (error) {
      case 'Password does not match':
        
      setTextoError('La contraseña no es la correcta')
        break;
    case 'Username does not exist':
        setTextoError('El usuario no existe')
      default:
        break;
    };
  };

  handleError(mensajeError)

    },[mensajeError])

  return (
    <div>
    <span className='text-red-600 text-xs'>{textoError}</span>
    </div>
  )
}
