<?php
class ViewData {

    public readonly string $page;
    public readonly string $title;
    public readonly string $description;
    public readonly string $view_path;
    public readonly string $template;
    public readonly array  $page_css_files;
    public readonly array  $page_js_files;

    // CONSTRUCTEUR
    public function __construct(
        string $page,
        string $title,
        string $description,
        string $view_path,
        string $template       = "views/layouts/" . TEMPLATE,
        array  $page_css_files = [],
        array  $page_js_files  = [],
    ) {
        $this->page           = $page;
        $this->title          = $title;
        $this->description    = $description;
        $this->view_path      = $view_path;
        $this->template       = $template;
        $this->page_css_files = $page_css_files;
        $this->page_js_files  = $page_js_files;
    }
}
