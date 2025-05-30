# ecommerce-v1

 Mini-Application E-commerce 

 Présentation du projet
Ce projet est une application web e-commerce développée en Node.js (backend) et React.js (frontend).  
L’objectif est d’apprendre à travailler en équipe, à gérer un projet sous Git et à intégrer des fonctionnalités clés d’un site e-commerce.  

Le projet a été conçu sur une période de 4 jours et comprend :
- La gestion des utilisateurs(rôles admin/utilisateur, authentification)
- L’affichage et gestion des produits
- La prise et gestion des commandes
- Un panel d’administration(gestion des utilisateurs, produits, commandes)

---

 Fonctionnalités principales

Gestion des utilisateurs
- Création de comptes, connexion
- Attribution d’un rôle (admin ou utilisateur)
- Authentification via JWT (backend)
- Accès restreint selon le rôle

Catalogue produits
- Consultation d’un catalogue de produits (depuis la BDD)
- Ajout d’articles au panier
- Gestion basique des stocks (quantité, disponibilité)

Commandes
- Passage de commandes depuis le frontend
- Historique des commandes pour chaque utilisateur
- Gestion des commandes par l’admin (consultation, suppression, mise à jour)

Administration
- Gestion des utilisateurs (ajout, modification, suppression)
- Gestion des produits (CRUD)
- Gestion des commandes (consultation, état)

---

Architecture et fonctionnement

Backend (Node.js + Express)
- Base de données : MongoDB (via Mongoose) ou SQL selon le choix du projet
- Modèles : Users, Produits, Commandes
- Authentification : JWT (JSON Web Tokens) pour sécuriser les routes
- API RESTful : exposant des routes pour :
  - Authentification (`/api/auth`)
  - Produits (`/api/products`)
  - Commandes (`/api/orders`)

 Frontend (React.js)
- Pages : Accueil, Connexion/Inscription, Catalogue, Panier, Commandes, Admin
- Navigation : React Router
- State management : useState/useEffect (ou Redux selon choix)
- Requêtes HTTP : Axios (vers l’API backend)
- Sécurisation du front : Stockage du token JWT, redirection si non authentifié
- Rôle utilisateur : affichage conditionnel du contenu (ex : admin panel)

  Installation et exécution
1) Cloner le projet
bash
https://github.com/Emma781227/ecommerce-v1.git
cd ecommerce-v1
2)Inst	aller les dépendances 
	. Backend : 
		cd backend
		npm install
	.Frontend:
		cd frontend
		npm install

3 lancer les serveurs
	.Backend: 
		npm run dev
	.Frontend: 
		npm start

État du projet
Le projet est partiellement terminé à l’issue des 3 jours :
Backend : Authentification et CRUD fonctionnels
Frontend : Pages principales créées et connectées à l’API
Admin panel : en court de developpement 
Des évolutions futures sont possibles (tests, UI améliorée, intégration d’une vraie passerelle de paiement).
Repartition des taches selon leur branche
 feature/auth-backend        
feature/frontend User    
feature/orders-backend     
 feature/admin-users         
 feature/admin-products      
 feature/admin-orders        
docs-readme-IA   

