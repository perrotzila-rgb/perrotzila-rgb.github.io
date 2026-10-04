# Merge Factory · Rewarded Web Ads

La web está preparada para Google Ad Manager / Google Publisher Tag (GPT) **solo en los puntos de recompensa del juego**:

- `coins_25_reward` → +25 monedas.
- `offline_x2` → duplica las ganancias offline.

No hay banners, side rails, anchors ni interstitials automáticos.

## Estado actual

`merge-factory/web-ad-config.js` está en modo `test` y usa el ad unit oficial de ejemplo de Google:

`/22639388115/rewarded_web_example`

Sirve para validar la integración, pero **no genera ingresos**.

## Para monetizar

1. Crear/activar Google Ad Manager.
2. Crear dos ad units web recompensados, uno para cada placement.
3. Copiar sus rutas completas, con formato parecido a:
   `/NETWORK_CODE/merge_factory_coins_25`
   `/NETWORK_CODE/merge_factory_offline_x2`
4. Editar `merge-factory/web-ad-config.js`:
   - cambiar `mode: "test"` por `mode: "live"`;
   - sustituir las dos rutas de ejemplo por las rutas reales.
5. Publicar el cambio.
6. Configurar el CMP/consentimiento exigido para tráfico del EEE, Reino Unido y Suiza antes de servir publicidad real.
7. Añadir `/ads.txt` en la raíz con la línea exacta que indique Google Ad Manager para la cuenta web.

## Nota de compatibilidad

Google indica actualmente que los rewarded ads de GPT se solicitan en páginas optimizadas para móvil y que `defineOutOfPageSlot()` puede devolver `null` cuando el dispositivo/página no admite el formato. En esos casos Merge Factory no concede ninguna recompensa.
