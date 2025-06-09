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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
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
                            sx={{ mb: 2 }}
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
                        >
                            {loading ? 'Checking...' : 'Check for Spam'}
                        </Button>
                    </Paper>
                </Grid>

                {result && (
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Analysis Result
                                </Typography>
                                <Typography variant="body1">
                                    Status: {result.is_spam ? 'Spam' : 'Not Spam'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Confidence Score: {(result.confidence_score * 100).toFixed(2)}%
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default Dashboard; 