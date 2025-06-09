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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import axios from 'axios';

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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
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
                    <List>
                        {spamMessages.map((message, index) => (
                            <React.Fragment key={message.id}>
                                <ListItem>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        {message.message_type === 'email' ? (
                                            <EmailIcon sx={{ mr: 2 }} />
                                        ) : (
                                            <MessageIcon sx={{ mr: 2 }} />
                                        )}
                                        <ListItemText
                                            primary={message.sender}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="text.primary">
                                                        {message.content}
                                                    </Typography>
                                                    <br />
                                                    <Chip
                                                        label={`${(message.confidence_score * 100).toFixed(1)}% confidence`}
                                                        size="small"
                                                        color="error"
                                                        sx={{ mt: 1 }}
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
    );
}

export default SpamList; 