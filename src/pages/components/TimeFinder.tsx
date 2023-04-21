import * as React from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useTheme } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardHeader, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const TimeFinder = () => {
    const [timeValue, setTimeValue] = React.useState<Moment>(moment());
    const [minutesValue, setMinutesValue] = React.useState<number>(0);
    const [hoursValue, setHoursValue] = React.useState<number>(0);
    const [difference, setDifference] = React.useState<string>('before');
    const [result, setResult] = React.useState<string | null>(null);

    const theme = useTheme();
    const isNotSmall = useMediaQuery(theme.breakpoints.up('sm'));

    const handleReset = React.useCallback(() => {
        setTimeValue(moment())
        setMinutesValue(0);
        setHoursValue(0)
    }, [])

    React.useEffect(() => {
        if (difference === 'before') {
            setResult(
                moment(timeValue)
                    .subtract(hoursValue, 'hours')
                    .subtract(minutesValue, 'minutes')
                    .format("hh:mm A"))
        } else if (difference === 'after') {
            setResult(
                moment(timeValue)
                .add(hoursValue, 'hours')
                .add(minutesValue, 'minutes')
                .format("hh:mm A"))
        }
    }, [difference, hoursValue, minutesValue, timeValue])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-us">
        <Card variant="outlined" sx={isNotSmall ? { maxWidth: '35%', mt: '2%', mx: 'auto' } : { maxWidth: '90%', mt: '1%', mx: 'auto' }} >
            <CardHeader 
                avatar={<AccessTimeIcon />} 
                title="Enter time, then hours, minutes, and difference to find the resulting time"
            />
            <CardContent>
                <StaticTimePicker
                    value={timeValue}
                    onChange={(time: any) => setTimeValue(moment(time))}
                />
                <TextField
                    type="number"
                    label="Hours"
                    margin="dense"
                    fullWidth
                    value={hoursValue}
                    onChange={(ev: any) => setHoursValue(ev.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">hr</InputAdornment>,
                    }} 
                />
                <TextField
                    type="number"
                    label="Minutes"
                    margin="dense"
                    fullWidth
                    value={minutesValue}
                    onChange={(ev: any) => setMinutesValue(ev.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">min</InputAdornment>,
                    }} 
                />
                <ToggleButtonGroup
                    color="primary"
                    value={difference}
                    fullWidth
                    exclusive
                    onChange={(ev: any) => setDifference(ev.target.value)}
                >
                    <ToggleButton value="before">Before</ToggleButton>
                    <ToggleButton value="after">After</ToggleButton>
                </ToggleButtonGroup>
                <Typography variant="h5" align="center" sx={{ mt: '1em' }}>
                    {result}
                </Typography>
                <CardActions>
                    <Button 
                        variant="contained" 
                        sx={{ margin: 'auto' }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
        </LocalizationProvider>
    );
};

export default TimeFinder;