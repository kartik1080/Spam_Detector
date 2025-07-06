import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import axios from 'axios';
import FloatingShapes from '../components/FloatingShapes';
import Footer from '../components/Footer';
import '../components/FloatingShapes.css';
import '../components/Footer.css';

function Dashboard() {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckSpam = async () => {
        if (!message.trim()) {
            setError('Please enter a message to check');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/api/spam/check', {
                message_type: 'email',
                sender: 'test@example.com',
                content: message,
            });

            setResult(response.data);
        } catch (err) {
            setError('Error checking spam. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <FloatingShapes />
            <Container maxWidth="md" sx={{ mt: 8, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', position: 'relative', zIndex: 1 }}>
                {/* Stats Section */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '18px', textAlign: 'center', background: 'rgba(245,245,255,0.85)' }}>
                            <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 700 }}>Total Messages</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>1,234</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '18px', textAlign: 'center', background: 'rgba(245,245,255,0.85)' }}>
                            <Typography variant="h6" sx={{ color: '#764ba2', fontWeight: 700 }}>Spam Detected</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>456</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper elevation={3} sx={{ p: 2, borderRadius: '18px', textAlign: 'center', background: 'rgba(245,245,255,0.85)' }}>
                            <Typography variant="h6" sx={{ color: '#b5ead7', fontWeight: 700 }}>Accuracy</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>98.7%</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                {/* Main Card */}
                <Paper elevation={6} sx={{
                    p: 5,
                    borderRadius: '32px',
                    minWidth: '420px',
                    maxWidth: '700px',
                    width: '100%',
                    background: 'rgba(255,255,255,0.85)',
                    boxShadow: '0 8px 40px 0 rgba(120,119,198,0.10)',
                    backdropFilter: 'blur(12px)',
                    border: '1.5px solid rgba(120,119,198,0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'box-shadow 0.3s',
                }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 2 }}>
                        Check for Spam
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Enter message to check"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ mb: 2, borderRadius: '18px', background: 'rgba(245,245,255,0.85)' }}
                    />
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleCheckSpam}
                        disabled={loading}
                        sx={{
                            width: '70%',
                            borderRadius: '25px',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 20px 0 rgba(120,119,198,0.13)',
                            mb: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                                transform: 'scale(1.04)',
                                boxShadow: '0 8px 32px 0 rgba(120,119,198,0.18)',
                            },
                        }}
                    >
                        {loading ? 'Checking...' : 'Check for Spam'}
                    </Button>
                    {result && (
                        <Box sx={{ mt: 3, width: '100%' }}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: '18px', background: result.is_spam ? 'rgba(255, 99, 132, 0.13)' : 'rgba(102, 238, 170, 0.13)', color: result.is_spam ? '#d32f2f' : '#388e3c', textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    Analysis Result
                                </Typography>
                                <Typography variant="body1">
                                    Status: {result.is_spam ? 'Spam' : 'Not Spam'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Confidence Score: {(result.confidence_score * 100).toFixed(2)}%
                                </Typography>
                            </Paper>
                        </Box>
                    )}
                </Paper>
            </Container>
            <Footer />
        </>
    );
}

export default Dashboard; 