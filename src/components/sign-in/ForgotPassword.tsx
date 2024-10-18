import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({ open, handleClose }: ForgotPasswordProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
      }}
    >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          // label="Email address"
          placeholder="Email address"
          type="email"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6941C6', // Always set border color to #6941C6
              borderWidth: '2px'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6941C6', // Keep border color on hover
              borderWidth: '2px'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6941C6', // Keep border color on focus
              borderWidth: '2px'
            }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose} sx={{color: '#6941C6'}}>Cancel</Button>
        <Button variant="contained" type="submit" sx={{backgroundColor: '#6941C6'}}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
