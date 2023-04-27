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
        const calculo = (numero * 100) / 255;
        return calculo;
    }

    useEffect(() => {
        getPorcentaje();
    },[numero])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={getPorcentaje()}/>
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

