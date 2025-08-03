// Prueba de conexión a Supabase con manejo de variables de entorno
require("dotenv").config();
const fetch = require("node-fetch");

const SUPABASE_URL = process.env.SUPABASE_URL;
const ANON_KEY = process.env.SUPABASE_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function testSupabaseConnection() {
  console.log("🔍 Probando conexión a Supabase...\n");

  // Verificar variables de entorno
  if (!SUPABASE_URL || !ANON_KEY) {
    console.error("❌ Variables de entorno faltantes");
    console.log("SUPABASE_URL:", SUPABASE_URL ? "✅ Definida" : "❌ Faltante");
    console.log("SUPABASE_KEY:", ANON_KEY ? "✅ Definida" : "❌ Faltante");
    console.log(
      "SUPABASE_SERVICE_ROLE_KEY:",
      SERVICE_ROLE_KEY ? "✅ Definida" : "❌ Faltante"
    );
    return;
  }

  // Test 1: Probar con clave anon (acceso público)
  console.log("🔑 Test 1: Probando con clave ANON...");
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/agent_requests`, {
      method: "GET",
      headers: {
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(`Status: ${res.status}`);

    if (res.status === 200) {
      console.log("✅ Conexión exitosa con clave ANON");
      console.log(
        "Datos recibidos:",
        Array.isArray(data) ? `${data.length} registros` : "Estructura de datos"
      );
    } else {
      console.log("⚠️  Error con clave ANON:", data.message || data);
    }
  } catch (err) {
    console.error("❌ Error al probar clave ANON:", err.message);
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Test 2: Probar con clave service_role (si existe)
  if (SERVICE_ROLE_KEY) {
    console.log("🔑 Test 2: Probando con clave SERVICE_ROLE...");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/agent_requests`, {
        method: "GET",
        headers: {
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(`Status: ${res.status}`);

      if (res.status === 200) {
        console.log("✅ Conexión exitosa con clave SERVICE_ROLE");
        console.log(
          "Datos recibidos:",
          Array.isArray(data)
            ? `${data.length} registros`
            : "Estructura de datos"
        );
      } else {
        console.log("⚠️  Error con clave SERVICE_ROLE:", data.message || data);
        if (data.message === "Invalid API key") {
          console.log(
            "💡 Sugerencia: Verifica que la clave service_role sea correcta en tu dashboard de Supabase"
          );
        }
      }
    } catch (err) {
      console.error("❌ Error al probar clave SERVICE_ROLE:", err.message);
    }
  }

  // Test 3: Verificar estructura de las claves JWT
  console.log("\n🔍 Verificando estructura de las claves JWT...");

  function decodeJWT(token, keyName) {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(Buffer.from(payload, "base64").toString());
      console.log(`\n${keyName}:`);
      console.log("  - iss:", decoded.iss);
      console.log("  - ref:", decoded.ref);
      console.log("  - role:", decoded.role || decoded.rose || "NO DEFINIDO");
      console.log("  - iat:", new Date(decoded.iat * 1000).toISOString());
      console.log("  - exp:", new Date(decoded.exp * 1000).toISOString());

      if (decoded.rose && !decoded.role) {
        console.log(
          '  ⚠️  PROBLEMA: La clave contiene "rose" en lugar de "role"'
        );
      }
    } catch (err) {
      console.log(`  ❌ Error decodificando ${keyName}:`, err.message);
    }
  }

  decodeJWT(ANON_KEY, "ANON_KEY");
  if (SERVICE_ROLE_KEY) {
    decodeJWT(SERVICE_ROLE_KEY, "SERVICE_ROLE_KEY");
  }
}

testSupabaseConnection();
