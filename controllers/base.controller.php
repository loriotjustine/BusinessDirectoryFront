<?php

require_once "services/render.php";
abstract class BaseController extends Render {

        public static ViewData  $error_view_data;

        /**
         * Affichage de la page d'erreur
         * @param string $message Affichage du message d'erreur
         * */
        public static function error(string $message): void {
            if (isset(self::$error_view_data)) { self::render(ErrorViewData::fromViewData(self::$error_view_data, $message)); }
            else throw new Exception("Missing error page!"); 
        }

        /**
         * Gestion de l'affichage des pages
         * @param string $page Identifiant de la page
         * */
        public abstract function control(string $page): void;
}
