import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, Alert, Divider } from '@mui/material';

const FinalExamCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [result, setResult] = useState(null);
  const [messageType, setMessageType] = useState('success');

  const handleSubmit = (e) => {
    e.preventDefault();

    const cg = parseFloat(currentGrade);
    const dg = parseFloat(desiredGrade);
    const cw = parseFloat(currentWeight);
    const fw = parseFloat(finalWeight);

    if (cw + fw !== 100) {
      setResult('Los pesos deben sumar exactamente 100%');
      setMessageType('error');
      return;
    }

    if (fw === 0) {
      setResult('El peso del examen final no puede ser 0%');
      setMessageType('error');
      return;
    }

    const neededFinalGrade = (dg - (cg * cw / 100)) / (fw / 100);
    let message = '';

    if (neededFinalGrade < 0) {
      message = `¡Felicidades! Ya tienes la nota deseada. Necesitas: ${neededFinalGrade.toFixed(1)}% (puedes obtener 0% y aún así alcanzar tu meta)`;
      setMessageType('success');
    } else if (neededFinalGrade <= 100) {
      message = `Necesitas obtener: ${neededFinalGrade.toFixed(1)}% en el examen final.`;
      if (neededFinalGrade > 90) {
        message += ' ¡Necesitarás un excelente desempeño!';
      } else if (neededFinalGrade > 70) {
        message += ' Necesitarás estudiar bastante';
      } else {
        message += ' ¡Parece alcanzable!';
      }
      setMessageType(neededFinalGrade <= 70 ? 'success' : neededFinalGrade <= 90 ? 'warning' : 'error');
    } else {
      message = `Necesitarías: ${neededFinalGrade.toFixed(1)}% en el examen final. ¡Esto es imposible de alcanzar! Considera ajustar tu meta.`;
      setMessageType('error');
    }

    setResult(message);
  };

  const handleWeightChange = (value) => {
    const cw = parseFloat(value);
    if (cw <= 100) {
      setCurrentWeight(value);
      setFinalWeight((100 - cw).toString());
    }
  };

  return (
    <Box sx={{  px: 2, width: '100%' }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Calculator Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              ¿Cuánto Necesito para el Final?
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nota Actual (%)"
                variant="outlined"
                type="number"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Nota Deseada (%)"
                variant="outlined"
                type="number"
                value={desiredGrade}
                onChange={(e) => setDesiredGrade(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Peso de Notas Actuales (%)"
                variant="outlined"
                type="number"
                value={currentWeight}
                onChange={(e) => handleWeightChange(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Peso del Examen Final (%)"
                variant="outlined"
                type="number"
                value={finalWeight}
                onChange={(e) => setFinalWeight(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Calcular
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Result Section */}
        <Grid item xs={12} md={5}>
          {result && (
            <Alert severity={messageType} variant="filled" sx={{ fontSize: 16 }}>
              {result}
            </Alert>
          )}

          <Box mt={3}>
            <Paper elevation={1} sx={{ p: 2, borderRadius: 2, backgroundColor: '#ebf8ff' }}>
              <Typography variant="body1" fontWeight={600} color="primary">
                ¿Cómo usar?
              </Typography>
              <Typography variant="body2" mt={1}>
                1. Ingresa tu nota actual promedio<br />
                2. Especifica la nota que quieres obtener<br />
                3. Indica qué porcentaje representan tus notas actuales<br />
                4. Indica qué porcentaje representa el examen final
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinalExamCalculator;