import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ReactNode, SetStateAction } from 'react'
import './modal.scss'

type Props = {
    value: boolean
    setValue: (value: SetStateAction<boolean>) => void
    title: string
    children: ReactNode
    showButtons?: boolean
    cancelBtnLabel?: string
    confirmBtnLabel?: string
    confirmBtnClick?: () => void
}

export const AtomModal = ({
    value,
    setValue,
    title,
    children,
    showButtons = true,
    cancelBtnLabel = 'Cancelar',
    confirmBtnClick,
    confirmBtnLabel = 'Confirmar'
}: Props) => {
    return (
        <Dialog 
            id='atom-modal'
            open={value} 
            onClose={() => setValue(false)}
        >
            <DialogTitle>
                { title }
            </DialogTitle>

            <DialogContent>
                { children }
            </DialogContent>

            { showButtons && (
                <DialogActions>
                    <Button onClick={() => setValue(false)}>
                        { cancelBtnLabel }
                    </Button>

                    <Button variant='outlined' onClick={confirmBtnClick}>
                        { confirmBtnLabel }
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    )
}