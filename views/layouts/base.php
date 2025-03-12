<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8"/>
        <base href="http://cubesbusinessdirectoryfront/">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="<?=$view_data->description;?>" />

        <link rel="manifest" href="manifest.json" />
        <meta name="apple-mobile-web-app-status-bar" content="#363636" />
        <meta name="theme-color" content="#E3E3E3" />

        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {  background: '#15191E', backgroundTransparent: '#15191EC4', variant: '#31343A', primary: '#AB8DB9', secondary: '#9973AA', disabled: '#6F4E7E' },
                        boxShadow: { background: '0 -4px 4px #15191E, 0 4px 4px #15191E', backgroundSM: '0 0 16px #15191E, 0 0 16px #15191E' },
                        minHeight: { screenContent: 'calc(100vh - 64px)', },
                        height: { screenContent: 'calc(100vh - 64px)', },
                    },
                },
                screens: {
                    '5xl': { 'max': '3840px' },     // => @media (max-width: 3840px) { ... }      // 4K
                    '4xl': { 'max': '2560px' },     // => @media (max-width: 2048px) { ... }      // 2K
                    '3xl': { 'max': '1920px' },     // => @media (max-width: 1920px) { ... }      // (1600 - 1920)px
                    '2xl+': { 'max': '1600px' },    // => @media (max-width: 1600px) { ... }      // (1536 - 1600)px
                    '2xl': { 'max': '1536px' },     // => @media (max-width: 1536px) { ... }      // (1440 - 1536)px
                    'xl': { 'max': '1440px' },      // => @media (max-width: 1440px) { ... }      // (1280 - 1440)px
                    'lg+': { 'max': '1280px' },     // => @media (max-width: 1280px) { ... }      // (1100 - 1280)px
                    'lg-mid': { 'max': '1100px' },  // => @media (max-width: 1100px) { ... }      // (1024 - 1100)px
                    'lg': { 'max': '1024px' },      // => @media (max-width: 1024px) { ... }      // (768 - 1024)px
                    'md+': { 'max': '840px' },      // => @media (max-width: 840px) { ... }       // (768 - 840px)px
                    'md': { 'max': '768px' },       // => @media (max-width: 768px) { ... }       // (500 - 768)px
                    'sm': { 'max': '500px' },       // => @media (max-width: 500px) { ... }       // (380 - 500)px
                    'xs': { 'max': '350px' },       // => @media (max-width: 350px) { ... }       // (0 - 380)px
                },
            }
        </script>
        <title><?=$view_data->title;?></title>
    </head>
    <body class="text-white min-h-screen">
        <?php require_once "views/layouts/header.php";?>

        <main class="relativev sm:h-auto"> <?=$page_content;?> </main>
        
        <?php require_once "views/layouts/footer.php";?>
        
        <?php if(!empty($view_data->page_js_files)) : ?>
            <?php foreach($view_data->page_js_files as $js_file) : ?>
                <script src="<?=URL?>public/js/<?=$js_file?>"></script>
            <?php endforeach; ?>
        <?php endif; ?>

        <script src="<?=URL?>public/js/header.js"></script>

    </body>
</html>
