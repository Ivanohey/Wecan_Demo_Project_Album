# Demo Wecan 
Ce projet a été développé par Ivan Kostine dans le cadre du recrutement pour le poste de stagiare Full-Stack Developer à Wecan Group. Le projet a pour but de présenter mes capacités personnelles de développement web ainsi que ma méthodologie de gestion de projet de programmation. 

# Exigences fonctionnelles du projet
Le projet représente une petite application de gestion d'albums photos. Dans cette application, un utilisateur peut:
1) S'inscrire sur la plateforme
2) Se connecter sur la plateforme
3) Créer un album photo en spécifiant un titre, une description et un lieu.
4) Ajouter des photos dans un album spécifique
5) Partager son album avec d'autres utilisateurs
6) Visualiser des albums qui lui ont été partagés par d'autres utilisateurs

# Description de l'installation
Le projet a été développé à l'aide de Angular 11 et NodeJS, ainsi qu'une base de données MySQL. Le projet a été prévu pour tourner en localhost. Il n'est donc pas hébergé sur un serveur. La base de données MySQL est hébergée sur un serveur EC2 de AWS. L'environnement d'exploitation sur lequel le projet a été développé est Windows 10.

## Prérequis du projet
Voici la liste des prérequis qui doivent être installés sur la machine pour que l'application fonctionne:
1) Angular
2) NodeJs

Dépendences NodeJS:
- bcrypt: Utilisé pour le système de cryptage
- body-parser: Utilisé pour parser le body des réponses serveur
- cors: Paramètres cors pour les navigateurs
- express: Utilisé pour les requêtes et le routing
- jsonwebtoken: Utilisé lors de la session de l'utilisateur connecté
- mysql: Utilisé pour toutes les requêtes mysql
- nodemon: Utilisé pour un redémarrage automatique du serveur lors de modifications

## Installation
1) Pull le projet depuis GitHub
2) Installer les dépendences nécéssaires dans les dossiers /frontend et /backend à l'aide de la commande "npm install"
3) Lancer le serveur Angular à l'aide de "ng serve"
4) Lancer le serveur NodeJs à l'aide de "nodemon server" ou "node server" si nodemon n'est pas installé.
5) Pour utiliser l'application, se diriger sur localhost:4200 dans le navigateur

# Configuration de la base de données
- host: 52.58.218.95
- database: wecandemo
- user: wecan
- password: PzRt2UNrs0A

La base de données peut être consultée et modifiée à l'aide de PHPmyAdmin sur 52.58.218.95/phpmyadmin





