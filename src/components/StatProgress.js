import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: theme.palette.mode !== 'light' ? '#1B998B' : '#308fe8',
  },
}));



export default function StatProgress({ numero }) {
    const [porcentaje, setPorcentaje] = useState(0);

    const getPorcentaje = () => {
      const meta = (numero * 100) / 255;
      let valor = 0;
      const intervalo = setInterval(() => {
        valor += 1;
        if (valor >= meta) {
          clearInterval(intervalo);
        }
        setPorcentaje(valor);
      }, 40);
    };    

    useEffect(() => {
        getPorcentaje();
    },[numero])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={porcentaje}/>
        </Box>
    );
}

// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import LinearProgress from '@mui/material/LinearProgress';

// export default function StatProgress({ numero }) {
//     const [progress, setProgress] = useState(0);

//     const getPorcentaje = () => {
//         const calculo = (numero * 100) / 255;
//         setProgress(calculo);
//     }

//     useEffect(() => {
//         getPorcentaje();
//     }, [numero]);

//     return (
//         <Box sx={{ width: '100%'}}>
//             <LinearProgress variant="determinate" value={progress} />
//         </Box>
//     );
// }

