<?php
class ErrorViewData extends ViewData {
    
    public readonly string $error_message;

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
     * Outputs an `ErrorViewData` based on a `ViewData`'s content.
     * @param  ViewData $from The base view data.
     * @param  string   $error_message The error message to display.
     * @return ErrorViewData An error view data based on the given view data.
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
