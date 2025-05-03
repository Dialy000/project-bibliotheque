# Guide rapide Postman – Backend Bibliothèque

## URL de base
```
http://localhost:5000/api
```

## Endpoints principaux

| Ressource | CRUD | URL |
|-----------|------|-----|
| Utilisateurs | CREATE | POST /utilisateurs |
|  | READ ALL | GET /utilisateurs |
|  | READ ONE | GET /utilisateurs/:id |
|  | UPDATE | PUT /utilisateurs/:id |
|  | DELETE | DELETE /utilisateurs/:id |
| Ouvrages | POST /ouvrages | etc. |
| Reservations | POST /reservations | etc. |
| Emprunts | POST /emprunts | etc. |
| Abonnements | POST /abonnements | etc. |

### Exemple POST Utilisateur
- URL: `POST /utilisateurs`
- Body (JSON):
```json
{
  "nom":"Ali",
  "prenom":"Ahmed",
  "email":"ali.ahmed@example.com",
  "mot_de_passe":"123456",
  "role":"adherent"
}
```

Procèdons de la même façon pour les autres ressources (voir leurs schémas dans `/models`).
