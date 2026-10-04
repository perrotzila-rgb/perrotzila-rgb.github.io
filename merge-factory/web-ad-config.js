/* Merge Factory · Web rewarded ads configuration
   TEST mode uses Google's official rewarded web sample ad unit.
   To monetize, change mode to "live" and replace both ad unit paths with
   the rewarded web ad-unit paths created in Google Ad Manager. */
window.MergeFactoryWebAdsConfig = Object.freeze({
  mode: "test",
  timeoutMs: 60000,
  placements: Object.freeze({
    coins_25_reward: "/22639388115/rewarded_web_example",
    offline_x2: "/22639388115/rewarded_web_example"
  })
});
