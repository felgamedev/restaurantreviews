if (navigator.serviceWorker) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js").then(function(reg) {
      // Look for updates etc
      console.log("SW installed");
    });
  });
}
