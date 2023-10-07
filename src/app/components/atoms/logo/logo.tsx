import logoFull from 'src/assets/images/logo-full.png'
import logo from 'src/assets/images/logo-full.png'
import './logo.scss'

type Props = {
    type?: 'full' | 'icon'
}

export const AtomLogo = ({ 
    type = 'full' 
}: Props) => {
    return (
        <img 
            className='logo-atom'
            src={type === 'full' ? logoFull : logo}
            alt="Logotipo da PsyCare"
        />
    )
}