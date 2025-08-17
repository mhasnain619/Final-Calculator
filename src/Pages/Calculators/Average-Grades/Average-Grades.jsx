import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Material UI Icons
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

import {
    Box,
    Button,
    IconButton,
    Paper,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const GradeAverage = () => {
    const [rows, setRows] = useState([{ subject: "", grade: "" }]);
    const [average, setAverage] = useState(null);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const addRow = () => setRows([...rows, { subject: "", grade: "" }]);
    const removeRow = (index) => setRows(rows.filter((_, i) => i !== index));

    const handleChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows);
    };

    const calculateAverage = () => {
        const grades = rows.map((r) => parseFloat(r.grade)).filter((g) => !isNaN(g));
        if (grades.length === 0) return setAverage(null);
        const avg = grades.reduce((acc, g) => acc + g, 0) / grades.length;
        setAverage(avg.toFixed(2));
    };

    const clearAll = () => {
        setRows([{ subject: "", grade: "" }]);
        setAverage(null);
    };

    const getDescription = (val) => {
        if (val >= 6.5) return "Excelente";
        if (val >= 6.0) return "Muy Bueno";
        if (val >= 5.5) return "Bueno";
        if (val >= 5.0) return "Bueno";
        if (val >= 4.5) return "Satisfactorio";
        if (val >= 4.0) return "Aprobado";
        return "Reprobado";
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // responsive
                gap: 3,
                maxWidth: 1200,
                p: { xs: 1, sm: 2 },
            }}
        >
            {/* Left Side - Tool */}
            <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography
                        variant="h5"
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                    >
                        <CalculateIcon sx={{ mr: 1 }} /> Promedio de Notas
                    </Typography>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                mb: 2,
                                display: "flex",
                                alignItems: "center",
                                borderRadius: 3,
                            }}
                        >
                            <InfoIcon color="info" sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                Calcula el promedio aritmético simple de tus notas chilenas.
                                Todas las notas tienen el mismo peso.
                            </Typography>
                        </Paper>
                    </motion.div>

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
                                    p: 1,
                                    mb: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    borderRadius: 3,
                                }}
                            >
                                <TextField
                                    size={isSmall ? "small" : "medium"}
                                    placeholder="Nombre de la materia"
                                    value={row.subject}
                                    onChange={(e) =>
                                        handleChange(index, "subject", e.target.value)
                                    }
                                    fullWidth
                                />
                                <TextField
                                    size={isSmall ? "small" : "medium"}
                                    placeholder="Nota (1.0-7.0)"
                                    type="number"
                                    inputProps={{ step: 0.1, min: 1, max: 7 }}
                                    value={row.grade}
                                    onChange={(e) =>
                                        handleChange(index, "grade", e.target.value)
                                    }
                                    sx={{ width: { xs: 90, sm: 140 } }}
                                />
                                {index > 0 && (
                                    <IconButton
                                        size={isSmall ? "small" : "medium"}
                                        color="error"
                                        onClick={() => removeRow(index)}
                                    >
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
                        size={isSmall ? "small" : "medium"}
                        sx={{ mb: 2 }}
                    >
                        Agregar Materia
                    </Button>

                    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<CalculateIcon />}
                            onClick={calculateAverage}
                            size={isSmall ? "small" : "medium"}
                        >
                            Calcular
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            startIcon={<CleaningServicesIcon />}
                            onClick={clearAll}
                            size={isSmall ? "small" : "medium"}
                        >
                            Limpiar
                        </Button>
                    </Box>
                </Box>
            </Paper>
            {/* Right Side - Result */}
            <Box sx={{ flex: 1 }}>
                <AnimatePresence>
                    {average && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Paper
                                elevation={4}
                                sx={{
                                    p: 3,
                                    textAlign: "center",
                                    borderRadius: 3,
                                    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                                }}
                            >
                                <Typography variant="h6">Promedio Simple:</Typography>
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <Typography
                                        variant="h3"
                                        color="primary"
                                        sx={{ fontWeight: "bold", my: 1 }}
                                    >
                                        {average}
                                    </Typography>
                                </motion.div>
                                <Typography variant="body1">
                                    {getDescription(parseFloat(average))}
                                </Typography>

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
                                        animate={{ width: `${(average / 7) * 100}%` }}
                                        transition={{ duration: 1 }}
                                        style={{
                                            height: "100%",
                                            backgroundColor: "#3b82f6",
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

export default GradeAverage;
