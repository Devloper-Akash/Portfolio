'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  ['dashboard', 'Dashboard'],
  ['projects', 'Projects'], ['certificates', 'Certificates'], ['experience', 'Experience'],
  ['services', 'Services'], ['skills', 'Skills'], ['techstack', 'Tech Stack'], ['profile', 'Profile / About'],
  ['settings', 'Settings'], ['sections', 'Sections'], ['messages', 'Messages'], ['media', 'Media'], ['security', 'Security'],
];
const json = (value) => JSON.stringify(value, null, 2);
const imageTypes = 'image/png,image/jpeg,image/webp';

function parseJsonObject(value) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

export default function AdminPage() {
  const [admin, setAdmin] = useState(null);
  const [active, setActive] = useState('dashboard');
  const [records, setRecords] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ key: '', title: '', data: '{}', visible: true, order: 0 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [security, setSecurity] = useState({ currentPassword: '', newPassword: '' });
  const [upload, setUpload] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    const response = await fetch(url, { ...options, headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers } });
    const value = await response.json();
    if (!response.ok) throw new Error(value.error || 'Something went wrong.');
    return value;
  }, []);

  const refresh = useCallback(async (section = active) => {
    if (section === 'dashboard') {
      const [content, inbox] = await Promise.all([request('/api/admin/content'), request('/api/admin/messages')]);
      setRecords(content.records); setMessages(inbox.messages); return;
    }
    if (section === 'messages') {
      const value = await request('/api/admin/messages'); setMessages(value.messages); return;
    }
    if (section === 'security') return;
    const value = await request(`/api/admin/content?kind=${encodeURIComponent(section)}`);
    setRecords(value.records);
  }, [active, request]);

  useEffect(() => {
    request('/api/admin/session').then((value) => {
      if (value.admin) { setAdmin(value.admin); }
    }).catch(() => {});
  }, [request]);

  useEffect(() => { if (admin) refresh(active).catch((error) => setNotice(error.message)); }, [admin, active, refresh]);
  const counts = useMemo(() => records.length, [records]);
  const editorData = useMemo(() => parseJsonObject(form.data), [form.data]);
  const dashboardCounts = useMemo(() => Object.fromEntries(['projects', 'certificates', 'experience', 'services', 'skills', 'techstack', 'profile', 'settings', 'sections', 'media'].map((kind) => [kind, records.filter((record) => record.kind === kind).length])), [records]);

  function chooseRecord(record) {
    setSelected(record);
    setForm({ key: record.key, title: record.title, data: json(record.data), visible: record.visible, order: record.order });
    setNotice('');
  }

  function createRecord() {
    setSelected(null);
    setForm({ key: '', title: '', data: '{}', visible: true, order: records.length });
    setNotice('New record. Add a title and edit its JSON fields, then save.');
  }

  async function saveRecord(event) {
    event.preventDefault(); setBusy(true); setNotice('');
    try {
      const payload = { kind: active, key: form.key, title: form.title, data: JSON.parse(form.data), visible: active === 'techstack' ? true : form.visible, order: Number(form.order) };
      await request('/api/admin/content', { method: selected ? 'PUT' : 'POST', body: JSON.stringify(selected ? { id: selected.id, ...payload } : payload) });
      setNotice('Changes saved.'); setSelected(null); await refresh(active);
    } catch (error) { setNotice(error instanceof SyntaxError ? 'The data field must contain valid JSON.' : error.message); }
    finally { setBusy(false); }
  }

  async function deleteRecord() {
    if (!selected || !window.confirm(`Delete “${selected.title}”?`)) return;
    setBusy(true);
    try { await request('/api/admin/content', { method: 'DELETE', body: JSON.stringify({ id: selected.id }) }); setSelected(null); setNotice('Record deleted.'); await refresh(active); }
    catch (error) { setNotice(error.message); } finally { setBusy(false); }
  }

  async function login(event) {
    event.preventDefault(); setBusy(true); setNotice('');
    try { const value = await request('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) }); setAdmin({ email: value.email }); }
    catch (error) { setNotice(error.message); } finally { setBusy(false); }
  }

  async function logout() {
    await request('/api/admin/logout', { method: 'POST', body: '{}' });
    setAdmin(null); setRecords([]); setMessages([]);
  }

  async function changeMessage(message, status) {
    try { await request('/api/admin/messages', { method: 'PATCH', body: JSON.stringify({ id: message.id, status }) }); await refresh('messages'); }
    catch (error) { setNotice(error.message); }
  }

  async function changePassword(event) {
    event.preventDefault(); setBusy(true); setNotice('');
    try { await request('/api/admin/security', { method: 'POST', body: JSON.stringify(security) }); setAdmin(null); setNotice('Password changed. Sign in again with your new password.'); setSecurity({ currentPassword: '', newPassword: '' }); }
    catch (error) { setNotice(error.message); } finally { setBusy(false); }
  }

  async function uploadFile(event) {
    event.preventDefault(); if (!upload) return;
    setBusy(true); setNotice('Uploading…');
    try { const media = await sendUpload(upload); setNotice(`Uploaded: ${media.url}`); setActive('media'); await refresh('media'); }
    catch (error) { setNotice(error.message); } finally { setBusy(false); }
  }

  async function sendUpload(file, { removeBackground = false } = {}) {
    const body = new FormData();
    body.append('file', file);
    if (removeBackground) body.append('remove_background', 'true');
    const value = await request('/api/admin/upload', { method: 'POST', body });
    return value.media;
  }

  async function uploadAssets(event, field, mode = 'replace') {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setBusy(true); setNotice(files.length > 1 ? `Uploading ${files.length} files…` : 'Uploading…');
    let uploadedCount = 0;
    try {
      for (const file of files) {
        const media = await sendUpload(file, { removeBackground: mode === 'logo' });
        setForm((current) => {
          const data = parseJsonObject(current.data);
          let nextValue = media.url;
          if (mode === 'images') nextValue = [...(Array.isArray(data[field]) ? data[field] : []), media.url];
          if (mode === 'files') nextValue = [...(Array.isArray(data[field]) ? data[field] : []), { title: media.title, url: media.url }];
          return { ...current, data: json({ ...data, [field]: nextValue }) };
        });
        uploadedCount += 1;
      }
      setNotice(`${uploadedCount} ${mode === 'logo' ? 'logo' : 'file'}${uploadedCount === 1 ? '' : 's'} uploaded${mode === 'logo' ? ' with a transparent background' : ''}. Save changes to publish them.`);
    } catch (error) {
      setNotice(uploadedCount ? `${uploadedCount} file${uploadedCount === 1 ? '' : 's'} uploaded. ${error.message} Save changes to keep the uploaded files.` : error.message);
    } finally {
      event.target.value = '';
      setBusy(false);
    }
  }

  function removeAsset(field, index = null) {
    setForm((current) => {
      const data = parseJsonObject(current.data);
      if (index === null) delete data[field];
      else if (Array.isArray(data[field])) data[field] = data[field].filter((_, itemIndex) => itemIndex !== index);
      return { ...current, data: json(data) };
    });
    setNotice('Attachment removed from this entry. Save changes to publish the update.');
  }

  function updateTechStackItem(index, field, value) {
    setForm((current) => {
      const data = parseJsonObject(current.data);
      const items = Array.isArray(data.items) ? data.items : [];
      data.items = items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item);
      return { ...current, data: json(data) };
    });
  }

  function addTechStackItem() {
    setForm((current) => {
      const data = parseJsonObject(current.data);
      data.items = [...(Array.isArray(data.items) ? data.items : []), { name: '', icon: 'node' }];
      return { ...current, data: json(data) };
    });
  }

  function removeTechStackItem(index) {
    setForm((current) => {
      const data = parseJsonObject(current.data);
      data.items = (Array.isArray(data.items) ? data.items : []).filter((_, itemIndex) => itemIndex !== index);
      return { ...current, data: json(data) };
    });
  }

  async function uploadTechStackPhoto(event, index) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setNotice('Uploading technology photo…');
    try {
      const media = await sendUpload(file, { removeBackground: true });
      setForm((current) => {
        const data = parseJsonObject(current.data);
        data.items = (Array.isArray(data.items) ? data.items : []).map((item, itemIndex) => itemIndex === index ? { ...item, photoUrl: media.url } : item);
        return { ...current, data: json(data) };
      });
      setNotice('Technology photo uploaded. Save changes to publish it.');
    } catch (error) {
      setNotice(error.message);
    } finally {
      event.target.value = '';
      setBusy(false);
    }
  }

  function removeTechStackPhoto(index) {
    setForm((current) => {
      const data = parseJsonObject(current.data);
      data.items = (Array.isArray(data.items) ? data.items : []).map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        const { photoUrl, ...withoutPhoto } = item;
        return withoutPhoto;
      });
      return { ...current, data: json(data) };
    });
    setNotice('Technology photo removed. Save changes to publish the update.');
  }

  const attachmentFields = active === 'projects' ? [
    { field: 'bgImage', label: 'Project cover photo', accept: imageTypes, mode: 'replace', image: true },
    { field: 'galleryImages', label: 'Add project photos', accept: imageTypes, mode: 'images', image: true, multiple: true },
    { field: 'projectFiles', label: 'Add project PDFs', accept: 'application/pdf', mode: 'files', multiple: true },
  ] : active === 'certificates' ? [
    { field: 'image', label: 'Certificate photo / scan', accept: imageTypes, mode: 'replace', image: true },
    { field: 'pdfUrl', label: 'Certificate PDF', accept: 'application/pdf', mode: 'replace' },
  ] : active === 'profile' ? [
    { field: 'photoUrl', label: 'Portfolio profile photo', accept: imageTypes, mode: 'replace', image: true },
  ] : active === 'skills' ? [
    { field: 'photoUrl', label: 'Skill logo (solid background removed automatically)', accept: imageTypes, mode: 'logo', image: true },
  ] : [];

  if (!admin) return <section className="admin-login-wrap"><form className="admin-login" onSubmit={login}>
    <span className="admin-kicker">PORTFOLIO CONTROL ROOM</span><h1>Welcome back</h1><p>Sign in to manage your portfolio content.</p>
    <label>Email<input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
    {notice && <div className="admin-notice" role="status">{notice}</div>}
    <button className="admin-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button><Link className="admin-back" href="/">← Back to portfolio</Link>
  </form></section>;

  return <div className="admin-shell">
    <aside className="admin-sidebar"><a className="admin-brand" href="/admin"><span className="admin-brand-mark">A</span><span>Portfolio<span className="admin-brand-sub">ADMIN STUDIO</span></span></a>
      <div className="admin-nav-label">WORKSPACE</div><nav>{categories.map(([key, label]) => <button key={key} className={active === key ? 'is-active' : ''} onClick={() => { setActive(key); setSelected(null); setNotice(''); }}><span className="admin-nav-dot" />{label}{key === 'messages' && messages.filter((m) => m.status === 'new').length > 0 && <small>{messages.filter((m) => m.status === 'new').length}</small>}</button>)}</nav>
      <div className="admin-sidebar-foot"><span className="admin-online-dot" />SIGNED IN AS<br /><strong>{admin.email}</strong><button onClick={logout}>Sign out ↗</button></div>
    </aside>
    <main className="admin-main"><header className="admin-topbar"><div><div className="admin-breadcrumb">Workspace <span>/</span> {categories.find(([key]) => key === active)?.[1]}</div><h1>{active === 'messages' ? 'Inbox' : active === 'security' ? 'Security' : active === 'media' ? 'Media library' : categories.find(([key]) => key === active)?.[1]}</h1></div><Link href="/" target="_blank" className="admin-preview">View live site ↗</Link></header>
      {notice && <div className="admin-banner" role="status">{notice}<button onClick={() => setNotice('')}>×</button></div>}
      {active === 'dashboard' ? <section className="admin-dashboard"><div className="admin-dashboard-intro"><span className="admin-kicker">YOUR PORTFOLIO AT A GLANCE</span><h2>Good to see you, {admin.email.split('@')[0]}.</h2><p>Manage content, review messages, and keep your portfolio up to date.</p></div><div className="admin-stat-grid">{[['projects','Projects'],['services','Services'],['experience','Experience'],['certificates','Certificates']].map(([key,label]) => <button className="admin-stat-card" key={key} onClick={() => setActive(key)}><span>{label}</span><b>{dashboardCounts[key] || 0}</b><small>Manage {label.toLowerCase()} →</small></button>)}<button className="admin-stat-card admin-stat-inbox" onClick={() => setActive('messages')}><span>New messages</span><b>{messages.filter((message) => message.status === 'new').length}</b><small>Open inbox →</small></button></div><div className="admin-dashboard-lower"><section className="admin-panel"><span className="admin-kicker">QUICK LINKS</span><h2>Common actions</h2><div className="admin-quick-links">{[['projects','Add a project'],['sections','Arrange homepage sections'],['media','Upload an image or PDF'],['security','Change your password']].map(([key,label])=><button key={key} onClick={()=>setActive(key)}>{label}<span>→</span></button>)}</div></section><section className="admin-panel"><span className="admin-kicker">PUBLISHING</span><h2>Portfolio status</h2><p className="admin-dashboard-copy">Your public site shows published content. Save an entry to publish it; turn off its visibility to hide it from visitors.</p><Link className="admin-secondary" href="/" target="_blank">Preview live site ↗</Link></section></div></section>
      : active === 'security' ? <section className="admin-panel admin-security"><div className="admin-panel-heading"><div><span className="admin-kicker">ACCOUNT PROTECTION</span><h2>Change your password</h2><p>Existing sessions are signed out when the password changes.</p></div></div><form onSubmit={changePassword}><label>Current password<input type="password" value={security.currentPassword} onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })} required /></label><label>New password<input type="password" minLength="12" value={security.newPassword} onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })} required /><small>At least 12 characters with upper-case, lower-case, and a number.</small></label><button className="admin-primary" disabled={busy}>Update password</button></form></section>
      : active === 'messages' ? <section className="admin-messages">{messages.length === 0 ? <div className="admin-empty">Your inbox is clear.<span>New contact form messages will appear here.</span></div> : messages.map((message) => <article key={message.id} className="admin-message"><div className="admin-message-top"><div><span className={`admin-status status-${message.status}`}>{message.status}</span><h2>{message.name}</h2><a href={`mailto:${message.email}`}>{message.email}</a></div><time>{new Date(message.createdAt).toLocaleString()}</time></div><p>{message.message}</p><div className="admin-message-actions"><a className="admin-secondary" href={`mailto:${message.email}?subject=${encodeURIComponent('Re: your portfolio message')}`}>Reply by email ↗</a>{message.status !== 'read' && <button className="admin-secondary" onClick={() => changeMessage(message, 'read')}>Mark read</button>}{message.status !== 'archived' && <button className="admin-secondary" onClick={() => changeMessage(message, 'archived')}>Archive</button>}</div></article>)}</section>
      : active === 'media' ? <section className="admin-panel"><div className="admin-panel-heading"><div><span className="admin-kicker">CLOUDINARY LIBRARY</span><h2>Upload an image or PDF</h2><p>PNG, JPEG, WebP, or PDF. Maximum file size 10 MB.</p></div></div><form className="admin-upload" onSubmit={uploadFile}><input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onChange={(e) => setUpload(e.target.files?.[0] || null)} required /><button className="admin-primary" disabled={busy}>Upload file</button></form><div className="admin-media-grid">{records.map((record) => <a key={record.id} className="admin-media-card" href={record.data.url} target="_blank" rel="noreferrer">{record.data.mime?.startsWith('image/') ? <Image src={record.data.url} alt="" width={300} height={190} unoptimized /> : <span className="admin-pdf">PDF</span>}<b>{record.title}</b><small>{record.data.format?.toUpperCase()} · {Math.ceil(record.data.size / 1024)} KB</small></a>)}</div></section>
      : <div className="admin-content-grid"><section className="admin-panel admin-records"><div className="admin-panel-heading"><div><span className="admin-kicker">{counts} {counts === 1 ? 'RECORD' : 'RECORDS'}</span><h2>Content entries</h2><p>{active === 'techstack' ? 'Edit the technologies shown in the Developer Ecosystem card.' : 'Choose an entry to edit its fields and display order.'}</p></div>{active !== 'techstack' && <button className="admin-primary admin-add" onClick={createRecord}>＋ New</button>}</div><div className="admin-record-list">{records.map((record) => <button key={record.id} className={`admin-record${selected?.id === record.id ? ' is-selected' : ''}`} onClick={() => chooseRecord(record)}><span className="admin-record-copy"><b>{record.title}</b><small>{record.key}</small></span><span className={`admin-visibility${record.visible ? '' : ' is-hidden'}`}>{record.visible ? 'Live' : 'Hidden'}</span></button>)}{records.length === 0 && <div className="admin-empty">No entries yet.</div>}</div></section>
      <section className="admin-panel admin-editor"><div className="admin-panel-heading"><div><span className="admin-kicker">{selected ? 'EDIT ENTRY' : 'CONTENT EDITOR'}</span><h2>{selected ? selected.title : 'Create an entry'}</h2><p>{active === 'techstack' ? 'Edit the badge labels and icon styles shown on your portfolio.' : 'Content is checked on the server before saving.'}</p></div></div><form onSubmit={saveRecord}><div className="admin-form-row"><label>Key / slug<input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} placeholder="my-project" required /></label><label>Sort order<div className="admin-order-control"><button type="button" aria-label="Move earlier" onClick={() => setForm({ ...form, order: Math.max(0, Number(form.order) - 1) })}>↑</button><input type="number" min="0" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /><button type="button" aria-label="Move later" onClick={() => setForm({ ...form, order: Number(form.order) + 1 })}>↓</button></div></label></div><label>Display title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>{attachmentFields.length > 0 && <section className="admin-asset-tools"><div><span className="admin-kicker">FILE ATTACHMENTS</span><h3>Photos and files</h3><p>Uploads go to your media library. Save changes to attach them to this entry.</p></div>{attachmentFields.map(({ field, label, accept, mode, image, multiple }) => {
        const raw = editorData[field];
        const values = mode === 'images' || mode === 'files' ? (Array.isArray(raw) ? raw : []) : (typeof raw === 'string' && raw ? [raw] : []);
        return <div className="admin-asset-field" key={field}><label>{label}<input type="file" accept={accept} multiple={multiple} onChange={(event) => uploadAssets(event, field, mode)} disabled={busy} /></label>{values.length > 0 && <div className="admin-asset-list">{values.map((item, index) => {
          const url = typeof item === 'string' ? item : item.url;
          const itemTitle = typeof item === 'string' ? url.split('/').pop() : item.title || url.split('/').pop();
          return <div className="admin-asset-item" key={`${url}-${index}`}>{image && <Image src={url} alt="" width={56} height={48} unoptimized />}<a href={url} target="_blank" rel="noreferrer">{itemTitle}</a><button type="button" className="admin-asset-remove" onClick={() => removeAsset(field, mode === 'images' || mode === 'files' ? index : null)}>Remove</button></div>;
        })}</div>}</div>;
      })}</section>}{active === 'techstack' ? <section className="admin-tech-editor" aria-label="Portfolio technology badges"><div className="admin-tech-editor-heading"><div><h3>Technology badges</h3><p>These appear in the lower row of the Developer Ecosystem card.</p></div><button type="button" className="admin-secondary" onClick={addTechStackItem}>＋ Add technology</button></div><div className="admin-tech-list">{(Array.isArray(editorData.items) ? editorData.items : []).map((item, index) => <div className="admin-tech-row" key={index}><label>Technology name<input value={item.name || ''} onChange={(event) => updateTechStackItem(index, 'name', event.target.value)} placeholder="e.g. Node.js" required /></label><label>Icon style<input value={item.icon || ''} onChange={(event) => updateTechStackItem(index, 'icon', event.target.value)} placeholder="node" aria-describedby={`tech-icon-hint-${index}`} /><small id={`tech-icon-hint-${index}`} className="admin-label-hint">Examples: node, react, next, javascript, security</small></label><div className="admin-tech-photo"><label>Photo / logo (solid background removed)<input type="file" accept={imageTypes} onChange={(event) => uploadTechStackPhoto(event, index)} disabled={busy} /></label>{item.photoUrl && <div className="admin-tech-photo-preview"><Image src={item.photoUrl} alt={`${item.name || 'Technology'} logo preview`} width={44} height={44} unoptimized /><button type="button" className="admin-asset-remove" onClick={() => removeTechStackPhoto(index)} disabled={busy}>Remove photo</button></div>}</div><button type="button" className="admin-danger" onClick={() => removeTechStackItem(index)} aria-label={`Remove ${item.name || 'technology'}`} disabled={busy}>Remove</button></div>)}{(!Array.isArray(editorData.items) || editorData.items.length === 0) && <div className="admin-empty">No technologies added yet.<span>Add a technology to show a badge on your portfolio.</span></div>}</div></section> : <label>Content data <span className="admin-label-hint">JSON fields</span><textarea className="admin-json" spellCheck="false" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} /></label>}{active !== 'techstack' && <label className="admin-toggle"><input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} /><span>Visible on the portfolio</span></label>}<div className="admin-editor-actions"><button className="admin-primary" disabled={busy}>{busy ? 'Saving…' : 'Save changes'}</button>{selected && active !== 'techstack' && <button type="button" className="admin-danger" onClick={deleteRecord} disabled={busy}>Delete</button>}</div></form></section></div>}
      <footer className="admin-footer">Content changes publish to the live portfolio after saving.</footer>
    </main>
  </div>;
}
