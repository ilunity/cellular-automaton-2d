import { Container, CssBaseline } from '@mui/material';
import { CellularFrame } from '../CellularFrame';

export const App = () => {
  return (
    <Container
      maxWidth={ 'xl' }
      sx={ {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      } }
    >
      <CssBaseline />
      <CellularFrame />
    </Container>
  );
};
