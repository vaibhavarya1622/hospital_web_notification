import React,{useState,Fragment,useRef} from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
//Mui stuff
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from './input'
import {makeStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles((theme) => ({
    root:{
        textDecoration:'None',
        width:'36ch'
    },
    colorPrimary: {
      color: 'white',
    },
  }));

const Notifications=(props)=>{
    const classes=useStyles()
    const anchorRef=useRef(null)
    const [open,setOpen]=useState(false)
    const handleOpen=(event)=>{
        setOpen(!open)
    }
    const handleClose=(event)=>{
        setOpen(false)
    }
    dayjs.extend(relativeTime)
    const notifications=Input;
    let notificationsIcons;
    if(notifications && notifications.length>0){
        notifications.filter(not=>not.read===false).length>0
        ?(notificationsIcons=(
            <Badge badgeContent={notifications.filter((not)=>not.read===false).length}
            color='secondary'>
                <NotificationsIcon className={classes.colorPrimary} />
            </Badge>
        ))
        :(
            notificationsIcons=<NotificationsIcon />
        )
    }
    else{
        notificationsIcons=<NotificationsIcon />
    }
    const notificationsMarkup=notifications && notifications.length>0?(
        notifications.map((not)=>{
            const time=dayjs(not.createAt).fromNow()
            const iconColor=!not.read?'primary':'secondary'
            return(
                <ListItem button={true} divider={true} alignItems='flex-start' 
                selected={!not.read?true:false} style={{margin:'10px 0px'}}>
                    <ListItemText
                    secondary={
                            <Typography
                            color='textPrimary'
                            to=''
                            >
                                {not.sender} booked the ride {time}
                            </Typography>
                    } />
                </ListItem>
            )
        })
    ):(
        <MenuItem onClick={handleClose}>
            You have no notification yet
        </MenuItem>
    )
    return (
        <Fragment>
            <Tooltip placement='top' title='Notifications'>
                <IconButton
                ref={anchorRef}
                aria-haspopup="true"
                aria-controls={open?'menu-list-grow':undefined}
                onClick={handleOpen}
                >
                    {notificationsIcons}
                </IconButton>
            </Tooltip>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement='bottom-end' transition disablePortal>
                {({transitionProps})=>(
                    <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <List className={classes.root} id='menu-list-grow' component='ul'>
                            <ListItem>
                                <ListItemText
                                primary='Notifications'
                                />
                            </ListItem>
                            {notificationsMarkup}
                        </List>
                    </ClickAwayListener>
                    </Paper>
                )}        
          </Popper>

        </Fragment>
    )
}
export default Notifications

