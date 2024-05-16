<p align="center"><a href="#" target="_blank"><img src="./public/Nexus.svg" width="200" height="200" alt="Nexus Logo"></a></p>

# Pasos para que sirva el programa:
    1.composer install
    2.npm install
    3.php artisan migrate:refresh o php artisan migrate (en caso de haber borrado la db)
    4.php artisan db:seed 
    5.php artisan serve
    6.npm run dev
# Iniciar sesion con cualquiera de estos roles:
    $roles = ['gerente', 'analista', 'jefe', 'desarrollador'];
    email = nombreRol@gmail.com
    contraseña = password
# Inspirate
    php artisan inspire
# Git
    1.git config --global core.autocrlf true (opcional en caso de warnings o conflictos con el git add )
    2.git add .
    3.git commit -m "" 
    4.git push [remoto] [rama] (para solo subir los cambios de la rama main!! remoto = origin)
    5.git fetch (para revisar, traer cambios y ramas en el repositorio remoto) 
    6.git merge [remoto]/[rama] (para unir los cambios traidos por fetch)
    7.git pull [remoto] [rama] (hace 5 y 6)

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.