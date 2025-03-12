<?php

declare(strict_types=1);
class ViewsData implements IteratorAggregate {

        private array $content;

        public function __construct(?ViewData ...$content) {
            $this->content = [];
            foreach ($content as $value) { if ($value) $this->content[$value->page] = $value; }
        }

        public function getIterator(): Traversable { return new ArrayIterator($this->content); }
        
        public function getViewData(string $page): ?ViewData {
            return $this->content[$page] ?? null;
        }

        public function append(ViewData ...$content) {
            foreach ($content as $value) { if ($value) $this->content[$value->page] = $value; }
        }
}
