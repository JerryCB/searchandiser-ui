YUI.namespace("com.schoolspecialty.form").submit=function(url,params,httpMethod){var form=document.createElement("form"),input,k,v,createInput=function(k,v){input=document.createElement("input");input.type="hidden";input.name=k;input.value=v;form.appendChild(input);};for(k in params){v=params[k];if(YUI().use().Array.test(v)>0){v.forEach(function(v2){createInput(k,v2);});}else{createInput(k,v);}}if(httpMethod){form.method=httpMethod;}else{form.method="POST";}form.action=url;document.body.appendChild(form);var delaySubmit=function(){form.submit();};setTimeout(delaySubmit,0);};