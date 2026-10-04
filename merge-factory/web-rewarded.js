/* Merge Factory · Google Ad Manager rewarded bridge
   No banners, anchors, rails or automatic interstitials are defined here.
   Ads are requested only when the game calls MergeFactoryAds.reward(). */
(() => {
  "use strict";

  const cfg = window.MergeFactoryWebAdsConfig || {};
  window.googletag = window.googletag || { cmd: [] };

  let busy = false;
  let servicesEnabled = false;
  let adVisible = false;

  function adUnitFor(placement) {
    const map = cfg.placements || {};
    return typeof map[placement] === "string" ? map[placement].trim() : "";
  }

  function cleanup(pubads, slot, listeners) {
    if (pubads && typeof pubads.removeEventListener === "function") {
      Object.entries(listeners).forEach(([type, handler]) => {
        try { pubads.removeEventListener(type, handler); } catch (_) {}
      });
    }
    if (slot) {
      try { googletag.destroySlots([slot]); } catch (_) {}
    }
  }

  function reward({ placement } = {}) {
    if (busy) return Promise.resolve({ rewarded: false, reason: "busy" });

    const adUnitPath = adUnitFor(placement);
    if (!adUnitPath) {
      return Promise.resolve({ rewarded: false, reason: "missing_ad_unit" });
    }

    busy = true;

    return new Promise((resolve) => {
      let slot = null;
      let pubads = null;
      let granted = false;
      let settled = false;
      let timer = null;
      const listeners = {};

      const finish = (rewarded, reason) => {
        if (settled) return;
        settled = true;
        busy = false;
        if (timer) clearTimeout(timer);
        try {
          window.googletag.cmd.push(() => cleanup(pubads, slot, listeners));
        } catch (_) {}
        if (adVisible) {
          adVisible = false;
          try { window.dispatchEvent(new Event("mergefactory:ad-close")); } catch (_) {}
        }
        resolve({
          rewarded: !!rewarded,
          reason,
          placement,
          provider: "google-ad-manager-gpt",
          testMode: cfg.mode !== "live"
        });
      };

      window.googletag.cmd.push(() => {
        try {
          slot = googletag.defineOutOfPageSlot(
            adUnitPath,
            googletag.enums.OutOfPageFormat.REWARDED
          );

          // Google can return null when rewarded ads are unsupported on the page/device.
          if (!slot) {
            finish(false, "unsupported");
            return;
          }

          pubads = googletag.pubads();
          slot.addService(pubads);
          slot.setTargeting("mf_placement", String(placement || "unknown"));

          listeners.rewardedSlotReady = (event) => {
            if (event.slot !== slot || settled) return;
            const shown = event.makeRewardedVisible();
            if (!shown) {
              finish(false, "show_failed");
              return;
            }
            adVisible = true;
            try { window.dispatchEvent(new Event("mergefactory:ad-open")); } catch (_) {}
          };

          listeners.rewardedSlotGranted = (event) => {
            if (event.slot !== slot || settled) return;
            granted = true;
          };

          listeners.rewardedSlotClosed = (event) => {
            if (event.slot !== slot || settled) return;
            finish(granted, granted ? "granted" : "closed_without_reward");
          };

          listeners.slotRenderEnded = (event) => {
            if (event.slot !== slot || settled) return;
            if (event.isEmpty) finish(false, "no_fill");
          };

          Object.entries(listeners).forEach(([type, handler]) => {
            pubads.addEventListener(type, handler);
          });

          // Safer default while the public CMP is not wired yet.
          // This does not replace the EEA/UK/Swiss consent requirement.
          pubads.setPrivacySettings({ nonPersonalizedAds: true });

          if (!servicesEnabled) {
            googletag.enableServices();
            servicesEnabled = true;
          }

          googletag.display(slot);
          timer = setTimeout(() => finish(false, "timeout"), Number(cfg.timeoutMs) || 60000);
        } catch (error) {
          finish(false, "exception");
        }
      });
    });
  }

  window.MergeFactoryAds = Object.freeze({
    reward,
    provider: "google-ad-manager-gpt",
    mode: cfg.mode || "test"
  });

  try {
    window.dispatchEvent(new Event("mergefactory:services-ready"));
  } catch (_) {}
})();
