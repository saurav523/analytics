(function () {
  const payload = {
    url: window.location.href,
    timestamp: new Date().toISOString()
  };

  fetch("http://localhost:5000/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
})();
