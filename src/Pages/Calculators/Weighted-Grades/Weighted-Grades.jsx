import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Material UI Components & Icons
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

const WeightedGrades = () => {
  const [rows, setRows] = useState([{ subject: "", grade: "", credits: "" }]);
  const [weightedAverage, setWeightedAverage] = useState(null);

  const addRow = () =>
    setRows([...rows, { subject: "", grade: "", credits: "" }]);

  const removeRow = (index) =>
    setRows(rows.filter((_, i) => i !== index));

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const calculateWeightedAverage = () => {
    let totalWeighted = 0;
    let totalCredits = 0;

    rows.forEach((row) => {
      const grade = parseFloat(row.grade);
      const credits = parseFloat(row.credits);
      if (!isNaN(grade) && !isNaN(credits)) {
        totalWeighted += grade * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits === 0) return setWeightedAverage(null);
    const result = totalWeighted / totalCredits;
    setWeightedAverage(result.toFixed(2));
  };

  const clearAll = () => {
    setRows([{ subject: "", grade: "", credits: "" }]);
    setWeightedAverage(null);
  };

  const getDescription = (val) => {
    if (val >= 6.5) return "Excelente";
    if (val >= 6.0) return "Muy Bueno";
    if (val >= 5.5) return "Bueno";
    if (val >= 5.0) return "Aceptable";
    if (val >= 4.0) return "Aprobado";
    return "Reprobado";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        maxWidth: 1200,
        margin: "auto",
        p: 2,
      }}
    >
      {/* Left Side - Tool */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <CalculateIcon sx={{ mr: 1 }} /> Weighted Grades
        </Typography>

        <Paper
          elevation={3}
          sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
        >
          <InfoIcon color="info" sx={{ mr: 1 }} />
          <Typography variant="body2">
            Calculate your weighted average considering different credits or
            weights for each subject.
          </Typography>
        </Paper>

        {rows.map((row, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 1,
              }}
            >
              <TextField
                placeholder="Subject"
                value={row.subject}
                onChange={(e) =>
                  handleChange(index, "subject", e.target.value)
                }
                fullWidth
              />
              <TextField
                placeholder="Grade (1.0-7.0)"
                type="number"
                inputProps={{ step: 0.1, min: 1, max: 7 }}
                value={row.grade}
                onChange={(e) =>
                  handleChange(index, "grade", e.target.value)
                }
                sx={{ width: 120 }}
              />
              <TextField
                placeholder="Credits/Weight"
                type="number"
                inputProps={{ step: 1, min: 1 }}
                value={row.credits}
                onChange={(e) =>
                  handleChange(index, "credits", e.target.value)
                }
                sx={{ width: 120 }}
              />
              {index > 0 && (
                <IconButton color="error" onClick={() => removeRow(index)}>
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          </motion.div>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={addRow}
          sx={{ mb: 2 }}
        >
          Add Subject
        </Button>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalculateIcon />}
            onClick={calculateWeightedAverage}
            size="small"
          >
            Calculate
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CleaningServicesIcon />}
            onClick={clearAll}
            size="small"
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* Right Side - Result */}
      <Box sx={{ flex: 1 }}>
        <AnimatePresence>
          {weightedAverage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <Paper
                elevation={5}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #e0f2fe, #fef9c3)",
                }}
              >
                <Typography variant="h6">Weighted Average</Typography>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Typography
                    variant="h3"
                    color="primary"
                    sx={{ fontWeight: "bold", my: 1 }}
                  >
                    {weightedAverage}
                  </Typography>
                  <Typography variant="subtitle1">
                    {getDescription(parseFloat(weightedAverage))}
                  </Typography>
                </motion.div>

                {/* Progress bar */}
                <Box
                  sx={{
                    mt: 3,
                    height: 20,
                    borderRadius: 10,
                    overflow: "hidden",
                    backgroundColor: "#e5e7eb",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(weightedAverage / 7) * 100}%` }}
                    transition={{ duration: 1 }}
                    style={{
                      height: "100%",
                      background:
                        weightedAverage >= 4 ? "#3b82f6" : "#ef4444",
                    }}
                  />
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default WeightedGrades;
