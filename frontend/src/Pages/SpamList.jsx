import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Paper,
    Divider,
    Box,
    Chip,
    TextField,
    Button,
    CircularProgress,
    Fade,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorred';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import axios from 'axios';
import FloatingShapes from '../components/FloatingShapes';
import Footer from '../components/Footer';
import '../components/FloatingShapes.css';
import '../components/Footer.css';

const waveSvg = (
    <svg
        viewBox="0 0 1440 320"
        style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 0,
            pointerEvents: 'none',
        }}
    >
        <path
            fill="#667eea"
            fillOpacity="0.18"
            d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,128C1248,139,1344,213,1392,250.7L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
    </svg>
);

function SpamList() {
    const [spamMessages, setSpamMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchSpamMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/spam/spam-list');
            setSpamMessages(response.data);
        } catch (err) {
            setError('Error fetching spam messages');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSpamMessages();
    }, []);

    const handleDelete = async (messageId) => {
        try {
            await axios.delete(`http://localhost:8000/api/spam/spam/${messageId}`);
            setSpamMessages(spamMessages.filter(msg => msg.id !== messageId));
        } catch (err) {
            setError('Error deleting message');
            console.error('Error:', err);
        }
    };

    if (loading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    return (
        <>
            <FloatingShapes />
            <Container maxWidth="md" sx={{ mt: 8, mb: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', position: 'relative', zIndex: 1 }}>
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
                        Spam Messages
                    </Typography>
                    {error && (
                        <Typography color="error" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {spamMessages.length === 0 ? (
                        <Typography>No spam messages found</Typography>
                    ) : (
                        <List sx={{ width: '100%' }}>
                            {spamMessages.map((message, index) => (
                                <React.Fragment key={message.id}>
                                    <ListItem sx={{
                                        borderRadius: '18px',
                                        mb: 2,
                                        background: 'rgba(245,245,255,0.85)',
                                        boxShadow: '0 2px 12px 0 rgba(120,119,198,0.07)',
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'scale(1.025)', boxShadow: '0 6px 24px 0 rgba(120,119,198,0.13)' },
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            {message.message_type === 'email' ? (
                                                <EmailIcon sx={{ mr: 2, color: '#667eea' }} />
                                            ) : (
                                                <MessageIcon sx={{ mr: 2, color: '#764ba2' }} />
                                            )}
                                            <ListItemText
                                                primary={<Typography sx={{ fontWeight: 600 }}>{message.sender}</Typography>}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="text.primary" sx={{ fontSize: '1.1rem' }}>
                                                            {message.content}
                                                        </Typography>
                                                        <br />
                                                        <Chip
                                                            label={`${(message.confidence_score * 100).toFixed(1)}% confidence`}
                                                            size="small"
                                                            color="error"
                                                            sx={{ mt: 1, fontWeight: 500 }}
                                                        />
                                                    </>
                                                }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDelete(message.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </Box>
                                    </ListItem>
                                    {index < spamMessages.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    )}
                </Paper>
            </Container>
            <Footer />
        </>
    );
}

export default SpamList; 