import './App.css';
import { ThemeProvider } from '@mui/material';

import Player from './controllers/Player';
import { theme } from './theme';

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Player />
      </ThemeProvider>
    </div>
  );
}
export default App;
