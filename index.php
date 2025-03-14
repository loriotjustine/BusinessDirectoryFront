<?php

session_start();
define("WEBSITE_NAME", "");

define("INDEX", "");

define("TEMPLATE", "base.php");

define("URL", str_replace(
    "index.php", "", (isset($_SERVER["HTTPS"]) ? "https" : "http")
        . "://"
        . $_SERVER["HTTP_HOST"]
        . $_SERVER["PHP_SELF"]
    )
);

require_once "controllers/base.controller.php";
require_once "controllers/main.controller.php";
require_once "services/view_data/view_data.php";
require_once "services/view_data/error_view_data.php";
require_once "services/view_data/views_data.php";

BaseController::$error_view_data  = new ViewData("error", "Ooops!", "...", "views/pages/error.view.php");

$home           = new ViewData("accueil", "Accueil", "...", "views/pages/home.view.php", page_js_files: ["home.js", "constants.js"]);
$login          = new ViewData("login", "Connexion", "...", "views/pages/login.view.php", page_js_files: ["login.js", "constants.js"]);
$mainController = new MainController(
    home_view_data : $home,
    views_data     : new ViewsData(
        new ViewData("user",  "Profil utilisateur",  "...", "views/pages/user.view.php", page_js_files: ["user.js", "constants.js"]),
        new ViewData("service",  "Gestion des services",  "...", "views/pages/service.view.php", page_js_files: ["service.js", "constants.js"]),
        new ViewData("site",  "Gestion des sites",  "...", "views/pages/site.view.php", page_js_files: ["site.js", "constants.js"]),
        new ViewData("site/edit",  "Modification d'un site",  "...", "views/pages/edit_site.view.php", page_js_files: ["edit_site.js", "constants.js"]),
        new ViewData("site/add",  "Ajout d'un site",  "...", "views/pages/add_site.view.php", page_js_files: ["add_site.js", "constants.js"]),
        new ViewData("service/add",  "Ajout d'un service",  "...", "views/pages/add_service.view.php", page_js_files: ["add_service.js", "constants.js"]),
        new ViewData("service/edit",  "Modification d'un service",  "...", "views/pages/edit_service.view.php", page_js_files: ["edit_service.js", "constants.js"]),
        new ViewData("user/add",  "Ajout d'un employé",  "...", "views/pages/add_user.view.php", page_js_files: ["add_user.js", "constants.js"]),
        new ViewData("user/edit",  "Modification d'un employé",  "...", "views/pages/edit_user.view.php", page_js_files: ["edit_user.js", "constants.js"]),
        $home,
        $login
    ),
);

try {
    // Ajout d'une condition pour gérer l'URL de l'utilisateur
    if (isset($_GET['page'])) {
        $page = $_GET['page'];
        
        // Si la page est "user" et qu'un ID est fourni, alors afficher la page utilisateur
        if ($page === 'user' && isset($_GET['id'])) {
            $userId = $_GET['id'];
            $mainController->control('user', $userId);  // Passer l'ID utilisateur au contrôleur
        } else {
            // Sinon, afficher la page par défaut
            switch($page) {
                case INDEX : { $mainController->home(); break; }
                default    : { $mainController->control($page); break; }
            }
        }
    } else {
        $mainController->home();  // Afficher la page d'accueil par défaut
    }
} catch (Exception $e) { 
    BaseController::error($e->getMessage()); 
}

?>