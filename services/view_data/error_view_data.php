<?php
class ErrorViewData extends ViewData {
    
    public readonly string $error_message;

    // CONSTRUCTEUR
    public function __construct(
        string $page,
        string $title,
        string $description,
        string $error_message,
        string $view_path,
        string $template       = "views/layouts/" . TEMPLATE,
        array  $page_css_files = [],
        array  $page_js_files  = [],
    ) {
        
        parent::__construct(
            $page,
            $title,
            $description,
            $view_path,
            $template,
            $page_css_files,
            $page_js_files,
        );

        $this->error_message = $error_message;

    }


    /**
     * Créé une ErrorViewData depuis une ViewData
     * @param  string   $error_message le message d'erreur
     * @return ErrorViewData la vue d'erreur correspondante
     */
    public static function fromViewData(
        ViewData $from,
        string   $error_message,
    ): Self {
        return new ErrorViewData(
            $from->page,
            $from->title,
            $from->description,
            $error_message,
            $from->view_path,
            $from->template,
            $from->page_css_files,
            $from->page_js_files,
        );
    }
}
