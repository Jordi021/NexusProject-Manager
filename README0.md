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
