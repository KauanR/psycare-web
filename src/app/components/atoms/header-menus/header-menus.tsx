import { Avatar, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { MouseEvent, useState } from 'react'
import { usePerson } from 'src/app/hooks'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { useLocation, useNavigate } from 'react-router-dom'
import './header-menus.scss'

export const HeaderMenus = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { person, avatar, signOut } = usePerson()

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)
    const openMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)
    const closeMenu = () => setAnchor(null)

    const signOutHandler = () => {
        setAnchor(null)
        signOut()
        navigate('/')
        window.location.reload()
    }

    return (
        <div id='header-menus'>
            <IconButton 
                id='messages'
                className={pathname.includes('messages') ? 'active' : ''}
                onClick={() => navigate('/messages')}
            >
                <EmailIcon />
            </IconButton>

            <>
                <IconButton
                    id='profile'
                    className={pathname.includes('profile') ? 'active' : ''}
                    onClick={openMenu}
                >
                    <Avatar 
                        sx={{ height: '30px', width: '30px' }}
                        src={avatar || ''}
                    />
                </IconButton>

                <Menu
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={closeMenu}
                >
                    <MenuItem disabled>
                        <Typography variant='body2'>
                            Autenticado como <span></span>
                            <span id='username'>
                                { person?.name }
                            </span>
                        </Typography>
                    </MenuItem>

                    <Divider />

                    <MenuItem onClick={() => navigate('/profile')}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Perfil
                        </ListItemText>
                    </MenuItem>

                    <MenuItem onClick={signOutHandler}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Sair
                        </ListItemText>
                    </MenuItem>
                </Menu>
            </>
        </div>
    )
}