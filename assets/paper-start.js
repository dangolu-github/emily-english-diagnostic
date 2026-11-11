(function(){
 const config=JSON.parse(document.getElementById('paper-resource-config').textContent);
 // Same remembered-browser credential as the diagnostic entry (assets/access.js).
 const access=window.EmilyAccess;
 const button=document.createElement('button');button.textContent='Edit annotations';button.type='button';button.className='paper-start';button.style.cssText='position:fixed;bottom:16px;right:16px;z-index:1000;background:#285d48;color:white;border-radius:22px;padding:12px 18px';document.body.append(button);
 const style=document.createElement('style');style.textContent='@media print{.paper-start{display:none!important}}';document.head.append(style);
 async function call(action,payload={}){let result;try{const r=await fetch(window.EMILY_SUBMISSION_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...payload,action}),signal:AbortSignal.timeout(45000)});result=await r.json();}catch{const offline=Error('Could not connect. Check your connection and try again.');offline.offline=true;throw offline;}if(!result.ok){const failed=Error(result.error||(result.reason==='wait'?'Please wait a few minutes before trying again.':result.reason==='password'?'Password not recognised.':'Could not save annotations.'));failed.reason=result.reason;throw failed;}return result;}
 const signedOut=error=>error&&(error.reason==='unknown'||error.reason==='revoked');
 function signIn(){return new Promise((resolve,reject)=>{const dialog=document.createElement('dialog');dialog.innerHTML='<form><h2>Open your annotations</h2><label>Website password <input type="password" required autocomplete="current-password"></label><p role="status"></p><button>Continue</button><button type="button" data-cancel>Cancel</button></form>';document.body.append(dialog);dialog.showModal();const close=()=>{dialog.close();dialog.remove();reject(Error('Sign-in cancelled.'));};dialog.querySelector('[data-cancel]').onclick=close;dialog.oncancel=e=>{e.preventDefault();close();};dialog.querySelector('form').onsubmit=async e=>{e.preventDefault();const input=dialog.querySelector('input'),submit=dialog.querySelector('button');submit.disabled=true;try{const r=await call('signIn',{password:input.value});input.value='';if(access)access.remember(r.credential);dialog.close();dialog.remove();resolve(r.credential);}catch(error){dialog.querySelector('[role=status]').textContent=error.message;submit.disabled=false;}};});}
 button.onclick=async()=>{button.disabled=true;try{
  let token=access?access.credential():'';
  if(token){try{await call('getPaperAnnotations',{resourceId:config.resourceId,baseline:config.baseline,accessToken:token});}catch(error){if(!signedOut(error))throw error;if(access)access.forget();token='';}}
  if(!token)token=await signIn();
  const data=document.createElement('script');data.type='application/json';data.id='html-ink-data-v2';data.textContent=JSON.stringify(config.state);document.body.append(data);
  globalThis.__paperPortalConfig={...config,accessToken:token,rpc:(action,payload)=>call(action,payload)};
  const script=document.createElement('script');script.src='../../assets/paper-editor.js?v=20261007';script.onload=()=>button.remove();script.onerror=()=>{button.disabled=false;button.textContent='Could not open · Try again';};document.body.append(script);
 }catch(error){button.disabled=false;button.textContent=error&&error.offline?'Could not connect · Try again':'Edit annotations';if(error.message!=='Sign-in cancelled.'&&!(error&&error.offline))alert(error.message);}};
})();
