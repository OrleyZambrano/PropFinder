-- Script para crear la tabla de solicitudes de agentes y sus reglas en Supabase

-- 0. Eliminar la tabla anterior (y todas sus policies)
drop table if exists public.agent_requests cascade;

-- 1. Crear la nueva tabla de solicitudes de agente
create table public.agent_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  email text not null,
  motivo text not null,
  estado text default 'pendiente',
  created_at timestamp with time zone default now()
);

-- 2. Habilitar Row Level Security
alter table public.agent_requests enable row level security;

-- 3. Permitir insertar solo a usuarios autenticados (usando su user_id)
create policy "Solo usuarios autenticados pueden solicitar ser agente" on public.agent_requests
  for insert
  with check (auth.uid() = user_id);

-- 4. Permitir select/update/delete solo a admin
create policy "Solo admin puede ver y modificar solicitudes" on public.agent_requests
  for select using (auth.role() = 'authenticated' and auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
create policy "Solo admin puede update" on public.agent_requests
  for update using (auth.role() = 'authenticated' and auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
create policy "Solo admin puede delete" on public.agent_requests
  for delete using (auth.role() = 'authenticated' and auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');

-- 5. Index para búsquedas rápidas por estado
create index idx_agent_requests_estado on public.agent_requests(estado);
