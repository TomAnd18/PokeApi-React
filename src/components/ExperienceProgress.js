import React, { useEffect, useState, useCallback  } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ExperienceProgress({ numero }) {
  const [progress, setProgress] = useState(0);

  function FacebookCircularProgress(props) {
    return (
      <Box sx={{ position: 'absolute' }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
          }}
          size={60}
          thickness={4}
          {...props}
          value={100}
        />
      </Box>
    );
  }

  const getPorcentaje = useCallback(() => {
    const meta = (numero * 100) / 608;
    let valor = 0;
    const intervalo = setInterval(() => {
      valor += 3;
      if (valor >= meta) {
        clearInterval(intervalo);
      }
      setProgress(valor);
    }, 50);
  }, [numero, setProgress]);


  useEffect(() => {
      getPorcentaje();
  },[numero])

  return (
    <Stack direction="row">
        <FacebookCircularProgress />
        <CircularProgress sx={{ '& circle': { color: '#308fe8' } }} size={60} thickness={5} color='primary' variant="determinate" value={progress} />
    </Stack>
  );
}
