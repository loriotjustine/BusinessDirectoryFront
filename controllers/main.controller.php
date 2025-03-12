<?php

require_once "services/render.php";
require_once "./controllers/base.controller.php";

class MainController extends BaseController {

        public readonly ViewData  $home_view_data;
        public readonly ViewsData $views_data;

        public static function redirectHome(): void {
            if (isset(self::$home_view_data)) {
                header("Location:" . URL . self::$home_view_data->page);
            } else { throw new Exception("Aucune page d'accueil !"); }
        }

        public function home(): void {
            if (isset($this->home_view_data)) {
                header("Location:" . URL . $this->home_view_data->page);
            } else throw new Exception("Page d'accueil manquante !"); 
        }


        public function control(string $page): void {
            if (!empty($this->views_data)) {
                $view_data = $this->views_data->getViewData($page);
                if ($view_data) {
                    self::render($view_data);
                } else {
                    $this->home();
                }
            } else {
                throw new Exception("Cette section est vide !");
            }
        }
        

        public function __construct(
            ViewData  $home_view_data,
            ViewsData $views_data,
        ) {
            $this->home_view_data = $home_view_data;
            $this->views_data     = $views_data;
        }
}
