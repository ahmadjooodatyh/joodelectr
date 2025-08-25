const api = '/api/products';

async function load(){
  const res = await fetch(api);
  const json = await res.json();
  const tbody = document.querySelector('#table tbody');
  tbody.innerHTML='';
  (json.data||[]).forEach(p=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input value="${escapeHtml(p.title)}" id="t_${p.id}"></td>
      <td><input value="${p.price}" id="p_${p.id}" type="number" step="0.01"></td>
      <td>
        <button onclick="update(${p.id})">تعديل</button>
        <button onclick="del(${p.id})">حذف</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function add(){
  const body = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('desc').value.trim(),
    price: parseFloat(document.getElementById('price').value||0),
    image_url: document.getElementById('image').value.trim()
  };
  if(!body.title){ alert('اكتب اسم المنتج'); return; }
  await fetch(api, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
  document.getElementById('title').value=''; document.getElementById('desc').value=''; document.getElementById('price').value=''; document.getElementById('image').value='';
  load();
}

async function update(id){
  const body = {
    title: document.getElementById('t_'+id).value.trim(),
    description: '',
    price: parseFloat(document.getElementById('p_'+id).value||0)
  };
  await fetch(api + '/' + id, {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)});
  load();
}

async function del(id){
  if(!confirm('تأكيد الحذف؟')) return;
  await fetch(api + '/' + id, {method:'DELETE'});
  load();
}

function escapeHtml(s){ return (s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

document.getElementById('addBtn').addEventListener('click', add);
load();
