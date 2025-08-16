import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Alert
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import './FinalExamCalculator.css';

const FinalExamCalculator = () => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [result, setResult] = useState(null);
  const [messageType, setMessageType] = useState('success');
  const [neededFinalGrade, setNeededFinalGrade] = useState(null);

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('finalCalcData'));
    if (saved) {
      setCurrentGrade(saved.cg);
      setDesiredGrade(saved.dg);
      setCurrentWeight(saved.cw);
      setFinalWeight(saved.fw);
    }
  }, []);

  // Save inputs
  useEffect(() => {
    if (currentGrade || desiredGrade || currentWeight || finalWeight) {
      localStorage.setItem(
        'finalCalcData',
        JSON.stringify({
          cg: currentGrade,
          dg: desiredGrade,
          cw: currentWeight,
          fw: finalWeight,
        })
      );
    }
  }, [currentGrade, desiredGrade, currentWeight, finalWeight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cg = parseFloat(currentGrade);
    const dg = parseFloat(desiredGrade);
    const cw = parseFloat(currentWeight);
    const fw = parseFloat(finalWeight);

    if (cw + fw !== 100) {
      setResult('Los pesos deben sumar exactamente 100%');
      setMessageType('error');
      setNeededFinalGrade(null);
      return;
    }

    if (fw === 0) {
      setResult('El peso del examen final no puede ser 0%');
      setMessageType('error');
      setNeededFinalGrade(null);
      return;
    }

    const needed = (dg - (cg * cw / 100)) / (fw / 100);
    setNeededFinalGrade(needed);

    let message = '';
    if (needed < 0) {
      message = `¡Felicidades! Ya tienes la nota deseada. Necesitas: ${needed.toFixed(
        1
      )}% (puedes obtener 0% y aún así alcanzar tu meta)`;
      setMessageType('success');
    } else if (needed <= 100) {
      message = `Necesitas obtener: ${needed.toFixed(1)}% en el examen final.`;
      if (needed > 90) {
        message += ' ¡Necesitarás un excelente desempeño!';
      } else if (needed > 70) {
        message += ' Necesitarás estudiar bastante';
      } else {
        message += ' ¡Parece alcanzable!';
      }
      setMessageType(
        needed <= 70
          ? 'success'
          : needed <= 90
            ? 'warning'
            : 'error'
      );
    } else {
      message = `Necesitarías: ${needed.toFixed(
        1
      )}% en el examen final. ¡Esto es imposible de alcanzar! Considera ajustar tu meta.`;
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

  const handleRefresh = () => {
    setCurrentGrade('');
    setDesiredGrade('');
    setCurrentWeight('');
    setFinalWeight('');
    setResult(null);
    setMessageType('success');
    setNeededFinalGrade(null);
    localStorage.removeItem('finalCalcData');
  };

  // Chart data (based on inputs)
  const chartData = [
    { label: 'Actual', grade: Number(currentGrade) || 0 },
    { label: 'Final Necesario', grade: neededFinalGrade > 0 ? neededFinalGrade : 0 },
    { label: 'Meta', grade: Number(desiredGrade) || 0 },
  ];

  return (
    <Box padding="0px" sx={{ mt: 3 }}>
      <Box className="main-container">
        {/* Left (Calculator) */}
        <Box className="tool">
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h6" sx={{ fontSize: '26px' }} gutterBottom>
                ¿Cuánto Necesito para el Final?
              </Typography>
            </motion.div>

            <form onSubmit={handleSubmit} autoComplete="off">
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

              <Box className="button-box" mt={2}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" size="large" fullWidth variant="contained">
                    Calcular
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="large"
                    fullWidth
                    variant="outlined"
                    onClick={handleRefresh}
                  >
                    Refrescar
                  </Button>
                </motion.div>
              </Box>
            </form>
          </Paper>
        </Box>

        {/* Right (Result + Chart) */}
        <Box className="result">
          <AnimatePresence>
            {result && (
              <motion.div
                key={result}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Alert severity={messageType} variant="filled" sx={{ fontSize: 20, mb: 2 }}>
                  {result}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Line Chart */}
          {neededFinalGrade !== null && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  📈 Progreso hacia tu meta:
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="grade"
                      stroke="#1976d2"
                      strokeWidth={3}
                      dot={{ r: 5, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </motion.div>
          )}

          {/* How to use */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                mt: 2,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1e293b' : '#ebf8ff',
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '20px', fontWeight: 600 }} color="primary">
                ¿Cómo usar?
              </Typography>
              <Typography variant="body2" mt={1}>
                1. Ingresa tu nota actual promedio <br />
                2. Especifica la nota que quieres obtener <br />
                3. Indica qué porcentaje representan tus notas actuales <br />
                4. Indica qué porcentaje representa el examen final
              </Typography>
            </Paper>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalExamCalculator;
