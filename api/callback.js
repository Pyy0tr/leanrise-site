module.exports = async function (req, res) {
  const { code } = req.query;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await response.json();

  if (data.error || !data.access_token) {
    return res.send(renderMessage('error', { message: data.error_description || 'OAuth échoué' }));
  }

  const userResponse = await fetch('https://api.github.com/user', {
    headers: { Authorization: `token ${data.access_token}`, 'User-Agent': 'leanrise-cms' },
  });
  const user = await userResponse.json();

  const allowedUsers = (process.env.ALLOWED_GITHUB_USERS || '')
    .split(',')
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean);

  if (!user.login || !allowedUsers.includes(user.login.toLowerCase())) {
    return res.send(renderMessage('error', { message: 'Compte GitHub non autorisé pour cet admin.' }));
  }

  // Les commits passent toujours par le PAT du propriétaire du projet Vercel
  // (sinon Vercel Hobby bloque le build quand l'auteur du commit n'est pas le owner).
  res.send(renderMessage('success', { token: process.env.GITHUB_COMMIT_TOKEN, provider: 'github' }));
};

function renderMessage(status, payload) {
  const message = 'authorization:github:' + status + ':' + JSON.stringify(payload);
  return `<!DOCTYPE html><html><body><script>
    (function () {
      function reply(e) {
        window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      }
      window.addEventListener('message', reply, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  <\/script></body></html>`;
}
