import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Attendance } from 'src/types'
import { MolProfessionalDisplay } from '../professional-display/professional-display'
import { usePerson, useUtils } from 'src/app/hooks'
import { MolUserDisplay } from '../user-display/user-display'
import './attendance-card.scss'

type Props = {
    attendance: Attendance
    onClick: (attendance: Attendance) => void
}

export const MolAttendanceCard = ({
    attendance,
    onClick
}: Props) => {

    const { person } = usePerson()
    const { formatCalendarHour, formatDate } = useUtils()

    return (
        <Card id='mol-attendance-card' onClick={() => onClick(attendance)}>
            <CardContent>
                { person?.type === 'user' && (
                    <MolProfessionalDisplay
                        professional={attendance.professional}
                        showLangAndRating={false}
                        size='small'
                    />
                )}

                { person?.type === 'professional' && (
                    <MolUserDisplay
                        user={attendance.user}
                        size='small'
                    />
                )}

                <Divider
                    orientation='vertical'
                    flexItem
                />

                <div id='details'>
                    <div id='calendar-hour'>
                        <Typography variant='subtitle1'>
                            Horário dos encontros:
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            {formatCalendarHour(attendance.calendarHour)}
                        </Typography>
                    </div>
                    <div id='meetings-count'>
                        <Typography variant='subtitle1'>
                            Encontros realizados:
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            {attendance.meetings?.length || 0}
                        </Typography>
                    </div>
                    <Typography id='created-at' variant='body2' color='text.secondary'>
                        Desde { formatDate(attendance.createdAt) }
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}