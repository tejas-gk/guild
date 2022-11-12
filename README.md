# guild

## needed
- [ ] composer
- [ ] node
- [ ] xampp
- [ ] mailtrap or similar

## steps
```
- turn on xampp
- git clone this repo
- add envs
- cd server && composer install
- php artisan generate:key
- php artisan migrate:fresh --seed
- php artisan serve
- cd client && npm i
- npm run dev
- ./vendor/bin/pint
- npm run lint
```
