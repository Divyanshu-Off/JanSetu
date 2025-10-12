import axios from 'axios';
export const fetchIssues = () => axios.get('/api/issues');
// Adapt base URL as needed
