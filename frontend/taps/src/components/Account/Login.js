import { Button, Modal, TextField, Typography, Box } from '@mui/material'
import React from 'react'

export default function Login() {
    const handleClose = () => {}

  return (
  <Box>
    <Typography >
      Username
    </Typography>
    <TextField/>
    <Typography >
      Password
    </Typography>
    <TextField/>
    <Typography >
      Bio
    </Typography>
    <TextField/>
    <Button>Login</Button>
    <Button>Create Account</Button>
    <Button>Delete Account</Button>
    <Button>Update Account</Button>

  </Box>
  )
}
