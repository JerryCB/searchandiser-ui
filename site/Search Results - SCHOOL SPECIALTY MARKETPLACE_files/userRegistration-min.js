YUI.namespace("com.schoolspecialty.ebs.iStore.registration").userRegistration={restrictSpecialCharacters:function(e){var key;if(window.event){key=window.event.keyCode;}else{key=e.which;}if((key<48&&key!=32&&key!=8&&key!=0)||(key>57&&key<65)||(key>90&&key<97)||(key>122)){return false;}else{return true;}},registerIndividualUsers:function(){document.getElementById("do").value="reg";document.getElementById("usernameid").value=document.getElementById("email_id_reg").value;document.busForm.regSubmit.value="Yes";this.registerUser(document.busForm);},registerBusinessUsers:function(){document.getElementById("do").value="reg";document.busForm.regSubmit.value="Yes";if(document.getElementById("username")){document.getElementById("username").value=document.getElementById("usernameid").value;}this.registerUser(document.busForm);},registerGuestUser:function(notRegForm){this.registerUser(notRegForm);},setValues:function(){var selOrgValue=document.busForm.sltOrg.options[document.busForm.sltOrg.selectedIndex].value;var orgArray=selOrgValue.split("#");document.busForm.orgName.value=orgArray[0];document.busForm.orgAddress1.value=orgArray[1];document.busForm.orgCity.value=orgArray[2];document.busForm.orgState.value=orgArray[3];document.busForm.orgPostalCode.value=orgArray[4];document.busForm.orgPartyId.value=orgArray[5];if(orgArray[6]=="N"){document.getElementById("errMsg").innerHTML="We have found your organization but show that it is not active for billing. Please contact School Specialty Online Help for further assistance at 800-513-2465 or email onlinehelp@schoolspecialty.com.";document.getElementById("regForm").style.display="none";}else{document.getElementById("errMsg").innerHTML="";document.getElementById("regForm").style.display="inline";}},setRadio:function(type){if(type=="orgdetail"){document.busForm.btnOrgDetailType[0].checked=true;}if(type=="acctnum"){document.busForm.btnOrgDetailType[1].checked=true;}},registerUser:function(regForm){YUI.com.schoolspecialty.ebs.istore.waitPanel.showWaitPanel();YUI().use("io","json-parse",function(Y){Y.io("/OA_HTML/xxssi_ibeRegisterUser.jsp",{method:"POST",form:regForm,on:{success:function(id,o){var resp=Y.JSON.parse(o.responseText);var ref=resp.ref;if(ref.indexOf("http://")==0){ref="https://"+ref.substring(7);}if(resp.errmsg!=""){document.getElementById("com.schoolspecialty.ebs.iStore.reg.errormessage").innerHTML=resp.errmsg;YUI.com.schoolspecialty.ebs.istore.waitPanel.hideWaitPanel();}else{window.location.href=ref;}},failure:function(id,o){var resp=Y.JSON.parse(o.responseText);if(resp.errmsg!=""){document.getElementById("com.schoolspecialty.ebs.iStore.reg.errormessage").innerHTML=resp.errmsg;YUI.com.schoolspecialty.ebs.istore.waitPanel.hideWaitPanel();}}}});});}};