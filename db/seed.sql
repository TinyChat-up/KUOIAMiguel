-- Optional seed data (replace UUIDs with real auth user ids)
insert into public.schools (id, name, city, verified, description) values
('11111111-1111-1111-1111-111111111111','Colegio Alameda','Madrid',true,'Centro bilingüe con enfoque STEAM'),
('22222222-2222-2222-2222-222222222222','Colegio Horizonte','Barcelona',true,'Innovación educativa y bienestar escolar');

insert into public.products (user_id, school_id, title, description, price, condition, category, city, status) values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','Uniforme talla 10','Uniforme completo impecable',35,'segunda_mano','Uniformes','Madrid','active'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','Mochila escolar','Mochila nueva con ruedas',45,'nuevo','Accesorios','Madrid','active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','Libros 4º Primaria','Pack de libros',60,'segunda_mano','Libros','Barcelona','active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',null,'Tablet educativa','Tablet en perfecto estado',120,'segunda_mano','Tecnología','Valencia','active'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',null,'Bata laboratorio','Bata sin usar',15,'nuevo','Ropa','Madrid','active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','Calculadora científica','Ideal para ESO/Bach',20,'segunda_mano','Material escolar','Barcelona','active');

insert into public.services (id, owner_id, title, description, category, city, subscription_status) values
('33333333-3333-3333-3333-333333333333','cccccccc-cccc-cccc-cccc-cccccccccccc','Ruta Segura Norte','Transporte escolar puerta a puerta','Transporte','Madrid','active'),
('44444444-4444-4444-4444-444444444444','cccccccc-cccc-cccc-cccc-cccccccccccc','LimpiaCole','Limpieza integral de centros','Limpieza','Madrid','active'),
('55555555-5555-5555-5555-555555555555','dddddddd-dddd-dddd-dddd-dddddddddddd','STEM Kids','Talleres robótica y coding','Extraescolares','Barcelona','active'),
('66666666-6666-6666-6666-666666666666','dddddddd-dddd-dddd-dddd-dddddddddddd','NutriComedor','Gestión de comedor saludable','Comedor','Valencia','inactive'),
('77777777-7777-7777-7777-777777777777','dddddddd-dddd-dddd-dddd-dddddddddddd','Profe a Domicilio','Refuerzo primaria y ESO','Clases particulares','Madrid','active'),
('88888888-8888-8888-8888-888888888888','cccccccc-cccc-cccc-cccc-cccccccccccc','Centro Logos','Orientación y logopedia','Logopedia','Barcelona','active');

insert into public.service_schools(service_id, school_id) values
('33333333-3333-3333-3333-333333333333','11111111-1111-1111-1111-111111111111'),
('55555555-5555-5555-5555-555555555555','22222222-2222-2222-2222-222222222222'),
('88888888-8888-8888-8888-888888888888','11111111-1111-1111-1111-111111111111');

insert into public.reviews(author_id, target_type, target_id, rating, text) values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','school','11111111-1111-1111-1111-111111111111',5,'Muy buen ambiente.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','school','22222222-2222-2222-2222-222222222222',4,'Profes muy atentos.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','service','33333333-3333-3333-3333-333333333333',5,'Ruta puntual.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','service','44444444-4444-4444-4444-444444444444',4,'Buen servicio de limpieza.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','service','55555555-5555-5555-5555-555555555555',5,'Extraescolares top.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','service','66666666-6666-6666-6666-666666666666',3,'Mejorable comunicación.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','service','77777777-7777-7777-7777-777777777777',5,'Gran profesor.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','service','88888888-8888-8888-8888-888888888888',4,'Muy profesionales.'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','school','22222222-2222-2222-2222-222222222222',5,'Instalaciones excelentes.'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','school','11111111-1111-1111-1111-111111111111',4,'Comunidad activa.');
