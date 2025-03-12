<?php

require_once "services/render.php";
abstract class BaseController extends Render {

        public static ViewData  $error_view_data;

        /**
         * Error page setup.
         * @param string $message Displayed error message.
         * */
        public static function error(string $message): void {
            if (isset(self::$error_view_data)) { self::render(ErrorViewData::fromViewData(self::$error_view_data, $message)); }
            else throw new Exception("Missing error page!"); 
        }

        /**
         * Generic page setup based on its identifier, usually taken from the URL.
         * @param string $page Page identifier.
         * */
        public abstract function control(string $page): void;
}
