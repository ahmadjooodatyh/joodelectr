// API-based Server Adapter (replaces the old LocalStorage mock)
(function(){
  const tokenKey = 'api_token';

  function getToken() {
    try { return localStorage.getItem(tokenKey) || ''; } catch(e){ return ''; }
  }

  async function api(path, options={}) {
    const headers = options.headers || {};
    const token = getToken();
    if (token) headers['x-auth-token'] = token;
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    const res = await fetch(path, {...options, headers});
    if (!res.ok) {
      const msg = await res.text().catch(()=>res.statusText);
      throw new Error(`API ${res.status}: ${msg}`);
    }
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('application/json')) return res.json();
    return res.text();
  }

  window.API = {
    async login(username, password){
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({username, password})
      });
      if (data && data.token) localStorage.setItem(tokenKey, data.token);
      return data;
    },
    logout(){ localStorage.removeItem(tokenKey); },
    token(){ return getToken(); }
  };

  window.Server = {
    init(){ /* no-op, backend holds the data */ },

    // mimic the old interface
    async get(table){
      return api(`/api/tables/${encodeURIComponent(table)}`);
    },

    async set(table, data){
      return api(`/api/tables/${encodeURIComponent(table)}`, {
        method: 'PUT',
        body: JSON.stringify(data || null)
      });
    },

    logView(){
      // fire-and-forget
      fetch('/api/analytics/view', {method:'POST'}).catch(()=>{});
    }
  };
})();