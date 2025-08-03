-- Script para crear un usuario admin en Supabase Auth y asignar el rol "admin"

-- 1. Crea el usuario desde el panel de Supabase Auth (Auth > Users > Add User)
--    Ingresa el email y una contraseña segura.
--    Ejemplo: admin@tudominio.com

-- 2. Asigna el rol "admin" en los metadatos del usuario.
--    Puedes hacerlo desde el panel (editando el usuario) o con SQL:

update auth.users
set raw_user_meta_data = jsonb_set(
  coalesce(raw_user_meta_data, '{}'),
  '{role}', '"admin"',
  true
)
where email = 'admin@tudominio.com';

-- 3. (Opcional) Si usas claims personalizados en JWT, asegúrate de que el claim "role" esté incluido en el token.
--    Esto se configura en la sección Auth > Settings > JWT en Supabase.

-- Ahora puedes iniciar sesión con ese email y contraseña y tendrás acceso de admin.
