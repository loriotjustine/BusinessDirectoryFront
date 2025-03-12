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
$mainController = new MainController(
    home_view_data : $home,
    views_data     : new ViewsData(
        new ViewData("user",  "Profil utilisateur",  "...", "views/pages/user.view.php", page_js_files: ["user.js", "constants.js"]),
        $home
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