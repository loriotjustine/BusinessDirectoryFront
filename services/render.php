<?php
abstract class Render {

        /**
         * Renvoie la vue correspondante
         * @param ViewData $view_data Les infos de la page à retourner
         */
        protected static function render(ViewData $view_data): void {
            
            ob_start();
            require_once $view_data->view_path;
            $page_content = ob_get_clean();
            require_once $view_data->template;

        }
}
