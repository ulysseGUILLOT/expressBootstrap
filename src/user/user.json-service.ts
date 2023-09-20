import * as fs from 'fs';

import { User } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {
    private jsonPath = './src/user/users.json';

    add(username: string): User {
        // Lire le contenu actuel du fichier JSON
        const fileContent = fs.readFileSync(this.jsonPath, 'utf8');
        const users: User[] = JSON.parse(fileContent);

        // Trouver le dernier ID
        const lastId = users.length > 0 ? users[users.length - 1].id : 0;

        // Créer un nouvel utilisateur avec un ID incrémenté
        const newUser: User = new User(lastId + 1, username);

        // Ajouter le nouvel utilisateur à la liste
        users.push(newUser);

        // Écrire la liste mise à jour dans le fichier JSON
        fs.writeFileSync(this.jsonPath, JSON.stringify(users), 'utf8');

        return newUser;
    }

    getById(id: number): User | null {
        // Lire le contenu actuel du fichier JSON
        const fileContent = fs.readFileSync(this.jsonPath, 'utf8');
        const users: User[] = JSON.parse(fileContent);

        // Chercher l'utilisateur avec l'ID spécifié
        const user = users.find(u => u.id === id);

        return user || null;
    }
}