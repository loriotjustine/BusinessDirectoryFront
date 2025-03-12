<?php
abstract class Render {

        /**
         * Renders a view based on a given view data.
         * @param ViewData $view_data Informations about the view to render.
         */
        protected static function render(ViewData $view_data): void {
            
            ob_start();
            require_once $view_data->view_path;
            $page_content = ob_get_clean();
            require_once $view_data->template;

        }
}
