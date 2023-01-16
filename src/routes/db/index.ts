import { Router } from 'express';
import { dbController } from '@controllers/db';

export const db = Router();

db.get('/get', dbController.get);
db.post('/save', dbController.save);
db.delete('/delete/:id', dbController.delete);
db.delete('/delete-person-table', dbController.deletePersonTable);
