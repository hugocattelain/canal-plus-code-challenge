import './App.css';
import { ThemeProvider } from '@mui/material';

import Main from './components/Main';
import { theme } from './theme';

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
  );
}
export default App;
