const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// @supabase/supabase-js importa @opentelemetry/api (opcional, não usamos) → stub vazio,
// senão o bundle web quebra. Não afeta o Android.
const originalResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@opentelemetry/api') return { type: 'empty' };
  return (originalResolve || context.resolveRequest)(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
