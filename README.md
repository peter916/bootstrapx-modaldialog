bootstrapx-modaldialog
======================
bootstrapx-modialog based on jschr's bootstrap-modal has several features.You can use like this<br>
<code>
$('#modaldialog').modaldialog(options);
</code>
<br>
overview
======================
<ul>
  <li>setDialogButtons</li>
  <li>loadUrl</li>
  <li>setData</li>
  <li>getData</li>
</ul>
Installation
======================
<ul>
  <li>install jschr's bootstrap-modal</li>
  <li>include <code>bootstrapx-modaldialog.js</code></li>
</ul>
setDialogButtons
======================
after the modaldialog opened, you can set buttons and buttons' events dynamical.<br>
<pre>
<code>
  var buttons = {buttons:[{id:'cancel',name:'cacel',close:true}
  	            ,{id:'nextStep',name:'nextStep',style:'btn-primary'}]};
  $('#modaldialog').modaldialog('setDialogButtons',buttons);
</code>
</pre>
loadUrl
======================
also like setDialogButtons,set modaldialog's content dynamical.<br>
<pre><code>
  $('#modaldialog').modaldialog('loadUrl',url);
</code></pre>
setData
======================
the parent page can set data to modaldialog.<br>
<pre><code>
  $('#modaldialog').modaldialog('setData',data);
</code></pre>
getData
======================
the child page can get data from modaldialog.<br>
<pre><code>
  var data = $('#modaldialog').modaldialog('getData');
</code></pre>
